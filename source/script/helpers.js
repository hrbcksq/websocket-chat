var defaultMessages = [
		{
			'sender': "",
			'body': 'Lorem ipsum',
			'system': true
		},
		{
			'sender': "",
			'body': 'sit amet',
			'system': true
		}
	];

function guid() {
	function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
	  .toString(16)
	  .substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
};

function scrollDown(id){
	var scroller = document.getElementById(id);
    scroller.scrollTop = scroller.scrollHeight;
};