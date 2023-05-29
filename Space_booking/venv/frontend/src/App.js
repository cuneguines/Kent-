
import React, { useEffect, useState } from 'react';
import BookingTable from './components/BookingTable';

import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00'];


function App() {


  const startTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const [bookings, setData] = useState([]);
  const [name, setName] = useState('');
  const [space, setSpace] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const [bookedTimes, setBookedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  //setDay = new Date(date).toLocaleDateString(undefined, { weekday: "long" });
  const day = new Date(date).toLocaleDateString(undefined, { weekday: "long" })
  const [endTimeOptions, setEndTimeOptions] = useState([]);
  //const [data, setData] = useState([]);
  console.log(startTime);
  const handleEndTimeChange = (event) => {
    
    const selectedStartTime = event.target.value;

    setStartTime(selectedStartTime);
    console.log(selectedStartTime);
    const filteredEndTimes = startTimes.filter(time => time > selectedStartTime);
    console.log(filteredEndTimes);
    setEndTimeOptions(filteredEndTimes);

  }


  // Filter the end time options based on the selected start time


  /* useEffect(() => {
    fetch('/available-times')
      .then((response) => response.json())
      .then((data) => {setAvailableTimes(data);console.log(data);})
      .catch((error) => console.log(error));
  }, []); */

//Available start times
  /* useEffect(() => {
    // Filter and calculate available times
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Set the starting time
    const endTime = new Date();
    endTime.setHours(17, 0, 0); // Set the ending time

    const timeSlots = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      const isBooked = bookedTimes.some(
        (bookedTime) =>
          new Date(bookedTime.StartTime) <= currentTime &&
          new Date(bookedTime.EndTime) > currentTime
      );

      if (!isBooked) {
        timeSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      currentTime = new Date(currentTime.getTime() + 60 * 60000); // Increment by 15 minutes
    }

    setAvailableTimes(timeSlots);
  }, [bookedTimes]);

 */


  

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => { setData(data); console.log(data); });
  }, []);

  useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => { setData(data); console.log(data); })



      .catch((error) => console.log(error));
  }, []);



  // Filter the end time options based on the selected start time


  const addBooking = () => {
    if (name && space && startTime && endTime && date) {
      const newBooking = {
        id: bookings.length + 1,
        name,
        space,
        date,
        startTime,
        endTime,
        day,
      };


      fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),

      })
        .then((response) => { response.json(); alert(response); })
        .then((data) => { setData([...bookings, data]); alert(data); })



        .catch((error) => console.log(error));
    }
  };
  //DELETE
  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setData(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  return (
    <div>
      <h1>Space Booking System</h1>
      <div style={{ padding: '2%' }}>
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
            <select value={startTime} onChange={handleEndTimeChange}>

              <option value="">Select a start time</option>
              {startTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
              {/* Add more options as needed */}
            </select>


          </label>
          <label>
            End Time:

            <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
              <option value="">Select an end time</option>
              {endTimeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
              {/* Add more options as needed */}
            </select>


          </label>




          <button style={{ backgroundColor: 'orange' }} type="submit">Add Booking</button>
        </form>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', margintop: '2px', backgroundColor: '#499ca7' }}>
        <thead>
          <tr>
            <th></th> {/* Empty cell for spacing */}
            {daysOfWeek.map(day => (
              <th style={tableHeaderStyle} key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(timeSlot => (
            <tr key={timeSlot}>
              <td style={tableCellStyle}>{timeSlot}</td>
              {daysOfWeek.map(day => {
                const booking = bookings.find(
                  booking => booking.day === day && booking.startTime === timeSlot
                );
                return (


                  <td style={tableCellStyle} key={`${day}-${timeSlot}`}>{booking ? booking.name : ''}{booking && (
                    <FaTrash
                      onClick={() => deleteBooking(booking.id)}
                    />
                  )}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>


      <button style={{ backgroundColor: 'orange' }} type="submit">SPACE A</button>
      <button style={{ backgroundColor: 'orange' }} type="submit">SPACE B</button>
      <button style={{ backgroundColor: 'orange' }} type="submit">SPACE C</button>
      <button style={{ backgroundColor: 'orange' }} type="submit">SPACE D</button>

    </div>

  );
}
const tableHeaderStyle = {
  background: 'grey',
  padding: '8px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
};

// Inline styles for table cells
const tableCellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
};
export default App;
