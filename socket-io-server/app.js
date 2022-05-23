const express = require('express');
const {createServer } = require('http');
const {Server } = require('socket.io');
const cors = require('cors');
const app = express();
const {nanoid} = require('nanoid');

app.use(cors());

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
  console.log('a user has connected:');
  socket.on('log chat', (chat)=>{
    console.log(chat)
  })
  socket.on('chat message', (msg)=>{
    msg.id = nanoid();
    console.log('message',msg)
    socket.broadcast.emit('receive_message',msg)
  });
});



httpServer.listen(8080,()=>{
  console.log('server running on http://localhost:8080')
})
