// import { WebSocketServer } from "ws";

/* eslint-disable @typescript-eslint/no-var-requires */
const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Spinning the HTTP server and the WebSocket server.
const server = http.createServer();
export const wsServer = new WebSocketServer({ server });
const port = 8001;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

type Client = {
  userId:string
  connection: WebSocket & { id?: string }
}
// I'm maintaining all active connections in this object
const clients: Client[] = [];

// A new client connection request received
wsServer.on('connection', function(connection : WebSocket & { id?: string }) {
  // Generate a unique code for every user
  const userId = uuidv4();
  console.log(`Received a new connection.`);

  // Store the new connection and handle messages
  connection.id = userId;
  const newClient = { "userId": userId, "connection": connection}
  clients.push(newClient);
  console.log(`${userId} connected.`);
  console.log(`client length ${clients.length}`)
  connection.send(JSON.stringify({ "userId": userId }));

  connection.onmessage = (event: MessageEvent) => {
    console.log(`Received message: ${event.data}`);
    clients.map((client: Client) => {
      if(client.connection.id === connection.id) return
      client.connection.send(event.data);
    })
  }
});



