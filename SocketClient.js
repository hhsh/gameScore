var net = require('net');

var socketClient = new net.Socket();
socketClient.setEncoding('utf8');

// connect to TCP server
socketClient.connect ('8124', function () {
    console.log('connected to server');
});

// prepare for input from terminal
process.stdin.resume();

// when receive data, send to server
process.stdin.on('data', function (data) {
   socketClient.write(data);
});

// when receive data back, print to console
socketClient.on('data',function(data) {
    console.log(data);
});

// when server closed
socketClient.on('close',function() {
    console.log('connection is closed');
}); 
