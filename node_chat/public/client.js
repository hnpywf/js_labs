$(document).ready(function(){
	var name = '';

	
	function go(){
		name = $('#user-name').val();
		$('#user-name').val('');
		$('.user-form').hide();
		$('.chat-box').show();
	};

	$('#user-name').keydown(function(e){
		if(e.keyCode == 13){
			go();
		}
	});
	$('.go-user').on('click', function(e){
		go();
	});



});