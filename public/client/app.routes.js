awmApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise("");

	$stateProvider
		.state('root', {
			url: '',
			views: {
				'@': {
					templateUrl: '/client/views/main.html',
					//controllerAs: 'layoutCtrl',
					//controller: 'layoutController'
				},
				'header@root':{
					templateUrl: '/client/views/header.html',
				},
				'body@root':{
					templateUrl: '/client/views/body.html'
				},
				'footer@root':{
					templateUrl: '/client/views/footer.html'
				}
			}
		})
		.state('manage', {
			parent:'root',
			url: '/manage',
			views: {
				'body':{
					templateUrl: '/client/views/manage.html'
				}
			}
		})
		.state('docs', {
			parent:'root',
			url: '/docs',
			views: {
				'body':{
					templateUrl: '/client/views/docs.html'
				}
			}
		})
}]);

