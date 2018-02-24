'use strict';

const net = require('net');
const EE = require('events');
const Client = require ('./model/client.js')
const PORT = process.env.PORT||3000;
const ee = new EE();

const server = net.createServer();

const pool = [];

server.on('connection', function(socket){
    var client = new Client(socket);
    pool.push(client);
    console.log(client.nickname)
});

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
