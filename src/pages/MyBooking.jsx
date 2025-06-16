import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MyBookingsRow from '../components/MyBookings/MyBookingsRow';
import MyBookingModal from '../components/MyBookings/MyBookingModal';

const MyBooking = () => {
  const initialBookings = useLoaderData();
  const [bookings, setBookings] = useState(initialBookings);

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
  };

  const handleDelete = () => {};
  return (
    <div className="w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="table bg-white">
          {/* head */}
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Booking Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bookings.map((booking) => (
              <MyBookingsRow
                key={booking._id}
                booking={booking}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {bookings.map((booking) => (
        <MyBookingModal
          key={booking._id}
          booking={booking}
          onBookingUpdate={handleBookingUpdate}
        />
      ))}
    </div>
  );
};

export default MyBooking;
