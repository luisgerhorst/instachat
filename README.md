**Version 1.0**

send.js sends the message (using jQuery Ajax) to server.js that creates an array with all users in it. load.js send's a request to server which creates the html with the values of the array and returns it to the client.

# Guidance

Instachat is a bit different to normal chats:

1. Everything you type into the message field is sent to the server instantly

2. There's always only one entry per person

3. Just entries from persons who are online are visible

4. Use enter to reset the message field

# Install

1. Install node.js, you find a guidance for Mac, Windows, Ubuntu and a few more systems on http://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

2. Download instachat and navigate to it's directory.

3. Open send.js in a text editor, change 'http://luisgerhorst.de:8010/' in line 22 to your server's domain and save the file. (For example if your domain is 'http://alf.me/' you have to change it to 'http://alf.me:8010/'.)

4. Open load.js and change 'http://luisgerhorst.de:8010/' in line 18 to your server's domain and save the file.

5. Open the command line and navigate to the chat's directory, then execute server.js with node by typing "nohup node server.js &" and you're done! (If you just type "node server.js", the process stops when you close the Terminal.)

# More

If you've started the chat with "nohup node server.js &", everything you would have seen on the command line is added to nohup.out (in the chat's folder). Very helpful if there's an error or something. 

If you want to **stop the chat**, you can get it's PID by typing "ps aux", search the process with the command "node server.js", and write "kill -s 15 PID-OF-NODE-WRITE-JS" (if the PID is 1267, you have to type "kill -s 15 1267").

If you **use the chat regularly**, you can **add ?name=[your name]** to the chat's URL so your name is automatically added into the Name field. Example URL: http://chat.luisgerhorst.de/?name=Alf