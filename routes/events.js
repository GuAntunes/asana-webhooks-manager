const express = require('express');
const EventsController = require('../controllers/EventsController');
var   eventsCtrl = null;

var registerRoutes = function(app){

	var router = express.Router();

	app.use('/', router);

	router.all('/*',function(req,res,next){

		eventsCtrl = new EventsController(req,res);

		if (eventsCtrl instanceof EventsController) {
			next();
		}

	});

	router.post('/incoming/:resourceId',function(req,res,next){

		return eventsCtrl.onIncomingEvents();

	});

};



module.exports = registerRoutes;