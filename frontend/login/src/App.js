import React, { useState } from 'react';
import './App.css';
import { registerUser, loginUser } from './api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const response = await registerUser(username, password);
    const data = await response.text();
    setMessage(data);
  };

  const handleLogin = async () => {
    const response = await loginUser(username, password);
    const data = await response.text();
    setMessage(data);
  };

  return (
    <div className="App">
      <h1>Login y Registro</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleRegister}>Registro</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default App;