import React from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00','15:00','16:00','17:00'];

  


function BookingTable({ bookings }) {


  
  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/bookings/${bookingId}`);
      //setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  
  const isTableEmpty = bookings.length === 0;
  console.log(bookings);
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%',margintop:'2px',backgroundColor:'#499ca7' }}>
      <thead>
        <tr>
        <th></th> {/* Empty cell for spacing */}
          {daysOfWeek.map(day => (
            <th style={tableHeaderStyle}key={day}>{day}</th>
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
                

                <td style={tableCellStyle}key={`${day}-${timeSlot}`}>{booking ? booking.name: ''}{booking && (
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
  );
}
// Inline styles for table header cells
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
export default BookingTable;
