myApp.controller('viewController', function($scope,$rootScope,$http) {
		var socket = io();
		/*$scope.messagelist=[];
		$scope.name="kirana";
      socket.on('send data', function(msg){
        $scope.messagelist=msg;
        $scope.$apply()
      });*/
		//$rootScope.username=localStorage.getItem("username");
		$scope.getMeetings=function(){
				//$scope.createmeet=false;
			  	$scope.upcomingmeeting=true;
			  	$scope.meetingList=[];
				$http.get('/getMeeting').
			  success(function(data) {
			  	console.log("inside success");
			  	//console.log(data);
			  	var i=0;
			  	for(i=0;i<data.meetinglists.length;i++){
			  		//console.log(data.meetinglists[i].Title);
			  		if(data.meetinglists[i].Title=="meeting"){
			  			for(var j=0;j<data.meetinglists[i].Participants.length;j++){
			  				if(data.meetinglists[i].Participants[j] == $rootScope.username){
			  					$scope.meetingList.push(data.meetinglists[i]);
			  				}
			  			}
			  			
			  		}
			  		
			  	}
			  	console.log($scope.meetingList);
			  }).
			  error(function(data) {
			    console.log("insied error");
			 });
			};

			$scope.column=[{field:'MeetingName', displayName:'MeetingName'}, 
							{field:'date', displayName:'Date'},
							{field:'StartTime', displayName:'StartTime'}, 
							{field:'EndTime', displayName:'EndTime'},
							{field:'Participants', displayName:'Participants'},
							{field:'',cellTemplate: '<div style="text-align:center;"><button class="btn btn-primary" ng-click="lanch(row.rowIndex)" ng-disabled="true">Lanch</button></div>'}];

			$scope.gridOptions = { 
		        data: 'meetingList',
		        columnDefs: $scope.column
		    };
			//: row.getProperty(col.field) > 30

			$scope.lanch=function(val){
				console.log(val);
			};
	});