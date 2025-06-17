import { Clock, Star } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCardList = ({ car }) => {
  const navigate = useNavigate();
  const dateSince = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const postDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
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

  const datePosted = dateSince(date);

  const handleNavigate = () => navigate(`/car-details/${car._id}`);

  return (
    <div className="bg-base w-full rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 p-4">
      <div className="flex gap-6">
        {/* --- Card Image and Availability Badge --- */}
        <div className="relative flex-shrink-0">
          <img
            className="w-48 h-32 object-cover rounded-2xl"
            src={imageUrl}
            alt={`${carModel} thumbnail`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://placehold.co/600x400/1f2937/ffffff?text=Image+Not+Found';
            }}
          />

          <span
            className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
              availability === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {availability === 'available' ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* --- Card Content --- */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {/* --- Car Model --- */}
            <h2 className="text-2xl font-bold text-anti-base">{carModel}</h2>

            {/* --- Price and Booking Info --- */}
            <div className="flex justify-between items-center text-gray-300">
              <p className="text-xl font-semibold">
                <span className="text-blue-500">${dailyRentalPrice}</span>
                <span className="text-sm text-anti-base font-normal">/day</span>
              </p>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-anti-base">
                  {bookingCount} Bookings
                </span>
              </div>
            </div>

            {/* --- Date Posted --- */}
            <div className="flex items-center text-sm text-anti-base">
              <Clock className="w-4 h-4 mr-2" />
              <span>{datePosted}</span>
            </div>
          </div>

          {/* --- Booking Button --- */}
          <div className="flex justify-end">
            <button
              disabled={availability !== 'available'}
              className={`px-8 py-2 font-bold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 ${
                availability === 'available'
                  ? 'bg-btn-bg text-base hover:bg-blue-700 focus:ring-blue-500/50'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleNavigate}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCardList;
