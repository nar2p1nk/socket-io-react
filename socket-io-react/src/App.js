import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:8080',{
  withCredentials:true,
  extraHeaders:{
    "custom-Header":"abcd"
  }
})
 
function App() {
//  const [listMessages, setListMessages] = useState([])
//
//  const socketSubmit = (event) =>{
//    var list = listMessages;
////    const messages = document.getElementById('messages');
//    const input = document.getElementById('input');
//
//    event.preventDefault();
//     if(input.value){
//      socket.emit('chat message',input.value);
//      input.value = "";
//    };
//    event.text = event.text.trim();
//    list = [...listMessages,event]
////    socket.on("chat message", function(msg){
////    })
//
//    console.log(list);
//    setListMessages(list)
//  }
  const [message,setMessage] = useState("");
  const [chat,setChat] = useState("");
  const [listMessages,setListMessages] = useState([])
  const sendMessage = () =>{
    socket.emit('chat message',{message})
  }

  useEffect(()=>{
    socket.on('receive_message', (data)=>{
//      setReceivedMessage(data.message)
      var newList = [...listMessages,data.message];
      setListMessages(newList)
      console.log(listMessages)
    })
  },[socket])

  return (
    <div className='app'>
      <ul id="messages">
        {listMessages}
      </ul>
      <form id='form' onSubmit={(e)=>{e.preventDefault()}}>
        <input id="input" autoComplete="off"
        placeholder='messages...'
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}

export default App
