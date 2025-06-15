import React, { useState } from 'react';
import {
  Car,
  MapPin,
  DollarSign,
  Navigation,
  Wind,
  Bluetooth,
  Calendar,
  User,
  Mail,
  Hash,
  CheckCircle,
  Star,
  Heart,
  Share2,
  Phone,
} from 'lucide-react';
import { useLoaderData } from 'react-router-dom';

const CarDetails = () => {
  const carData = useLoaderData();
  const [selectedDays, setSelectedDays] = useState(1);

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'gps':
        return <Navigation className="w-5 h-5" />;
      case 'ac':
        return <Wind className="w-5 h-5" />;
      case 'bluetooth':
        return <Bluetooth className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };
  console.log(carData);

  const totalPrice = selectedDays * carData.dailyRentalPrice;

  return (
    <div className="rounded-2xl">
      <div className="py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Image */}
            <div className="bg-base rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={carData.imageUrl}
                  alt={carData.carModel}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      carData.availability === 'available'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {carData.availability === 'available'
                      ? 'Available'
                      : 'Unavailable'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-base rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-anti-base mb-2">
                    {carData.carModel}
                  </h1>
                  <div className="flex items-center space-x-4 text-anti-base/70">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{carData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Hash className="w-4 h-4" />
                      <span>{carData.vehicleRegistrationNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${carData.dailyRentalPrice}
                  </div>
                  <div className="text-anti-base/70">per day</div>
                </div>
              </div>

              <div className="border-t border-anti-base pt-6">
                <h3 className="text-lg text-anti-base font-semibold mb-4">
                  Description
                </h3>
                <p className="text-anti-base leading-relaxed">
                  {carData.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-base rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-lg text-anti-base font-semibold mb-4">
                Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {carData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-anti-base/10 rounded-lg"
                  >
                    <div className="text-blue-600">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="font-medium text-anti-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Information */}
            <div className="bg-base rounded-2xl shadow-lg p-6">
              <h3 className="text-lg text-anti-base font-semibold mb-4">
                Car Owner
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-anti-base">
                      {carData.user.name}
                    </div>
                    <div className="text-gray-500 text-sm flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-anti-base/70">
                        {carData.user.email}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-btn-bg text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-6 text-anti-base">
                Book this car
              </h3>

              {/* Booking Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700">
                    Available for booking
                  </span>
                </div>
                <div className="text-sm text-anti-base/70">
                  Added on {new Date(carData.date).toLocaleDateString()}
                </div>
              </div>

              {/* Rental Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-anti-base/70 mb-2">
                  Rental Duration
                </label>
                <select
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                  className="w-full p-3 border border-anti-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-anti-base"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 14, 21, 30].map((days) => (
                    <option
                      className="bg-base text-anti-base"
                      key={days}
                      value={days}
                    >
                      {days} {days === 1 ? 'day' : 'days'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6 p-4 bg-base rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-anti-base">Daily rate</span>
                  <span className="font-medium text-anti-base">
                    ${carData.dailyRentalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-anti-base">Duration</span>
                  <span className="font-medium text-anti-base">
                    {selectedDays} {selectedDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="border-t border-anti-base pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold  text-anti-base text-lg">
                      Total
                    </span>
                    <span className="font-bold text-xl text-blue-600">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() =>
                  document.getElementById(`modal-${carData._id}`).showModal()
                }
                className="w-full bg-btn-bg text-base py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Book Now
              </button>

              {/* Additional Info */}
              <div className="text-sm text-anti-base/70 space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>No hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog
        id={`modal-${carData._id}`}
        className="modal modal-bottom sm:modal-middle  text-anti-base"
      >
        <div className="modal-box bg-base border border-anti-base rounded-2xl shadow-2xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default CarDetails;
