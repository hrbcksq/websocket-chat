;
(function() {

    var app = angular.module('chatapp', ['ngCookies']);

    app.factory('userService', function() {
        return {
            'name': 'anonymous'
        };
    });

    app.controller('AuthorizeController', function($cookies, modalService, userService) {        

        this.Authorize = function() {
            if ($cookies.get('name') && !this.rememberme) {                
                $cookies.remove('name')
                $cookies.remove('id')
            };
            if (this.rememberme) {
                $cookies.set('name', this.name)
                $cookies.set('id', guid());
            }                
        };

        this.IsValid = function() {
            return this.name
        };

        if (!$cookies.get('name'))
        {
            modalService.setContent(this.loginHeader, this.loginBody, this.loginFooter);
            modalService.modal();
        }
    });

    app.controller('MessengerController', function($timeout, userService) {
        this.messages = [];
        
        this.sender = userService.name;
        // this.sender = guid();

        this.lastsender;

        this.clearMessage = function() {
            this.message = {
                'sender': this.sender,
                'body': ''
            };
        };

        this.sendMessage = function(message) {
            // this.socket.send(JSON.stringify(message));
            this.addMessage(message);
            this.clearMessage();
        };

        this.addMessage = function(message) {
            message.self = !message.system && message.sender === this.sender;
            message.sender = this.lastsender === message.sender && this.lastsender ? message.sender = '' : this.lastsender = message.sender;
            this.messages.push(message);
            $timeout(function() {
                scrollDown('autoscroll');
            }, 100);
        };

        this.addSystemMessage = function(text) {
            this.addMessage({
                system: true,
                body: text
            })
        };

        this.checkMessage = function() {
            return this.message.body == undefined || this.message.body.length === 0;
        }

        this.clearMessage();

        var controller = this;

        //       this.socket = new WebSocket('ws://hrbcksq.com:8084')

        //       this.socket.onopen = function(){
        //          controller.addSystemMessage("Hello, You are connected!")
        //       };

        //       this.socket.onclose = function(){
        //          controller.addSystemMessage("Connection closed!")
        //       };

        //       this.socket.onerror = function(){
        //          controller.addSystemMessage("Error occurred")
        //       };

        // this.socket.onmessage = function(message){
        //          controller.addMessage(JSON.parse(message.data));
        //       };        
    });
}());

// var socket = new WebSocket('ws://hrbcksq.com:8084');

// socket.
//
