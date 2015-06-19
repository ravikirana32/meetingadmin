	// create the module and name it scotchApp
	var myApp = angular.module('myApp', ['ngRoute']);

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

	myApp.controller('mainController', function($scope, $interval,$location,$http,$rootScope) {
		$scope.login;
		$scope.logins = function(val){
			$scope.validate;
			$http.get('/login').
			  success(function(data) {
			  	var i=0;
			  	for(i=0;i<data.users.length;i++){
			  		if(data.users[i].username==val.username){
			  			$scope.validate=data.users[i];
			  		}
			  	}
			    $rootScope.username=$scope.validate.username;
			    if($scope.validate.username=="admin" && $scope.validate.password=="admin"){
					$location.url("admin/"+$scope.validate._id);
				}else if(val.username==$scope.validate.username && val.password==$scope.validate.password){
					$location.url("view/"+$scope.validate._id);
				}else{
					$location.url("error");
				}
			  }).
			  error(function(data) {
			    console.log("insied error");
			 });
			
		};

		
	});

	myApp.controller('adminController', function($scope,  $location,$interval,$http,$routeParams) {
		//console.log($routeParams.id);
		
		var socket = io();
			/*$scope.values={};
			$scope.valueslist=[];
			socket.emit('send id', $routeParams.id);
			$scope.submitvalues=function(){
				console.log($scope.values);
				$scope.valueslist.push($scope.values);
				$scope.$apply();
				socket.emit('send data', $scope.valueslist);
				$scope.values=null;
				return false;
			};
		        

			$scope.removeValue=function(val){
				console.log("inside remove  "+val);
				$scope.valueslist.splice(val,1);
				$scope.$apply();
				socket.emit('send data', $scope.valueslist);
				return false;
			};*/

	});

	myApp.controller('errorController', function($scope) {
		
	});

	myApp.controller('viewController', function($scope,$rootScope) {
		var socket = io();
		/*$scope.messagelist=[];
		$scope.name="kirana";
      socket.on('send data', function(msg){
        $scope.messagelist=msg;
        $scope.$apply()
      });*/
	});

	myApp.controller('signupController', function($scope,$rootScope,$location,$http) {
		$scope.signup;
		$scope.signingup=function(values){
			console.log("inside signup ");
			console.log(values);
			$http.post('/signup',values).
			success(function(data) {
			    console.log("insied success");
			    console.log(data);
			    $location.url("/");
			}).
			  error(function(data) {
			    console.log("insied error");
			    $location.url("/error");
			});
		};
	});