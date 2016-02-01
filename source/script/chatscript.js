;
(function() {

    var app = angular.module('chatapp', ['ngCookies','ngMessages']);

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
                $cookies.put('name', userService.name);
                $cookies.put('id', userService.id);
            }           
            angular.element("#auth-view").modal('hide');   
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

        $cookies.get('name') ? this.Login() : this.SingUp();
    });

    app.controller('MessengerController', function($timeout, userService) {
        this.messages = [];       
        
        // userService.name = guid();

        this.lastsender;

        this.clearMessage = function() {
            this.message = {                
                'body': ''
            };
        };

        this.sendMessage = function(message) {
            message.sender = userService.name;
            // this.socket.send(JSON.stringify(message));
            this.addMessage(message);
            this.clearMessage();
        };

        this.addMessage = function(message) {
            message.self = !message.system && message.sender === userService.name;
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
