import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './WorkerChatPage.css';

// Material UI imports for better UI
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify'; 

const WorkerChatPage = ({ taskId: propTaskId, orderId: propOrderId }) => {
  const { t } = useTranslation();
  const { taskId: paramTaskId } = useParams();
  const location = useLocation();
  
  // Use props or params or location state
  const taskId = propTaskId || paramTaskId || (location.state?.taskId);
  const orderId = propOrderId || (location.state?.orderId);
  
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState({});
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  // Connect to socket when component mounts
  useEffect(() => {
    if (!taskId) {
      toast.error(t("Task ID is required for chat"));
      return;
    }

    // Fetch user details first
    const fetchUserDetails = async () => {
      setProgress(30);
      try {
        const token = localStorage.getItem('customerToken');
        const response = await axios.get('http://localhost:5000/customer/auth/profile', {
          headers: { Authorization: `bearer ${token}` }
        });
        
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setUser(response.data.customer);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error(t("Error loading your profile"));
      }
      setProgress(60);
    };

    // Fetch task/order details to get worker information
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('customerToken');
        const response = await axios.get(`http://localhost:5000/customer/auth/order/${orderId || taskId}`, {
          headers: { Authorization: `bearer ${token}` }
        });
        
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setWorker({
            id: response.data.order.providerId,
            name: response.data.order.providerName,
            image: response.data.order.providerImage || "https://randomuser.me/api/portraits/men/1.jpg"
          });
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error(t("Error loading order details"));
      }
      setProgress(100);
    };

    Promise.all([fetchUserDetails(), fetchOrderDetails()])
      .then(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:5000', {
          query: { taskId }
        });

        newSocket.on('connect', () => {
          console.log('Connected to socket server');
          newSocket.emit('join-task-chat', { taskId });
        });

        newSocket.on('receive-message', message => {
          setMessages(prev => [...prev, message]);
        });

        newSocket.on('chat-history', ({ messages: chatHistory }) => {
          setMessages(chatHistory);
        });

        newSocket.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
          toast.error(t("Connection error. Please try again."));
        });

        setSocket(newSocket);

        // Cleanup on component unmount
        return () => {
          newSocket.emit('leave-task-chat', { taskId });
          newSocket.disconnect();
        };
      });
  }, [taskId, orderId, t]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socket || !newMessage.trim()) return;

    const messageData = {
      senderId: user.id,
      senderName: user.name || user.username,
      senderType: 'customer',
      taskId,
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    socket.emit('send-message', messageData);
    setNewMessage(''); 
    // Focus back on input field
    messageInputRef.current.focus();
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const shouldShowDate = (index) => {
    if (index === 0) return true;
    
    const currentDate = new Date(messages[index].timestamp).toDateString();
    const previousDate = new Date(messages[index - 1].timestamp).toDateString();
    
    return currentDate !== previousDate;
  };

  return (
    <div className="chat-container">
      
      <div className="chat-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </button>
        
        <div className="worker-info">
          <div className="worker-avatar">
            {worker.image ? (
              <img src={worker.image} alt={worker.name} />
            ) : (
              <PersonIcon />
            )}
          </div>
          <div className="worker-details">
            <h3>{worker.name || t("Service Provider")}</h3>
            <span className="task-id">Task #{taskId}</span>
          </div>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>{t("No messages yet")}</p>
            <p>{t("Send a message to start the conversation")}</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              {shouldShowDate(index) && (
                <div className="date-separator">
                  <span>{formatDate(msg.timestamp)}</span>
                </div>
              )}
              
              <div 
                className={`message-bubble ${msg.senderType === 'customer' ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  {msg.message}
                </div>
                <div className="message-time">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={sendMessage}>
        <input
          ref={messageInputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("Type a message...")}
          disabled={!socket}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!socket || !newMessage.trim()}
        >
          <SendIcon />
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default WorkerChatPage;