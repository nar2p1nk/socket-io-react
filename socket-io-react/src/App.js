import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://127.0.0.1:8000/'))
  },[])
  return (
    <p>
      socket.io rocks!
    </p>
  );
}

export default App;
