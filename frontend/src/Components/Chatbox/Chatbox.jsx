import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // use your backend URL here

const ChatBox = ({ customerId, workerId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const roomId = `${customerId}_${workerId}`;
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', { roomId });

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [roomId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const message = {
        senderId: customerId,
        text: input,
        timestamp: new Date().toISOString()
      };

      socket.emit('sendMessage', { roomId, message });
      setMessages((prev) => [...prev, message]);
      setInput('');
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.senderId === customerId ? styles.myMessage : styles.theirMessage}>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '800px',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  chatBox: {
    flex: 1,
    padding: '10px',
    height: '300px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9'
  },
  inputBox: {
    display: 'flex',
    borderTop: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    marginLeft: '8px',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none'
  },
  myMessage: {
    textAlign: 'right',
    margin: '5px 0',
    backgroundColor: '#d1e7dd',
    padding: '5px 10px',
    borderRadius: '10px'
  },
  theirMessage: {
    textAlign: 'left',
    margin: '5px 0',
    backgroundColor: '#f8d7da',
    padding: '5px 10px',
    borderRadius: '10px'
  }
};

export default ChatBox;
