import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit('message', { name, message });
    e.preventDefault();
    setState({ message: '', name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="wrapper-two">
          <div className="render-chat">
            {renderChat()}
          </div>
          <form onSubmit={onMessageSubmit}>
            <div className="name-field">
							<input type="text" name="name" onChange={(e) => onTextChange(e)} value={state.name} placeholder="Имя"/>
            </div>
            <div>
							<input type="text" name="message" onChange={(e) => onTextChange(e)} value={state.message} placeholder="Сообщение"/>
            </div>
            <button></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
