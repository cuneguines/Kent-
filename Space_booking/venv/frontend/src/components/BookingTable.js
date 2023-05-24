import React from 'react';
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
function BookingTable({ bookings }) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%',margintop:'2px',backgroundColor:'#499ca7' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>ID</th>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Space</th>
          <th style={tableHeaderStyle}>Date</th>
          <th style={tableHeaderStyle}>Start Time</th>
          <th style={tableHeaderStyle}>End Time</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td style={tableCellStyle}>{booking.id}</td>
            <td style={tableCellStyle}>{booking.name}</td>
            <td style={tableCellStyle}>{booking.space}</td>
            <td style={tableCellStyle}>{booking.date}</td>
            <td style={tableCellStyle}>{booking.startTime}</td>
            <td style={tableCellStyle}>{booking.endTime}</td>
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
