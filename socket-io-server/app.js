const express = require('express');
const {createServer } = require('http');
const {Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:'http://localhost:3000',
    credentials:true,
    methods:["GET","POST"],
    allowedHeaders:["custom-Header"]
  }
});

//app.get('/',(req,res)=>{
//  res.sendFile(__dirname + '/index.html')
//})



io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', msg=>{
    console.log(msg);
  });
});



httpServer.listen(8080,()=>{
  console.log('server running on http://localhost:8080')
})
