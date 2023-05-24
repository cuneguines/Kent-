
import React, { useEffect, useState } from 'react';
import BookingTable from './components/BookingTable';

function App() {
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState('');
  const [space, setSpace] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
 
  
    const [data, setData] = useState([]);

    
  
    useEffect(() => {
      fetch('/api/data')
        .then(response => response.json())
        .then(data => {setData(data);console.log(data);});
    }, []);

  useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => {setBookings(data);console.log(data);})
      
      
      
      .catch((error) => console.log(error));
  }, []);

  const addBooking = () => {
    if (name && space && startTime && endTime && date) {
      const newBooking = {
        id: bookings.length + 1,
        name,
        space,
        date,
        startTime,
        endTime,
      };

      
      fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
        
      })
        .then((response) =>{ response.json();alert(response);})
        .then((data) => {setBookings([...bookings, data]);console.log(data);})
       
        
        
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h1>Space Booking System</h1>
<div style={{ padding:'2%'}}>
      <form onSubmit={addBooking}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <select
          value={space}
          onChange={(e) => setSpace(e.target.value)}
        >
          <option value="">Select Space</option>
          <option value="Space A">Space A</option>
          <option value="Space B">Space B</option>
          <option value="Space C">Space C</option>
        </select>
        <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
        <label>
          Start Time:
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
            <option value="">Select start time</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">10:00</option>
            <option value="12:00">10:00</option>
            <option value="13:00">10:00</option>
            <option value="14:00">10:00</option>
            <option value="15:00">10:00</option>
            <option value="16:00">10:00</option>
            <option value="17:00">10:00</option>
            {/* Add more options as needed */}
          </select>
        
          
          </label>
          <label>
          End Time:
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            <option value="">Select End time</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            {/* Add more options as needed */}
          </select>
        
          
          </label>
          

          
        
        <button style={{backgroundColor:'orange'}}type="submit">Add Booking</button>
      </form>
      </div>
      <BookingTable bookings={bookings} />

  

    </div>
    
  );
}

export default App;
