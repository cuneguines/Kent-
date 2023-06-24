import React, { useState } from 'react';
import axios from 'axios';
import './UserDetailsForm.css';

function UserDetailsForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const confirmMessage = `Entered Values:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`;
    const shouldSubmit = window.confirm(confirmMessage);

   
    if (shouldSubmit) {

    fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname: firstName, lname: lastName, email }),
    })
      .then((response) => {console.log('Response:', response);
      return response.json();
    })
      .then((data) => {
        if (data.success) {
          console.log('User created successfully');
        } else {
          console.log('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

     
        // Form submission logic here
  
        // Reset the form fields after submission
        setFirstName('');
        setLastName('');
        setEmail('');
      }
  };

  return (
    <div>
      <h2>User Details Form</h2>
      <form className="user-details-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserDetailsForm;
