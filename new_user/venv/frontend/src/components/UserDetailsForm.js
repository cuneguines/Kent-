import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDetailsForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
 


  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users');
      const data = await response.json();
      
      setUsers(data);
      console.log('Updated users:', users);
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
      axios
        .post('http://localhost:5001/api/user', { fname: firstName, lname: lastName, email })
        .then((response) => {
          const data = response.data;
          if (data.success) {
            console.log('User created successfully');
            fetchUsers(); // Fetch the updated list of users
          } else {
            console.log('Error:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      // Reset the form fields after submission
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:5001/api/delete/user/${userId}`)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          console.log('User deleted successfully');
          fetchUsers(); // Fetch the updated list of users
        } else {
          console.log('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2>User Details Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
            <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
            <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <button type="submit" style={{ backgroundColor: '#0056b3', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </form>

        {/* User table */}
        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>ID</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>First Name</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Last Name</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Email</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.fname}</td>
                <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.lname}</td>
                <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  <button onClick={() => handleDelete(user.id)} style={{ padding: '4px 8px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetailsForm;
