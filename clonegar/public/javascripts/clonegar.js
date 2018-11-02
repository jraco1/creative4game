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
        $scope.msgs.push (data.user + ": " + data.msg);
        // Needed to make angular update the page immediately.
        $scope.$apply();
        // Scrolls chat to bottom on new message.
        var msgs = document.getElementById("chat");
        msgs.scrollTop = msgs.scrollHeight;
    });

    $scope.sendMsg = function() {
        // console.log("Sending message");
        socket.emit('chat message', { user: $scope.username, msg: $scope.message });
        $scope.message = '';
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
            '{{player.name}} <span class="dot"></span>' +
            '</div>'
        )
    };

}
