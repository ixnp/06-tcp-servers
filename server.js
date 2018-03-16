'use strict';

const net = require('net');
const EE = require('events');
const Client = require ('./model/client.js')
const PORT = process.env.PORT||3000;
const ee = new EE();

const server = net.createServer();

const pool = [];

ee.on('@nickname', (client, string)=>{
    let oldname = client.nickname
    let nickname = string.split(' ').shift().trim();
    client.nickname = nickname;
    client.socket.write(`nickname updated to ${nickname}`);
    liveChat(client,`${oldname}nickname updated to ${nickname}`);
});

ee.on('@quit', function(client) {
    pool.splice(pool.indexOf(client), 1);
    console.log(client.nickname + 'left the chat')
    liveChat(client, + `${nickname} left the chat`);
});

ee.on('@list', (client) => {
    console.log('Active Users:')
    pool.forEach(function (client) {
        console.log(client.nickname);
        client.socket.write(client.nickname);
    })
});

ee.on('@dm', function(client, string) {
    let userNames = [];
    let splitString = string.split(' ');

    let message = splitString.reduce((count, word, ind) => {

        if(word[0] != '@') {
            count += word;
            if(ind < splitString.length - 1) count += " ";
        }
        else(userNames.push(word));
        return count;
    }, "");

 
    userNames.forEach(name => {
        pool.forEach(cl => {
            if(`@${cl.nickname }`=== name) {
                cl.socket.write(message);
               
            }
        })
    })

 
})

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
        liveChat(client,command);
    });
});

function liveChat(client,command){
    pool.forEach(function(client, index, pool){
        client.socket.write(`\n${client.nickname}: ${command}`);
    })
}


server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});


