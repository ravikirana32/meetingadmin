myApp.controller('adminController', function($scope,$rootScope,$location,$interval,$http,$routeParams,$log) {
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


				$scope.schedule={};
			  
				//$rootScope.username=localStorage.getItem("username");
			  


			  /*setInterval(function () {
			  	var Time=new Date();

			  	var year1=Time.getUTCFullYear();
			  	var d=Time.getDate();
			  	if(Time.getDate()<=9 ){
			  		var day1="0"+d.toString();
			  	}else{
			  		var day1=Time.getDate();
			  	}

			  	var m=Time.getMonth()+1;
			  	console.log(m);
			  	if(m<=9){
			  		var month1="0"+m.toString();
			  	}else{
			  		var month1=m;
			  	}
			  	
			  	var cdate=year1+"-"+month1+"-"+day1;

			  	

			  	var hour1=Time.getHours();
			  	var minute1=Time.getMinutes();

			  	var curt=hour1+":"+minute1;
			  	

			  	console.log("Current Time  "+cdate);
			  	console.log(curt);

			  	
				


			  	//getMonth(),getDay(),getDate(),getDay(),getHours(), getMinutes(), getSeconds(), getMilliseconds()getUTCFullYear(), getUTCMonth(), getUTCDay(),getTime()
			  	//new Date(milliseconds),getTimezoneOffset()
			}, 10000);*/
			$scope.meetingList=[];


			  $scope.starttime =$scope.endtime=$scope.dt = new Date();

			  $scope.hstep = 1;
			  $scope.mstep = 15;
			  $scope.createmeet=false;
			  $scope.upcomingmeeting=false;

			  $scope.create=function(){
			  	$scope.createmeet=true;
			  	$scope.upcomingmeeting=false;
			  };
			  

			  $scope.ismeridian = true;
			  $scope.toggleMode = function() {
			    $scope.ismeridian = ! $scope.ismeridian;
			  };

			  $scope.changed = function () {
			    $log.log('Time changed to: ' + $scope.starttime+"  "+$scope.endtime);
			  };
			var starthour=$scope.starttime.getHours();
			  	var startminute=$scope.starttime.getMinutes();

			  	var endhour=$scope.endtime.getHours();
			  	var endminute=$scope.endtime.getMinutes();

			  	var startt=starthour+":"+startminute;
			  	var endt=endhour+":"+endminute;


			$scope.scheduleMeeting=function(meet){
					$scope.schedule.starttime=startt;
					$scope.schedule.endtime=endt;
					$scope.schedule.date=$scope.dt;
					console.log($scope.dt);
					var participantslist=$scope.schedule.participants.split(",");
					console.log(participantslist);
					$scope.valuetovalidate={};
					$http.get('/login').
						  success(function(data) {
						  	console.log(data);
						  	$scope.valuetovalidate=data.meetinglists;
						  	console.log($scope.valuetovalidate);
						  	for(var k=0;k<participantslist.length;k++){
								var newuser={};
								newuser.username=participantslist[k];
								newuser.password="meetings";
								$scope.accexit=false;
								//$rootScope.signingup(newuser);
									for(var m=0;m<$scope.valuetovalidate.length;m++){
										if(participantslist[k] == $scope.valuetovalidate[m].username){
											$scope.accexit=true;
										}
									}
									if(!$scope.accexit){
										$http.post('/signup',newuser).
										success(function(data) {
										    console.log("insied success");
										    console.log(data);
										    $location.url("/");
										}).
										  error(function(data) {
										    console.log("insied error");
										    $location.url("/error");
										});
									}	
							}
						  }).
						  error(function(data) {
						    console.log("insied error");
						 });
					
					
					$scope.schedule.participants=participantslist;
					console.log("DATE  "+$scope.schedule.date);

					/*$http.post('/createmeeting',$scope.schedule).
					success(function(data) {
					    console.log("insied success");
					}).
					  error(function(data) {
					    console.log("insied error");
					});*/
			};

			$scope.getMeetings=function(){
				$scope.createmeet=false;
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
			  			$scope.meetingList.push(data.meetinglists[i]);
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
							{field:'',cellTemplate: '<div style="text-align:center;"><button class="btn btn-danger btn-xs" ng-click="remove(row.rowIndex)">Delete</button></div>'}];

			$scope.gridOptions = { 
		        data: 'meetingList',
		        columnDefs: $scope.column
		    };
			//: row.getProperty(col.field) > 30

			$scope.remove=function(val){
				console.log(val);
			};
			  

	});