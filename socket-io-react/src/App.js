import React, {useEffect} from "react";
import {io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:8080',{
  withCredentials:true,
  extraHeaders:{
    "custom-Header":"abcd"
  }
})


  
function App() {

  const SocketSubmit = (event) =>{
    const messages = document.getElementById('messages');
    const input = document.getElementById('input');


    event.preventDefault();
     if(input.value){
      socket.emit('chat message',input.value);
      input.value = "";
    };

//    useEffect(()=>{
//      console.log('effect')
//  });

  }


  return (
    <div className='app'>
      <ul id="messages"></ul>
      <form id="form" onSubmit={SocketSubmit}>
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App
