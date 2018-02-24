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
    console.log(client.nickname);

    socket.on('data', function(data){
        const command = data.toString().split('').shift().trim();
        if(command.startsWith('@')){
            ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
            console.log('yaaaaa')
            return;
        }

        ee.emit('default');
        console.log('command:', command);
    });
});

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
