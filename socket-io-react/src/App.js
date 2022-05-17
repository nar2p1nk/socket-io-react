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
  const [message,setMessage] = useState("");
  const [chat,setChat] = useState([
    {id:0,msg:'hello'},
    {id:1,msg:'heya'}
  ]);
  const [receivedMessage,setReceivedMessage] = useState("")
  const sendMessage = () =>{
    socket.emit('chat message',{message})
    var newId = chat.id + 1;
    var newList = [...chat,{id:newId,msg:message}]
    setChat(newList)
  }

  useEffect(()=>{
    socket.on('receive_message', (data)=>{

      setReceivedMessage(data.message)

      console.log(chat,receivedMessage)
    })
  },[socket,chat,receivedMessage])

  const renderChat = chat.map((i)=>{
    return(
      <li key={i.id}>{i.msg}</li>
    )
  })
  return (
    <div className='app'>
      <ul id="messages">
        {renderChat}
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
