var proxyquire = require('proxyquire');
var sinon = require('sinon');
var supertest = require('supertest');
var expect = require('expect');

var mockResponse = require('../mocks/Response');
var mockRequest = require('../mocks/Request');

var asanaClient = require('../../helpers/asanaClient');


describe('Asana Controller', function () {

	var sandbox;

	beforeEach(function(){

		sandbox = sinon.sandbox.create();

	});

	afterEach(function(){

		sandbox.restore();

	});

	it('Should return the currently logged in user',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					users: {
						me:function(){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({name:"John Doe"});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.getUser()
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: { name: 'John Doe' }, msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should return a list of available workspaces',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					workspaces: {
						findAll:function(){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.getWorkspaces()
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: [], msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should return a list of projects for a given workspace id',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					projects: {
						findByWorkspace:function(workspaceId){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.getProjects("12345678")
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: [], msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should return a list of webhoooks for a given workspace id',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					webhooks: {
						getAll:function(workspaceId){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.getWebhooks("12345678")
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: [], msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should return a unified list of projects and their webhooks for a given workspace id',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					projects: {
						findByWorkspace:function(workspaceId){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					},
					webhooks: {
						getAll:function(workspaceId){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.getProjectsWithWebhooks("12345678")
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: [], msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should create a webhook',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					webhooks: {
						create:function(resourceId,target){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.createWebhook("12345678",'http://www.targeturl.com/12345678')
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: { data: [] }, msg: 'OK' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});

	it('Should remove a webhook',function(done){

		var asanaClientStub = sandbox.spy(
			function(){
				return {
					webhooks: {
						deleteById:function(webhookId){
							return new Promise(function(resolve,reject){
								setTimeout(function(){resolve({data:[]});},0);
							});
						}
					}
				}
			}
		);

		var AsanaController = proxyquire('../../controllers/AsanaController',{'../helpers/asanaClient':asanaClientStub});

		mockRequest.cookie('token','123456789');
		var AsanaCtrl = new AsanaController(mockRequest,mockResponse);

		AsanaCtrl.removeWebhook("12345678")
			.then(function(response){
				expect(asanaClientStub.calledOnce).toBeTruthy();
				expect(AsanaCtrl.response()._json).toEqual({ code: 200, data: { data: [] }, msg: 'Webhook removed!' });
				done();
			})
			.catch(function(err){
				throw new Error(err);
				done();
			});

	});


});