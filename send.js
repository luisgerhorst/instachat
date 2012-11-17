// Build 1

var userID = Math.round(Math.random() * 9999999999);

function send(e) {

    if (e.keyCode == 13) {
		$('#new_message').val('');
		return;
	}

	var name='', message='', data='';
	
	name = $('#new_name').val();
    message = $('#new_message').val();

	data = 'requestType=save&userID=' + userID + '&name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message);
    
    $.ajax({
    
        url: 'http://luisgerhorst.de:8010/',
        type: 'post',
        data: data,
        crossDomain: true,
        
    });
  
    $('#name').text(name + ':').removeClass('hide').addClass('show');
    $('#new_name').removeClass('show').addClass('hide');
    
    setTimeout(function() {
    	load();
    }, 100);
		
} // send()

function remove() {

	var name='', message='', data='';
	
	name = $('#new_name').val();
    message = $('#new_message').val();

	data = 'requestType=remove&userID=' + userID + '&name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message);
    
    $.ajax({
    
        url: 'http://luisgerhorst.de:8010/',
        type: 'post',
        data: data,
        crossDomain: true,
        
    });
		
} // send()