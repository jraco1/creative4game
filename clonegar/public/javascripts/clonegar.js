/* global angular */
/* global io */
angular.module('clonegarApp', [])
	.controller('clonegarCtrl', clonegarCtrl)
	.directive('player', playerDirective);

// var express = require('express');
// var http = require('http').Server(express);
// var io = require("socket.io")(http);

function clonegarCtrl($scope) {

	// $scope.msgs = new Array();
	$scope.msgs = [];
	$scope.players = [];
	$scope.players.push({ name: "foo", ready: true });
	$scope.room = '';
	$scope.player = [];
	$scope.playerNum = 0;
	$scope.players.push($scope.player);
	$("#startGame").disabled = true;

	// io appears to be declared in 
	// <script src="/socket.io/socket.io.js"></script> in the html
	// var socket = io.connect('http://52.15.33.242:4200');
	var socket = io.connect();

	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from client');
	});

	socket.on('broadcast msg', function(data) {
		// console.log ("broadcast message received");
		// console.log (data);
		$scope.msgs.push(data.user + ": " + data.msg);
		// Needed to make angular update the page immediately.
		$scope.$apply();

		// Scrolls chat to bottom on new message.
		// var msgs = document.getElementById("chat");
		var msgs = $("#chat");
		msgs.scrollTop = msgs.scrollHeight;
	});

	socket.on('first player', function() {
		$('#startGame').disabled = false;
	});

	socket.on('player name change', function(data) {
		$scope.players[data.playerNum % 10].name = data.name;
	});

	socket.on('playerNum', function(data) {
		console.log("playerNum called");
		$scope.playerNum = data;
		$scope.player = { name: "Player " + data, ready: false };
		$scope.players = $scope.player;
		$scope.username = $scope.player.name;
		$scope.$apply();
		console.log($scope.player);
		console.log($scope.players);
	});

	socket.on('disconnect', function(data) {

	});

	socket.on('ready', function(data) {
		$scope.players[data.playerNum % 10].ready = data.ready;
	});

	socket.on('new player', function(data) {
		$scope.players[data.playerNum % 10] = { name: data.username, ready: false };
		console.log ($scope.players);
	});

	socket.on('room', function(data) {
		$scope.room = data;
	});

	$scope.sendMsg = function() {
		// console.log("Sending message");
		socket.emit('chat message', { user: $scope.username, msg: $scope.message, room: $scope.room });
		$scope.message = '';
	};

	$scope.ready = function() {
		$scope.player.ready = !$scope.player.ready;
		socket.emit('ready', $scope.player);
	};

	$scope.processKey = function($event) {
		if ($event.keyEvent.which === 13)
			$scope.sendMsg();
	};
}

function playerDirective() {
	return {
		scope: {
			player: '='
		},
		restrict: 'E',
		replace: 'true',
		template: (

			'<div class="player">' +
			'{{player.name}} <span class="dot" style="background-color="' +
			'{{player.ready ? "green" : "red" }}' +
			'"></span>' +
			'</div>'
		)
	};

}
