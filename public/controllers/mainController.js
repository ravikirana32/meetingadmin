myApp.controller('mainController', function($scope, $interval,$location,$http,$rootScope) {
		$scope.login;
		$scope.logins = function(val){
			$scope.validate;
			$http.get('/login').
			  success(function(data) {
			  	var i=0;
			  	console.log(data);
			  	for(i=0;i<data.meetinglists.length;i++){
			  		if(data.meetinglists[i].username==val.username){
			  			$scope.validate=data.meetinglists[i];
			  		}
			  	}
			    

			    /*if (typeof(Storage) != "undefined") {
				    localStorage.setItem("username", $scope.validate.username);
				} else {
				    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
				}*/
				//$rootScope.username=localStorage.getItem("username");
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