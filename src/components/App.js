import React, { useState, useEffect, useRef } from 'react';


function App() {

  const webSocket = useRef(null);
  const [joined, setJoined] = useState(false);
  const [messageList, setMessageList] = useState([]);

  // State for message
  const [msgText, setMsgText] = useState("");

  // State for user
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log('Joining chat');
    webSocket.current = new WebSocket('ws://localhost:8000' + '/ws');
    webSocket.current.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      setMessageList(messageList => [...messageList, parsedMessage]);
      console.log(message);
    };
    return () => webSocket.current.close(); 
  }, []);

  const sendMessage = () => {
    if(msgText !== "") {
      webSocket.current.send(
        JSON.stringify({
          email: email,
          username: username,
          message: msgText
        })
      )
    }

    // Clear message text
    setMsgText("");
  }

  const joinChat = () => {
    if(!email) {
      return
    }
    if(!username) {
      return
    }
    setJoined(true);
  }

  const handleEmailChange = (e) => {
    let updatedText = e.target.value;

    if(updatedText.length <= 50) {
      setEmail(e.target.value);
    }
  }

  const handleUsernameChange = (e) => {
    let updatedText = e.target.value;

    if(updatedText.length <= 25) {
      setUsername(e.target.value);
    }
  }

  const handleMessageChange = (e) => {
    let updatedText = e.target.value;
    if(updatedText.length > 50) {
      // Increase size of textbox
    }
    setMsgText(updatedText);
  }

  return (
    <div className="w-screen h-screen bg-green-200 flex flex-col bg-white items-center justify-center">
      { !joined &&
      <div className="flex flex-col items-center justify-center bg-white rounded-lg w-1/4 h-1/4">
        <h1 className="text-4xl font-bold text-green-200 m-2 p-2">
          mintChat
        </h1>
        <input 
          className="text-2xl border-2 border-green-200 w-5/6 m-2 p-2 rounded-lg" 
          type="text" 
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input 
          className="text-2xl border-2 border-green-200 rounded-lg w-5/6 m-2 p-2" 
          type="text" 
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <button 
          className="text-2xl border-2 border-green-200 bg-green-200 rounded-lg w-5/6 m-2 p-2"
          onClick={joinChat}
        >
          Start Chatting
        </button>
      </div>
      }
      { joined &&
      <div className="flex flex-col bg-white items-center justify-center rounded-lg w-3/5 h-4/5">
        <h1 className="text-4xl font-bold text-green-200 m-2 p-2">
          mintChat
        </h1>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-5/6 h-5/6 m-2 p-2 border-2 border-green-200 rounded-lg">
            { messageList && messageList.map((msg) => (
              <div className="flex flex-col items-start justify-center">
                <h2 className="p-2 pb-0 ml-2">
                  {msg.username}
                </h2>
                <h2 className="bg-green-200 rounded-lg p-2 mb-2 mr-2 ml-2 w-4/5">
                  {msg.message}
                </h2>
              </div>
            ))
            }
          </div>
          <div className="flex flex-row items-center justify-center w-5/6 m-2 p-2">
            <input
              className="text-2xl border-2 border-green-200 w-3/4 m-2 p-2 rounded-lg"
              type="text" 
              value={msgText}
              onChange={handleMessageChange}
            />
            <button
              className="text-2xl border-2 border-green-200 bg-green-200 rounded-lg w-1/4 m-2 p-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
