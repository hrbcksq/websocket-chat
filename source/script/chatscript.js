;
(function() {

    var app = angular.module('chatapp', ['ngCookies']);

    app.factory('userService', function() {
        return {
            'name': 'anonymous'
        };
    });

    app.controller('AuthorizeController', function($cookies, userService) {        

        this.SingIn = function() {
            if ($cookies.get('name')) {                
                $cookies.remove('name')
                $cookies.remove('id')
            };            
            userService.name = this.name;
            userService.id = guid();
            if (this.rememberme) {
                $cookies.set('name', userService.name);
                $cookies.set('id', userService.id);
            }              
        };

        this.SingUp = function(){
            this.rememberme = true;
            this.name = '';
            angular.element("#auth-view").modal('show');
        };

        this.Login = function(){
            userService.name = $cookies.get('name');
            userService.id = $cookies.get('id');
        };

        this.IsValid = function() {
            return this.name && this.name.length > 3 && this.name.length < 10;
        };

        $cookies.get('name') ? this.Login() : this.SingUp();
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
