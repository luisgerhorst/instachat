// Build 1

/* Befuellt #chat einmal pro Sekunde mit dem inhalt von chat.txt */


// calls refresh() after the page has loaded
load();


// call refresh() all 2 seconds
setInterval(function() {
    load();
}, 1000);

function load() {

    $.ajax({
        url: 'http://luisgerhorst.de:9003/',
        crossDomain: true,
        cache: false,
        dataType: "jsonp",
        jsonpCallback: "html",
        success: function(data) {
            $("#chat").html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
    
} // refresh