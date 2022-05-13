import React from "react";
import {io } from 'socket.io-client';

const socket = io('http://localhost:8080',{
  withCredentials:true,
})
console.log(socket)

function App() {

  return (
    <div>
      <h1>React</h1>
    </div>
  );
}

export default App;
