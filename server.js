// Build 1

/* get's the by send.js sent data */


// required modules:
var http = require("http"),
    querystring = require("querystring"),
    fs = require('fs');


// starts a server and listens on port 8002
var port = 8010;
http.createServer(onRequest).listen(port);
console.log("Server started, listening on port " + port + "\n");


// listens for the POST data
function onRequest(req, res) {

    //console.log("Received request\n");

    var postData = '';
    
    res.writeHead(200, {'Content-Type': 'text/plain'});

    req.setEncoding("utf8"); // post data encoding is now UTF8

    req.addListener("data", function(postDataChunk) { // listens for the data
        postData += postDataChunk; // when a new chunk ('part') of the sent data arrives it's appended to "postData"
        console.log("Received POST data chunk:\n'" + postDataChunk + "'\n");
    });

    req.addListener("end", function() { // when the whole data has arrived:
    
        var requestType='', userID='', name='', message='';
        requestType = querystring.parse(postData).requestType;
        userID = querystring.parse(postData).userID;
        name = encodeHTML(querystring.parse(postData).name);
        message = encodeHTML(querystring.parse(postData).message);
        
        if (requestType && userID && name && message) {
            console.log("Received valid POST data:\nrequestType='" + requestType + "'\nuserID='" + userID + "'\nname='" + name + "'\nmessage='" + message + "'\n");
        	if (requestType == 'save') save(userID, name, message);
        	if (requestType == 'remove') remove(userID);
        }
        
    });
    
    response(res);

}

var user = new Array();

function save(userID, name, message) {

    var newUser = new Array();
    newUser["userID"] = userID;
    newUser["time"] = new Date().getTime();
    newUser["name"] = name;
    newUser["message"] = message;
    
	for (var i=0; i<user.length; i++) {
		if (user[i]["userID"] == userID) {
			user[i] = newUser;
			console.log("User found & updated, ID=" + user[i]["userID"] + "\n");
			return;
		}
	}
	
	autoRemove();
    
	user[user.length] = newUser;
	
	console.log("Added newUser to user.\n");
	
	return;
	
}

function remove(userID) {
    
	for (var i=0; i<user.length; i++) {
		if (user[i]["userID"] == userID) {
			user.splice(i, 1);
			console.log("User found & removed, ID=" + userID + "\n");
		}
	}
	
}

function response(res) {

    var html='';
    
    for (var i=0; i<user.length; i++) {
        if (user[i]["userID"] && user[i]["name"] && user[i]["message"]) {
			html = html + '<div class="entry"><div class="name">' + user[i]['name'] + ':</div><div class="message">' + user[i]['message'] + ' </div></div>';
		}
	}
    
    res.end('html(\'' + html + '\')');
    
}

// function via http://css-tricks.com/snippets/javascript/htmlentities-for-javascript/ - encodes HTML tags
function encodeHTML(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

setInterval(function() {
    autoRemove();
}, 60*60*1000);

function autoRemove() {
	for (var i=0; i<user.length; i++) {
		if (new Date().getTime() - user[i]["time"] >= 60*1000) {
			user.splice(i, 1);
			console.log("Invalid user found and removed.\n");
		}
	}
}