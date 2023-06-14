import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingTable from './components/BookingTable';
import SpaceA from './components/SpaceA';
import SpaceB from './components/SpaceB';

import SpaceC from './components/SpaceC';
import SpaceD from './components/SpaceD';
import { FaTrash } from 'react-icons/fa';

const timeSlots = ['08:00:00--08:30:00', '08:30:00--09:00:00', '09:00:00--09:30:00', '09:30:00--10:00:00', '10:00:00--10:30:00', '10:30:00--11:00:00', '11:00:00--11:30:00 ', '11:30:00--12:00:00', '12:00:00--12:30:00', '12:30:00--13:00:00', '13:00:00--13:30:00', '13:30:00--14:00:00', '14:00:00--14:30:00', '14:30:00--16:00:00', '15:00:00--15:30:00', '15:30:00--16:00:00', '16:00:00--16:30:00', '16:30:00--17:00:00'];
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
  const [selectedSpace, setSelectedSpace] = useState('SpaceA');

  const handleSpaceButtonClick = (space) => {
    setSelectedSpace(space);
  };

  return (
    <Router>
      <div>
  <h1>Space Booking System</h1>
  <div>
    <Link
      to="/spaceA"
      className={`button ${selectedSpace === 'SpaceA' ? 'active' : ''}`}
    >
      Engineer Room
    </Link>
    <Link
      to="/spaceB"
      className={`button ${selectedSpace === 'SpaceB' ? 'active' : ''}`}
    >
      VMS
    </Link>
    <Link
      to="/spaceC"
      className={`button ${selectedSpace === 'SpaceC' ? 'active' : ''}`}
    >
      Interview Room
    </Link>
    <Link
      to="/spaceD"
      className={`button ${selectedSpace === 'SpaceD' ? 'active' : ''}`}
    >
      Green Room
    </Link>
  </div>


        <Routes>
          <Route path="/spaceA" element={<SpaceA />} />
          <Route path="/spaceB" element={<SpaceB />} />
          <Route path="/spaceC" element={<SpaceC />} />
          <Route path="/spaceD" element={<SpaceD />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
