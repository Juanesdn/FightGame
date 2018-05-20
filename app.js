//Se importa express.js

var express = require('express');
// Se asigna a la variable app
var app = express();
//Crea el servidor 
var serv = require('http').Server(app); //Server-11

//Envia el index.html cuando se hace un request a la 
//ruta indicada, en este caso es ('/')
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));

// Se habilita el puerto 2000
serv.listen(process.env.PORT || 2000);
console.log("Server started.");

 // enlaza el objeto serv con socket.io
var io = require('socket.io')(serv,{});

// Espera los request de conexión por parte del cliente
io.sockets.on('connection', function(socket){
	console.log("socket connected"); 
	// muestra el id del socket
	console.log(socket.id);
});
