import {nanoid} from "nanoid";
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
  const [message,setMessage] = useState({});
  const [chat,setChat] = useState([{id:0,msg:'hello'},{id:1,msg:'heya'}]);
//  const [receivedMessage,setReceivedMessage] = useState("")


  const onChangeSetMessage = (e)=>{
    setMessage({id:null,msg:e.target.value})
  }

  const sendMessage = () =>{
    if(message.msg === undefined){
      return;
    }
//      var newList = [...chat,{id:newId,msg:message}]
    var newId = nanoid();
    var newObject = {id:newId,msg:message.msg};
    var newArray = chat.concat(newObject)
//    setChat(chat.splice(chat.length,0,{id:newId,msg:message.msg}))
    setChat(newArray)
    console.log(typeof(chat),chat)
    socket.emit('chat message',message)
    socket.emit('log chat',chat)
  }

  useEffect(()=>{
    socket.on('receive_message', (data)=>{
      var newId = nanoid();
      var newObject = {id:newId,msg:data.msg};
      var newArray = chat.concat(newObject)
      console.log('message received: ' + data.msg)
      setChat(newArray)
      console.log(typeof(chat))
    })
  },[chat])

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
      <form id='form' onSubmit={(e)=> {e.preventDefault();console.log('form submitted')}}>
        <input id="input" autoComplete="off"
          placeholder='messages...'
          required={true}
          onChange={onChangeSetMessage}
        />
        <button onClick={sendMessage} >Send</button>
      </form>
    </div>
  );
}

export default App
