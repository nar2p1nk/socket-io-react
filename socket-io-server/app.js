const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/',(req,res)=>{
    res.send('<h1>Hello asshole</h1>');
});

io.on('connection',(socket)=>{
    console.log('a user has connected')
})


server.listen(8000,()=>{
    console.log('listening on localhost:8000/')
})

