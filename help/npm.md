# Create a local live server
step 1:

&nbsp;	npm install live-server -g
&nbsp; npm uninstall live-server

step 2:

&nbsp;	npm live-server

The prerequisite is Node.js.

Also create use Python command. (Mention in Python file)

# Run JavaScript file 
step-1:

&nbsp;	npm init -y (create default file)

step-2:

&nbsp;	node hellow.js
var http = require('http');
var upCase = require('upper-case');

http.createServer(function (req, res) {

&nbsp; res.writeHead(200, {'Content-Type': 'text/plain'});

&nbsp; res.write(upCase.upperCase('Hello World\\n'));

&nbsp; res.write('The sum of x and y is: ' + z + '\\n');

&nbsp; res.end(add(x, y) + '\\n');

}).listen(8000);

let x = 5;
let y = 10;
let z = x + y;  
console.log(z);

function add(a, b) {
&nbsp; return a + b;
}   





