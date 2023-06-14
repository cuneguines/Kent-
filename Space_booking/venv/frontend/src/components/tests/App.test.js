import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the space booking system', () => {
  render(<App />);

  // Verify that the header is rendered
  const headerElement = screen.getByText(/Space Booking System/i);
  expect(headerElement).toBeInTheDocument();

  // Verify that the initial space button is rendered
  const initialSpaceButton = screen.getByText(/SPACE A/i);
  expect(initialSpaceButton).toBeInTheDocument();
});

test('allows adding a booking', () => {
  render(<App />);

  // Enter booking details
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Space'), { target: { value: 'Space B' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-06-07' } });
  fireEvent.change(screen.getByLabelText('Start Time'), { target: { value: '09:00:00' } });
  fireEvent.change(screen.getByLabelText('End Time'), { target: { value: '09:30:00' } });

  // Click the "Add Booking" button
  fireEvent.click(screen.getByText('Add Booking'));

  // Verify that the booking is added to the table
  const bookingElement = screen.getByText('John Doe');
  expect(bookingElement).toBeInTheDocument();
});

test('allows deleting a booking', () => {
  render(<App />);

  // Add a booking for testing deletion
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText('Space'), { target: { value: 'Space A' } });
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-06-07' } });
  fireEvent.change(screen.getByLabelText('Start Time'), { target: { value: '08:00:00' } });
  fireEvent.change(screen.getByLabelText('End Time'), { target: { value: '08:30:00' } });
  fireEvent.click(screen.getByText('Add Booking'));

  // Verify that the booking is added to the table
  const bookingElement = screen.getByText('Jane Smith');
  expect(bookingElement).toBeInTheDocument();

  // Click the delete button for the booking
  const deleteButton = screen.getByTestId('delete-button');
  fireEvent.click(deleteButton);

  // Verify that the booking is removed from the table
  expect(bookingElement).not.toBeInTheDocument();
});
