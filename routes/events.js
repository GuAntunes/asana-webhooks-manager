const express = require('express');
const EventsController = require('../controllers/EventsController');
var eventsCtrl = null;

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

	router.post('/sync', function (req, res, next) {
		console.log("Sincronizando informações");
		return eventsCtrl.synchronizedSection();
	});

	app.use('/events', router);

};

module.exports = registerRoutes;