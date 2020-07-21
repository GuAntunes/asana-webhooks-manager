'use strict';

const AWMController = require('./AWMController');
const AWMEvent = require('../models/event');
const AWMWebhook = require('../models/webhook');
const CryptoJS = require("crypto-js");
const mongodb = require('../helpers/mongodbHelper');
const asanaConfig = require('../config/asana');
const exchedulerConfig = require('../config/excheduler');
const asana = require('asana');


const Produto = require('../models/produto');
const AsanaTaskExcheduler = require('../models/asanaTaskExcheduler');

class EventsController extends AWMController {

	constructor(req, res, io) {
		super(req, res);
		this.socket = io.of('/events');

	}

	onIncomingEvents() {
		try {
			if (this.request().get('X-Hook-Secret') != null) return this.handshake();
			else if (this.request().get('X-Hook-Signature') != null) return this.handle();
			else return this.reply(403, {});
		} catch (err) {
			return this.reply(200, {})
		}
	}

	handshake() {
		//Get X-Hook-Secret form the request object
		var xHookSecret = this.request().get('X-Hook-Secret');

		//Store webhook secret for validating incoming event request
		mongodb.getConnection();
		return new AWMWebhook({
			resource_id: this.request().params.resourceId,
			secret: xHookSecret
		}).save()
			.then(function () {
				//Response to in-flight webhook creation request
				this.response().set('X-Hook-Secret', xHookSecret);
				return this.reply(200, {});
			}.bind(this))
			.catch();



	}

	handle() {
		//Verify signature header exists
		var xHookSignatureHeader = this.request().get('X-Hook-Signature');
		if (xHookSignatureHeader == null) return this.reply(403, {}, "Unauthorized request");
		//Verify webhook is listed internally
		mongodb.getConnection();
		return AWMWebhook.findOne({ resource_id: this.request().params.resourceId.toString() }).exec().then(function (webhook) {
			//Webhook was not found, deny request
			if (typeof webhook == "undefined" || webhook == null || webhook.length == 0) return this.reply(400, {}, "Unknown webhook");
			//Match encrypted request payload against header header, using secret from original webhook handshake
			var encryptedRequestBody = CryptoJS.HmacSHA256(JSON.stringify(this.request().body), webhook.secret).toString();
			if (xHookSignatureHeader !== encryptedRequestBody) return this.reply(403, {}, "Unauthorized request");
			else {
				//At this point the request is fully validated and can be processed
				var eventsArray = this.request().body.events;
				AWMEvent.insertMany(eventsArray, function (error, docs) { });
				this.enviarExcheduler(eventsArray);
				this.socket.emit('events', eventsArray);

				return this.reply(200, {});
			}
		}.bind(this));

	}

	enviarExcheduler(eventsArray) {
		try {
			console.log(eventsArray);
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			for (var i = 0; i < eventsArray.length; i++) {
				//Verifica a section onde a task foi adicionada
				//TODO: Realizar o tratamento dessa informação de section através de arquivo de configuração
				if ((eventsArray[i].parent.resource_type == 'section' && isDefinedSection(eventsArray[i].parent.gid)) || eventsArray[i].parent.resource_type == 'tag') {
					console.log('Is a section Faturar');
					var token = asanaConfig.token;
					if (token) {
						var taskGid = eventsArray[i].resource.gid;
						const client = asana.Client.create().useAccessToken(token);
						if (client && taskGid) {
							client.tasks.findById(taskGid)
								.then((result) => {
									if (result) {
										//Obtem as tags da task
										var tags = result.tags;
										//Realiza a identificação de alguma tag que seja um número inteiro
										for (var j = 0; j < tags.length; j++) {
											var t = tags[j].name;
											if (isInt(t)) {
												Produto.findById(t, function (err, produto) {
													if (err) {
														console.log('Ocorreu um erro ao buscar o Produto');
													} else {
														if (produto.length > 0) {
															var p = new Produto(produto[0]);
															var asanaTask = new AsanaTaskExcheduler(result, p.id);
															console.log(asanaTask);
															AsanaTaskExcheduler.findByTask(asanaTask.task_id, function (erro, respTask) {
																console.log('resp task')
																console.log(respTask);
																if (erro) {
																	console.log('Ocorreu um erro durante o processamento da requisição');
																} else if (respTask.length > 0 && respTask != null) {
																	console.log('Tarefa ja cadastrada no banco');
																	AsanaTaskExcheduler.update(respTask[0].id, asanaTask, function (erroUpdate, taskUpdate) {
																		console.log("Atualizando task");
																		console.log(erroUpdate);
																		console.log(taskUpdate);
																	})
																} else {
																	console.log("Salvando nova task");
																	AsanaTaskExcheduler.create(asanaTask, function (err, task) {
																		console.log(err);
																		console.log(task);
																	});
																}
															});
														} else {
															console.log('Produto não encontrado na base!');
														}
													}
												});
												break;
											}
										}
									}
								});
						}
					}
				}
			}
			console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

		} catch (e) {
			// declarações para manipular quaisquer exceções
			logMyErrors(e); // passa o objeto de exceção para o manipulador de erro
		}

	}

}

function isDefinedSection(value) {
	var sections = exchedulerConfig.sections;
	if (sections && sections != []) {
		for (var i = 0; i < sections.length; i++) {
			if (sections[i] == value) {
				return true;
			}
		}
	}
	return false;
}


function isInt(value) {
	return !isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10));
}

module.exports = EventsController;