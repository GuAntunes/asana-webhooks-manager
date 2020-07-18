const express = require('express');
const EventsController = require('../controllers/EventsController');
var eventsCtrl = null;

const Produto = require('../models/produto');
const AsanaTaskExcheduler = require('../models/asanaTaskExcheduler');

var registerRoutes = function (app, io) {

	var router = express.Router();

	router.all('/*', function (req, res, next) {

		eventsCtrl = new EventsController(req, res, io);

		if (eventsCtrl instanceof EventsController) {
			next();
		}

	});

	router.post('/incoming/:resourceId', function (req, res, next) {
		console.log("recebendo informação");
		return eventsCtrl.onIncomingEvents();

	});

	app.use('/events', router);

};



module.exports = registerRoutes;