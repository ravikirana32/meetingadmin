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