import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBookingsRow from '../components/MyBookings/MyBookingsRow';
import MyBookingModal from '../components/MyBookings/MyBookingModal';
import { privateApi } from '../api/privateApi';
import { AuthContext } from '../context/auth/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyBooking = () => {
  useDocumentTitle('My Bookings')
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
    <div className="w-full h-full flex grow items-center justify-center">
      <div className="overflow-x-auto max-w-full bg-base rounded-2xl p-4 text-anti-base">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className='bg-anti-base/10 '>
              <th className="font-bold text-anti-base py-4 px-2">
                Car Image
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Car Model
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Booking Date
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Start Date
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                End Date
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Total Price
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Booking Status
              </th>
              <th className="font-bold text-anti-base  py-4 px-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bookings.map((booking, index) => (
              <MyBookingsRow
                giveBookingStatus={handleBookingStatus}
                key={booking._id}
                booking={booking}
                isEven={index % 2 === 0}
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
