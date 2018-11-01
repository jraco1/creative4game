/* global angular */
angular.module('clonegarApp', [])
    .controller('clonegarCtrl', clonegarCtrl)
	.directive('player', playerDirective);

// var express = require('express');
// var http = require('http').Server(express);
// var io = require("socket.io")(http);

function clonegarCtrl($scope) {

}

// io appears to be declared in 
// <script src="/socket.io/socket.io.js"></script> in the html
var socket = io.connect('http://52.15.33.242:4200');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on('messages', function(data) {
    alert(data);
});
// io.on ('connection', function (socket){
//     console.log ('a user connected');
// });

function playerDirective() {
	return {
		scope: {
			player: '='
		},
		restrict: 'E',
		replace: 'true',
		template: (
			
			'<div class="player">' +
			'{{player.name}} <span class="dot"></span>' +
			'</div>'
			
// 			'<div class="definition">' +
// 			'<div class="flip-box">' +
// 			'<div class="flip-box-inner">' +

// 			'<div class="flip-box-front">' +
// 			'<h1>{{definition.type}}</h1></div>' +

// 			'<div class="flip-box-back">' +
// 			'<h4>Definition</h4>' +
// 			'<p>{{definition.definition}}</p>' +
// 			'<h4>Example</h4>' +
// 			'<p>{{definition.example}}</p></div>' +

// 			'</div></div></div>'
		)
	};

}