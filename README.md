![cf](https://i.imgur.com/7v5ASc8.png) Lab 06: TCP Chat Server
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration 
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.

* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **package.json** - contains npm package config
  * create a `start` script for running your server
* **lib/** - contains module definitions

## Feature Tasks  
For this assignment, you will be building a TCP chatroom. Clients should be able to connect to the chatroom through the use of telnet. Clients should also be able to run special commands to exit the chatroom, list all users, reset their nickname, and send direct messages. You may add as many features to this application as you would like. Do not use any third party libraries and testing is *not* required.

##### Minimum Requirements 
* Create a TCP Server using the NodeJS `net` module
* Create a Client constructor that models an individual connection 
  * Each client instance should contain (at least) `id`, `nickname`, and `socket` properties
* Clients should be able to send messages to all other clients by sending it to the server
* Clients should be able to run special commands by sending messages that start with a command name
  * The client should send `@quit` to disconnect
  * The client should send `@list` to list all connected users
  * The client should send `@nickname <new-name>` to change their nickname
  * The client should send `@dm <to-username> <message>` to send a message directly to another user by their nickname
* Connected clients should be maintained in an in-memory collection (array) called the `clientPool`
  * When a socket emits the `close` event, the socket should be removed from the client pool
  * When a socket emits the `error` event, the error should be logged on the server
  * When a socket emits the `data` event, the data should be logged on the server and the commands below should be implemented

##  Documentation  
Write basic documention for starting your server connection and using the chatroom application.  Be sure to use proper markdown constructs and `highlight blocks of code`.
