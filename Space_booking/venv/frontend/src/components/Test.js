import React, { useState } from 'react';

const Test = () => {
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);

  const timeRangeOptions = [
    { value: '08:00', label: '08:00 - 08:30' },
    { value: '08:30', label: '08:30 - 09:00' },
    // Add more time range options as needed
  ];

  const handleTimeRangeChange = (event) => {
    const { value } = event.target;

    // Check if the selected time range is already in the selectedTimeRanges array
    const isSelected = selectedTimeRanges.includes(value);

    // Update the selectedTimeRanges array based on the selection
    if (isSelected) {
      setSelectedTimeRanges(selectedTimeRanges.filter((range) => range !== value));
    } else {
      setSelectedTimeRanges([...selectedTimeRanges, value]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make an API request to write the selected time ranges to the database
    // You can use a library like Axios or the built-in Fetch API to make the request
    // Example using Axios:
    // axios.post('/api/write-to-database', { timeRanges: selectedTimeRanges })
    //   .then((response) => {
    //     // Handle the response if necessary
    //   })
    //   .catch((error) => {
    //     // Handle the error if necessary
    //   });
  };

  return (
    <form onSubmit={handleSubmit}>
      {timeRangeOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedTimeRanges.includes(option.value)}
            onChange={handleTimeRangeChange}
          />
          {option.label}
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
