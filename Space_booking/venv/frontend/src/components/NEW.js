import React, { useState } from 'react';
import axios from 'axios';
import UserDetailsForm from './UserDetailsForm';
import './UserDetailsForm.css'; // Import the CSS file for styling


function NEW() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the backend with the login credentials
    axios
      .post('/api/login', { username, password })
      .then((response) => {
        const data = response.data;
        // Handle the response from the backend
        if (data.success) {
          // Admin login successful, set the loggedIn state to true
          setLoggedIn(true);
        } else {
          // Admin login failed, display error message
          console.log('Invalid credentials');
        }
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error('Error:', error);
      });
  };

  if (loggedIn) {
    return (
      <div>
        
        <UserDetailsForm />
      </div>
    );
  }

  return (
    <div style={divStyle}>
    <form className='login-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button style={{backgroundColor:'#0056b3'}}type="submit">Login</button>
    </form>
    </div>
  );
}
const divStyle=
{
  marginTop:'15%',
}
export default NEW;
