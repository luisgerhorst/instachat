// Build 1

/* A few more functions */


$(document).ready(function () {

$('#new_name').val(parseGET('name')); // adds the content of the GET parameter "name" into the name field

// get's the content of GET parameter
function parseGET(name) {
    return unescape((RegExp(name + '=' + '(.+?)(&|$)').
    exec(location.search)||[,''])[1]);
}

$('#guidance p.hide-guidance').click(function() {
	$('#guidance').hide('slow');
});

setTimeout( function() {
	$('#guidance').hide('slow');
}, 30*1000);

}); // document.ready