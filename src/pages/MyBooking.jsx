import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBookingsRow from '../components/MyBookings/MyBookingsRow';
import MyBookingModal from '../components/MyBookings/MyBookingModal';
import { privateApi } from '../api/privateApi';
import { AuthContext } from '../context/auth/AuthContext';

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      privateApi
        .get(`/bookings?email=${user.email}`)
        .then((res) => setBookings(res));
    }
  }, [user]);

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
  };
  const handleBookingStatus = (bookingStatus, id) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === id ? { ...booking, ...bookingStatus } : booking
      )
    );
  };

  if (bookings.length < 1)
    return (
      <div className="grow flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-6xl p-2 sm:p-6 my-4 font-bold text-anti-base">
          No bookings found!
        </h1>
        <button
          onClick={() => navigate('/available-cars')}
          className="btn bg-btn-bg border-none rounded-xl text-base"
        >
          Book Now !{' '}
        </button>
      </div>
    );

  return (
    <div className="w-full h-full flex grow items-center">
      <div className="overflow-x-auto max-w-full bg-base rounded-2xl p-4 text-anti-base">
        <table className="table">
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
                giveBookingStatus={handleBookingStatus}
                key={booking._id}
                booking={booking}
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
