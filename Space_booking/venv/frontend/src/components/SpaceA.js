import React, { useEffect, useState } from 'react';
//import BookingTable from './components/BookingTable';
import'./form.css';

import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
//const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00:00--08:30:00', '08:30:00--09:00:00', '09:00:00--09:30:00', '09:30:00--10:00:00', '10:00:00--10:30:00', '10:30:00--11:00:00', '11:00:00--11:30:00 ', '11:30:00--12:00:00', '12:00:00--12:30:00', '12:30:00--13:00:00', '13:00:00--13:30:00', '13:30:00--14:00:00', '14:00:00--14:30:00', '14:30:00--15:00:00', '15:00:00--15:30:00', '15:30:00--16:00:00', '16:00:00--16:30:00', '16:30:00--17:00:00'];
const daysOfWeek = [];
const startDate = new Date();
for (let i = 0; i < 28; i++) {
  const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${month}/${day}/${year}`;

  daysOfWeek.push(formattedDate);
  console.log(formattedDate);
}


const SpaceA = () => {


  const [highlightedCell, setHighlightedCell] = useState(null);

  const startTimes = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00'];
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [bookings, setData] = useState([]);
  const [name, setName] = useState('');
  const [space, setSpace] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  //setDay = new Date(date).toLocaleDateString(undefined, { weekday: "long" });
  const day = new Date(date).toLocaleDateString(undefined, { weekday: "long" })
  const [endTimeOptions, setEndTimeOptions] = useState([]);
  const [startTimeOptions, setStartTimeOptions] = useState([]);
  //const [data, setData] = useState([]);
  console.log(startTime);
  
  //console.log(filteredBookings);
  useEffect(() => {
    setSpace('Space A'); // Set the initial value for selectedSpace
  }, []);


  const handleSpaceButtonClick = (spaced) => {
    setSelectedSpace(spaced);
    console.log(spaced);
    console.log(selectedSpace);
    // You can perform additional actions based on the selected space
    // For example, you can filter the bookings based on the selected space
    const new_bookings = bookings;
    console.log(new_bookings);
    const filteredBookings = new_bookings.filter(booking => booking.space === 'Space A');
    console.log(filteredBookings);
    // Perform any other actions you need with the filtered bookings
    //setData(filteredBookings);
    setFilteredBookings(filteredBookings);


    // Get available times for the selected date and updated space
    if (date && space) {
      fetch(`/available-times/${date}/${space}`)
        .then((response) => response.json())
        .then((data) => {
          setAvailableTimes(data);
          setStartTimeOptions(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };
  const handleSpaceChange = (e) => {
    const selectedSpace = e.target.value;
    setSpace(selectedSpace);
    console.log('space is', selectedSpace);
    console.log(date);
    // Fetch available times for the selected date and updated space
    if (date && selectedSpace) {
      fetch(`/available-times/${date}/${selectedSpace}`)
        .then((response) => response.json())
        .then((data) => {
          setAvailableTimes(data);
          setStartTimeOptions(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };
 
  const handleEndTimeChange = (event) => {
    
    const selectedDate = date; // Replace 'date' with the selected date variable
    const selectedStartTime = event.target.value; 
    // Replace 'startTime' with the selected start time variable
  setStartTime(selectedStartTime);
    fetch(`/available-endtimes/${selectedDate}/${selectedStartTime}/${space}`)
      .then((response) => response.json())
      .then((data) => {
        setEndTimeOptions(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('Error fetching available end times:', error);
      });
  };
  
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    console.log(selectedDate);
    console.log(space);

    fetch(`/available-times/${selectedDate}/${space}`)
      .then((response) => response.json())
      .then((data) => {
        setAvailableTimes(data);
        setStartTimeOptions(data); console.log(data)
      })
      .catch((error) => console.log(error));

  };


  console.log('space is', space);
  // Filter the end time options based on the selected start time


  /* useEffect(() => {
    fetch('/available-times')
      .then((response) => response.json())
      .then((data) => {setAvailableTimes(data);console.log(data);})
      .catch((error) => console.log(error));
  }, []); */

  useEffect(() => {
    // Fetch the users from the backend
    axios.get('/api/user')
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);


  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    //console.log(date.getDay());
    return date.getDay(); // Returns the day of the week (0-6)
  };





  useEffect(() => {
    fetch(`/api/data/${'Space A'}`)
      .then(response => response.json())
      .then(data => {
        setData(data); setFilteredBookings(data); console.log('datai', data);

        const filteredBookings = data.filter(booking => booking.space === 'Space A');
        setFilteredBookings(filteredBookings);
        console.log('filteredBookings:', filteredBookings);
      })
      .catch(error => console.log(error));
   
    if (date && space) {
      fetch(`/available-times/${date}/${space}`)
        .then((response) => response.json())
        .then((data) => {
          setAvailableTimes(data);
          setStartTimeOptions(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  /* useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => { setData(data); console.log(data); })
 
 
 
      .catch((error) => console.log(error));
  }, []);
 */


  // Filter the end time options based on the selected start time


  /* const addBooking = () => {
    
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
 
console.log('newbookingis',newBooking);
      axios.fetch(`/api/bookings`, {
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
  }; */



  /* const addBooking = () => {
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
  
      console.log('newbookingis', newBooking);
      axios
        .post(`/api/bookings`, newBooking, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          alert(response.data);
          setData([...bookings, response.data]);
        })
        .catch((error) => console.log(error));
    }
  };
   */



  /* useEffect(() => {
    // Fetch the user data from the server
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserChange = (e) => {
    const selectedUser = e.target.value;
    setSelectedUser(selectedUser);
  }; */

  const request = require('superagent');

  const addBooking = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(space);
    console.log(startTime);
    console.log(endTime);
    console.log(date);
    alert('yes');
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

      console.log('newbookingis', newBooking);

      request
        .post(`/api/bookings`)
        .send(newBooking)
        .set('Content-Type', 'application/json')
        .then((response) => {
          setData([...bookings, response.body]);
          alert(response.body);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  };

  //DELETE


  const deleteBooking = async (bookingId) => {

    try {
      const booking = filteredBookings.find(booking => booking.id === bookingId);

      const confirmed = window.confirm('Are you sure you want to delete this booking for');
      if (confirmed) {
        await axios.delete(`/api/bookings/${bookingId}`);
        setFilteredBookings(filteredBookings.filter(booking => booking.id !== bookingId));
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }

  };




  return (

    <div>
      <h1>Engineer Room</h1>
      <div style={{ padding: '2%' }}>
        <form className="form-container"onSubmit={addBooking}>
      

        <label>
     
            Name:
            
        <select value={name} onChange={(e) => setName(e.target.value)}>
  <option value="">Select a name</option>
  {users.map((user) => (
    <option key={user.id} value={`${user.fname} ${user.lname}`}>
    {`${user.fname} ${user.lname}`}
    </option>
  ))}
  
</select>
</label>
          
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
  {startTimeOptions.map(time => {
    // Extract hour and minute from the time value
    const [hour, minute] = time.split(':').slice(0, 2);
    // Construct the display value without seconds
    const displayValue = `${hour}:${minute}`;

    return (
      <option key={displayValue} value={time}>
        {displayValue}
      </option>
    );
  })}
  {/* Add more options as needed */}
</select>



          </label>
          <label>
            End Time:

            <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
  <option value="">Select an end time</option>
  {endTimeOptions.map(time => {
    // Extract hour and minute from the time value
    const [hour, minute] = time.split(':').slice(0, 2);
    // Construct the display value without seconds
    const displayValue = `${hour}:${minute}`;

    return (
      <option key={displayValue} value={time}>
        {displayValue}
      </option>
    );
  })}
  {/* Add more options as needed */}
</select>



          </label>




          <button className="submit-button"style={{ backgroundColor: 'orange' }} type="submit">Add Booking</button>
        </form>
      </div>
    
      <div style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>
        <table style={{ overflowX: 'scroll', tablelayout: 'fixed', width: '100%', marginTop: '2px', backgroundColor: '#499ca7', maxWidth: '100vw' }}>

          <thead>
            <tr>
              <th></th> {/* Empty cell for spacing */}
              {daysOfWeek.map((day, index) => (

                <th style={tableHeaderStyle} key={index}>
                  {`${(new Date(day).getMonth() + 1).toString().padStart(2, '0')}/${new Date(day).getDate().toString().padStart(2, '0')}/${new Date(day).getFullYear().toString().slice(-2)}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (

              <tr key={timeSlot}>
                <td style={tableCellStyle}>{timeSlot.split("--")[0].slice(0, 5)} to {timeSlot.split("--")[1].slice(0, 5)}</td>
                {daysOfWeek.map(day => {
                  const booking = filteredBookings.find(
                    booking => booking.Date === day && booking.startTime === timeSlot.split("-")[0] && booking.space === 'Space A'
                  );
                  const dayOfWeek = getDayOfWeek(day);
                  //console.log(dayOfWeek);
                  const cellStyle = { ...tableCellStyle };

                  // Set the background color based on the day of the week
                  if (dayOfWeek === 6) {
                    cellStyle.backgroundColor = 'lightblue'; // Sunday
                  } else if (dayOfWeek === 0) {
                    cellStyle.backgroundColor = 'lightyellow'; // Monday
                  } else {
                    cellStyle.backgroundColor = 'lightgray'; // Other days
                  }

                  // Add a class to highlight the cell if it matches the highlightedCell state
                  if (highlightedCell && highlightedCell.day === day && highlightedCell.timeSlot === timeSlot) {
                    cellStyle.backgroundColor = 'lightblue';
                  }

                  if (booking) {
                    cellStyle.backgroundColor = '#c9dbd2';
                  }
                  return (


                    <td style={cellStyle} key={`${day}-${timeSlot}`} onMouseEnter={() => setHighlightedCell({ day, timeSlot })}
                      onMouseLeave={() => setHighlightedCell(null)}
                    >{booking ? booking.name : ''}{booking && (
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

      </div>


    </div>

  );
}
const tableHeaderStyle = {
  background: 'white',
  padding: '4px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
  fontSize: '8px',
  boxShadow: '-1px -1px 6px green, 0 3px 12px 20px rgba(0, 0, 0, 0.23)',
  color:'black',
  position: 'sticky',
  top: 0,
 
  background: 'linear-gradient(to bottom, #4f4091, #ffcc00)',
};

// Inline styles for table cells
const tableCellStyle = {
  padding: '4px',
  borderBottom: '1px solid #ddd',
  fontFamily:'Sans',
  fontSize:'smaller',
  color:'black',
}




export default SpaceA;