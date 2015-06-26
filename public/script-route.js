	// create the module and name it scotchApp
	var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap','ngGrid']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController'
			})

			.when('/admin/:id', {
				templateUrl : 'views/admin.html',
				controller  : 'adminController'
			})

			.when('/error', {
				templateUrl : 'views/error.html',
				controller  : 'errorController'
			})

			.when('/signup', {
				templateUrl : 'views/signup.html',
				controller  : 'signupController'
			})

			// route for the contact page
			.when('/view/:id', {
				templateUrl : 'views/view.html',
				controller  : 'viewController'
			});
	});
