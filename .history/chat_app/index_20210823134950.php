<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Firebase App</title>
</head>

<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
<!-- Firebase -->

<script src="https://cdn.firebase.com/js/client/2.0.4/firebase.js"></script>
<!-- AngularFire -->

<script	src="https://cdn.firebase.com/libs/angularfire/0.9.0/angularfire.min.js"></script>


<body ng-app="app">

	<h1>Firebase chatbox</h1>

	<div ng-controller="chatCtrl">

		<div id="chatBox" style="padding: 10px; border: black 1px solid">
			<h1>Chat box</h1>
			<div ng-repeat="chatMessage in chatMessages | limitTo:-15">
				<span style="font-weight: bold">{{chatMessage.name}}</span> : <span>{{chatMessage.message}}</span>
			</div>
		</div>

		<form>
			Name: {{name}} Chat: <input type="text" ng-model="chatMessage" />
			<button type="submit" ng-click="sendChat()">Send</button>
		</form>
	</div>
</body>

<script>

	var app 	=	 angular.module('app', ['firebase']); //Tạo 1 module của angular, inject module firebase vào

	app.controller(
		
		'chatCtrl', 
		
		['$scope', '$firebase',
		
			function($scope, $firebase) {
			
				var name 			= prompt("Enter your name: ", '');
			
				$scope.name 		= name;		 //Lấy tên của người dùng
			
				$scope.chatMessage 	= "";		 //Tẩy trắng khung text
			
				//Kết nối tới service của firebase, url ở đây là url app của bạn ở bước trên nhé
			
				var ref 			= new Firebase("https://amber-torch-****.firebaseio.com/");

				var sync 			= $firebase(ref);

				$scope.chatMessages = sync.$asArray(); //Lấy toàn bộ dữ liệu trong database trên Firebase, biến nó thành 1 array các object trong javascript

				$scope.sendChat 	= function() {

					var chatMessage 	= {

						name			: name,
						message			: $scope.chatMes
					};

					$scope.chatMessages.$add(chatMessage); //Thêm 1 tin nhắn vào array
				
					$scope.chatMes 		= "";
				}
			}
		]
	);

</script>

</html>