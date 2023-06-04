
import React, { useEffect, useState } from 'react';
import BookingTable from './components/BookingTable';

import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
//const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00:00--08:30:00', '08:30:00--09:00:00', '09:00:00 to 09:30:00', '09:30:00 to 10:00:00', '10:00:00 to 10:30:00', '10:30:00 to 11:00:00', '11:00:00 to 11:30:00 ', '11:30:00 to 12:00:00', '12:00:00 to 12:30:00', '12:30:00 to 13:00:00', '13:00:00 to 13:30:00', '13:30:00 to 14:00:00', '14:00:00 to 14:30:00', '14:30:00 to 16:00:00', '15:00:00 to 15:30:00', '15:30:00 to 16:00:00', '16:00:00 to 16:30:00', '16:30:00 to 17:00:00'];
const daysOfWeek = [];
const startDate = new Date();
for (let i = 0; i < 28; i++) {
  const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  });

  daysOfWeek.push(formattedDate);
  console.log(formattedDate);
}

function App() {


  const startTimes = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00'];
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');
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
  const [startTimeOptions, setStartTimeOptions] = useState([]);
  //const [data, setData] = useState([]);
  console.log(startTime);
  useEffect(() => {
    setSelectedSpace('Space A'); // Set the initial value for selectedSpace
  }, []);
  const handleSpaceButtonClick = (space) => {
    setSelectedSpace(space);
  console.log(space);
    // You can perform additional actions based on the selected space
    // For example, you can filter the bookings based on the selected space
    const  new_bookings=bookings;
    console.log(new_bookings);
    const filteredBookings = new_bookings.filter(booking => booking.space === space);
    console.log(filteredBookings);
    // Perform any other actions you need with the filtered bookings
//setData(filteredBookings);
setFilteredBookings(filteredBookings);
  };

  const handleEndTimeChange = (event) => {

    fetch('/available-times/${date}')
      .then((response) => response.json())
      .then((data) => { setAvailableTimes(data); console.log(data); })
    const selectedStartTime = event.target.value;

    setStartTime(selectedStartTime);
    console.log(selectedStartTime);
    const filteredEndTimes = startTimes.filter(time => time > selectedStartTime);
    console.log(filteredEndTimes);
    setEndTimeOptions(filteredEndTimes);

  }
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    fetch(`/available-times/${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setAvailableTimes(data);
        setStartTimeOptions(data); console.log(data)
      })
      .catch((error) => console.log(error));
  };

  // Filter the end time options based on the selected start time


  /* useEffect(() => {
    fetch('/available-times')
      .then((response) => response.json())
      .then((data) => {setAvailableTimes(data);console.log(data);})
      .catch((error) => console.log(error));
  }, []); */






  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => { setData(data); console.log(data);setFilteredBookings(data) });
  }, []);

  /* useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => { setData(data); console.log(data); })



      .catch((error) => console.log(error));
  }, []);
 */


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

  const getColumnColor = (dayOfWeek) => {
    if (dayOfWeek === 0) {
      return 'lightcoral';
    } else if (dayOfWeek === 6) {
      return 'lightyellow';
    } else {
      return 'lightgray';
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
              onChange={handleDateChange}

            />
          </label>


          <label>
            Start Time:
            <select value={startTime} onChange={handleEndTimeChange}>

              <option value="">Select a start time</option>
              {startTimeOptions.map(time => (
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
            {daysOfWeek.map((day, index) => (
              <th style={tableHeaderStyle} key={index}>
                {new Date(day).toLocaleDateString(undefined, {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit"
                })} {/* Display the date */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(timeSlot => (

            <tr key={timeSlot}>
              <td style={tableCellStyle}>{timeSlot}</td>
              {daysOfWeek.map(day => {
                const booking = filteredBookings.find(
                  booking => booking.Date === day && booking.startTime === timeSlot.split("-")[0]&& booking.space===selectedSpace
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


      <div>
        {/* Rest of your code */}

        <button
          style={{ backgroundColor: selectedSpace === 'Space A' ? 'green' : 'orange' }}
          type="button"
          onClick={() => handleSpaceButtonClick('Space A')}
        >
          SPACE A
        </button>

        <button
          style={{ backgroundColor: selectedSpace === 'Space B' ? 'green' : 'orange' }}
          type="button"
          onClick={() => handleSpaceButtonClick('Space B')}
        >
          SPACE B
        </button>

        <button
          style={{ backgroundColor: selectedSpace === 'Space C' ? 'green' : 'orange' }}
          type="button"
          onClick={() => handleSpaceButtonClick('Space C')}
        >
          SPACE C
        </button>

        <button
          style={{ backgroundColor: selectedSpace === 'Space D' ? 'green' : 'orange' }}
          type="button"
          onClick={() => handleSpaceButtonClick('Space D')}
        >
          SPACE D
        </button>
      </div>

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
