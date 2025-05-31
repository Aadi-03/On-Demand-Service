import  { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from "axios";
import './Chatbox.css';

const socket = io('http://localhost:5000');

const ChatBox = ({ taskId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {

     async function fetchMessages() {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${taskId}`);
         console.log(response?.data?.chat?.messages);
        setMessages(response?.data?.chat?.messages);
      }
      catch(err)
      {
        console.error('Error fetching messages:', err);
      }
    }
    fetchMessages();
    socket.on('receiveMessage', (message) => {

      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const message = {
        taskId : taskId,
        text: input,
        timestamp: new Date().toISOString()
      };
            

      
let data = JSON.stringify({
  "taskId": taskId,
  "message": {
    "senderType": "Customer",
    "text": message.text
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:5000/chat',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  }
  catch (error) {
    console.log(error);
  }
}

makeRequest();


      socket.emit('sendMessage', { message });
      // setMessages((prev) => [...prev, message]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages?.map((msg, index) => (
          <div 
            key={index} 
            className="message-container"
            style={{
              justifyContent: msg.senderType === 'Customer' ? 'flex-end' : 'flex-start'
            }}
          >
            <div className={msg.senderType === 'Customer' ? 'my-message' : 'their-message'}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
