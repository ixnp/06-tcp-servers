'use strict';

const net = require('net');
const EE = require('events');
const Client = require ('./model/client.js')
const PORT = process.env.PORT||3000;
const ee = new EE();

const server = net.createServer();

const pool = [];

ee.on('@nickname', (client, string)=>{
    let nickname = string.split(' ').shift().trim();
    client.nickname = nickname;
    client.socket.write(`nickname updated to ${nickname}`);
});
// ctrl ] quit//
//ee.on('@quit') should disconnect//
ee.on('@list', (client) => {

        console.log('Active Users:')
    pool.forEach(function(client){
        console.log(client.nickname); 
    })
  
 
    
    // let userName = client.nickname;
 
});//list all connected users//
//ee.on('@dm')should dm specific user//

server.on('connection', function(socket){
    var client = new Client(socket);
    pool.push(client);
    console.log(client.nickname);
    socket.on('data', function(data){
        const command = data.toString().split(' ').shift().trim();
        const string = data.toString().split(' ').splice(1).join(' ');
        if(command.startsWith('@')){
            ee.emit(command, client, string);
            return;
        }
        ee.emit('defualt');
        console.log(client.nickname + ':' + command);
    });
});


server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});


