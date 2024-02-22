"use strict";
// import { WebSocketServer } from "ws";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsServer = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var WebSocketServer = require('ws').WebSocketServer;
var http = require('http');
var uuidv4 = require('uuid').v4;
// Spinning the HTTP server and the WebSocket server.
var server = http.createServer();
exports.wsServer = new WebSocketServer({ server: server });
var port = 8001;
server.listen(port, function () {
    console.log("WebSocket server is running on port ".concat(port));
});
// I'm maintaining all active connections in this object
var clients = [];
// A new client connection request received
exports.wsServer.on('connection', function (connection) {
    // Generate a unique code for every user
    var userId = uuidv4();
    console.log("Received a new connection.");
    // Store the new connection and handle messages
    connection.id = userId;
    var newClient = { "userId": userId, "connection": connection };
    clients.push(newClient);
    console.log("".concat(userId, " connected."));
    console.log("client length ".concat(clients.length));
    connection.send(JSON.stringify({ "userId": userId }));
    connection.onmessage = function (event) {
        console.log("Received message: ".concat(event.data));
        clients.map(function (client) {
            if (client.connection.id === connection.id)
                return;
            client.connection.send(event.data);
        });
    };
});
