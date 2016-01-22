;
(function() {

    var app = angular.module('chatapp', []);




    app.controller('AuthorizeController', function()
    {
        
    });

    app.controller('ChatController', function($timeout) {    	

        // this.sender = guid();
        this.sender = 'sendersendersendersendersendersendersendersendersender';
        // this.messages = [];
        this.messages = defaultMessages;

        this.lastsender;

        this.clearMessage = function() {
            this.message = {
                'sender': this.sender
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
        	$timeout(function() {scrollDown('autoscroll');}, 100);
        };

        this.addSystemMessage = function(text){
        	this.addMessage({
        		system: true,
        		body: text
        	})
        };

        this.checkMessage = function(){
        	return this.message.body == undefined || this.message.body.length === 0;
        }        

        // this.clearMessage();

        var controller = this;

  //       this.socket = new WebSocket('ws://hrbcksq.com:8084')

  //       this.socket.onopen = function(){
  //       	controller.addSystemMessage("Hello, You are connected!")
  //       };

  //       this.socket.onclose = function(){
  //       	controller.addSystemMessage("Connection closed!")
  //       };

  //       this.socket.onerror = function(){
  //       	controller.addSystemMessage("Error occurred")
  //       };

		// this.socket.onmessage = function(message){
  //       	controller.addMessage(JSON.parse(message.data));
  //       };        
    });
}());

// var socket = new WebSocket('ws://hrbcksq.com:8084');

// socket.
//
