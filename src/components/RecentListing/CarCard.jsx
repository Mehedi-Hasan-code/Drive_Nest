import { Clock, Star } from 'lucide-react';
import React from 'react';

const CarCard = ({ car }) => {
  const dateSince = (dateString) => {
    const postDate = new Date(dateString);
    const today = new Date();

    postDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - postDate.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return 'Added Today';
    } else if (differenceInDays === 1) {
      return 'Added 1 day ago';
    } else {
      return `Added ${differenceInDays} days ago`;
    }
  };
  const {
    imageUrl,
    carModel,
    dailyRentalPrice,
    availability,
    bookingCount,
    date,
  } = car;

  const datePosted = dateSince(date)
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans p-4">
      {/* --- Car Card --- */}
      <div className="bg-gray-800 text-white w-full max-w-sm rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
        {/* --- Card Image and Availability Badge --- */}
        <div className="relative">
          <img
            className="w-full h-56 object-cover"
            src={imageUrl}
            alt={`${carModel} thumbnail`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://placehold.co/600x400/1f2937/ffffff?text=Image+Not+Found';
            }}
          />
          {availability === 'available' && (
            <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Available
            </span>
          )}
        </div>

        {/* --- Card Content --- */}
        <div className="p-6 space-y-4">
          {/* --- Car Model --- */}
          <h2 className="text-2xl font-bold text-blue-400">{carModel}</h2>

          {/* --- Price and Booking Info --- */}
          <div className="flex justify-between items-center text-gray-300">
            <p className="text-xl font-semibold">
              <span className="text-blue-500">${dailyRentalPrice}</span>
              <span className="text-sm font-normal">/day</span>
            </p>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{bookingCount} Bookings</span>
            </div>
          </div>

          {/* --- Divider --- */}
          <hr className="border-gray-700" />

          {/* --- Date Posted --- */}
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>{datePosted}</span>
          </div>

          {/* --- Booking Button --- */}
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
