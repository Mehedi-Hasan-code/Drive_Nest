import React, { useState, useEffect, useContext, useRef } from 'react';
import {
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
  Phone,
} from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../context/auth/AuthContext';

import 'react-datepicker/dist/react-datepicker.css';
import { privateApi } from '../api/privateApi';
import { toast } from 'react-toastify';
import Loader from '../components/common/ui/Loader';
import useDocumentTitle from '../hooks/useDocumentTitle';

const CarDetails = () => {
  const carData = useLoaderData();
  useDocumentTitle(`${carData.carModel} Details`)
  const navigate = useNavigate()
  const modalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [selectedDays, setSelectedDays] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setIsLoading] = useState(false);

  // Update endDate when selectedDays changes
  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
    setEndDate(newEndDate);
  }, [selectedDays, startDate]);

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'gps':
        return <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'ac':
        return <Wind className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'bluetooth':
        return <Bluetooth className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  // Calculate the number of days between start and end date
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(!user) {
      navigate('/login')
      setIsLoading(false)
    }

    const bookingInfo = {
      carModel: carData.carModel,
      carImage: carData.imageUrl,
      carId: carData._id,
      email: user.email,
      startDate: startDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-'),
      endDate: endDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-'),
      bookingDate: new Date()
        .toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .replace(/\//g, '-'),
      totalPrice: carData.dailyRentalPrice * calculateDays(),
    };

    if (user) {
      privateApi
        .post(`/bookings?email=${user.email}`, bookingInfo)
        .then((res) => {
          if (res.acknowledged === true && res.insertedId) {
            toast.success('You have successfully booked the car');
            handleModalClose();
            navigate('/my-booking')
          } else {
            toast.warn('Something went wrong !');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  if (!carData)
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-anti-base mb-2">
            No Car Found
          </h2>
          <p className="text-anti-base/70">
            The car you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );

  return (
    <div className="rounded-2xl">
      <div className="py-4 sm:py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Car Image */}
            <div className="bg-base rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={carData.imageUrl}
                  alt={carData.carModel}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
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
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white rounded-lg px-2 sm:px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-base rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-anti-base mb-2">
                    {carData.carModel}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-anti-base/70 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-anti-base" />
                      <span className="truncate text-anti-base">{carData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-anti-base" />
                      <span className="truncate text-anti-base">
                        {carData.vehicleRegistrationNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    ${carData.dailyRentalPrice}
                  </div>
                  <div className="text-anti-base/70 text-sm">
                    per day
                  </div>
                </div>
              </div>

              <div className="border-t border-anti-base pt-4 sm:pt-6">
                <h3 className="sm:text-lg text-anti-base font-semibold mb-3 sm:mb-4">
                  Description
                </h3>
                <p className="text-anti-base leading-relaxed text-sm">
                  {carData.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-base rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="sm:text-lg text-anti-base font-semibold mb-3 sm:mb-4">
                Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {carData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-anti-base/10 rounded-lg"
                  >
                    <div className="text-blue-600 flex-shrink-0">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="font-medium text-anti-base text-sm truncate">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Information */}
            <div className="bg-base rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="sm:text-lg text-anti-base font-semibold mb-3 sm:mb-4">
                Car Owner
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-anti-base text-sm truncate">
                      {carData.user.name}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm flex items-center space-x-1">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-anti-base/70 truncate">
                        {carData.user.email}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-btn-bg text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm w-full sm:w-auto">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-anti-base">
                Book this car
              </h3>

              {/* Booking Status */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="font-medium text-green-700 text-sm">
                    Available for booking
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-anti-base/70">
                  Added on {new Date(carData.date).toLocaleDateString()}
                </div>
              </div>

              {/* Rental Duration */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-anti-base/70 mb-2">
                  Rental Duration
                </label>
                <select
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                  className="w-full p-2 sm:p-3 border border-anti-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-anti-base text-sm"
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
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-base rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-anti-base text-sm">
                    Daily rate
                  </span>
                  <span className="font-medium text-anti-base text-sm">
                    ${carData.dailyRentalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-anti-base text-sm">
                    Duration
                  </span>
                  <span className="font-medium text-anti-base text-sm">
                    {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="border-t border-anti-base pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-anti-base sm:text-lg">
                      Total
                    </span>
                    <span className="font-bold text-lg sm:text-xl text-blue-600">
                      ${carData.dailyRentalPrice * calculateDays()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() =>
                  document.getElementById(`modal-${carData._id}`).showModal()
                }
                className="w-full bg-btn-bg text-base py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 text-sm"
              >
                Book Now
              </button>

              {/* Additional Info */}
              <div className="text-xs sm:text-sm text-anti-base/70 space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>No hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog
        ref={modalRef}
        id={`modal-${carData._id}`}
        className="modal modal-bottom sm:modal-middle text-anti-base"
      >
        <div className="modal-box bg-base border border-anti-base rounded-xl sm:rounded-2xl shadow-2xl relative overflow-visible max-w-sm sm:max-w-md mx-auto">
          <p className="text-xs sm:text-sm">
            Press Esc or close btn to close the modal !
          </p>
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold text-btn-bg my-4 sm:my-6 p-2 sm:p-4">
              Booking Confirmation
            </h1>
            <p className="text-sm">
              You are booking for: {carData.carModel}
            </p>
            <br />
            <div className="relative">
              <label className="label text-sm">
                Start Date :{' '}
              </label>
              <br />
              <div className="relative z-50 mb-4">
                <DatePicker
                  showIcon
                  toggleCalendarOnIconClick
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm"
                  minDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div>

              <br />

              <label className="label text-sm">End Date : </label>
              <br />
              <div className="relative z-50">
                <DatePicker
                  showIcon
                  toggleCalendarOnIconClick
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm"
                  minDate={startDate}
                  dateFormat="dd-MM-yyyy"
                />
              </div>

              <div className="mt-4 p-3 sm:p-4 bg-base rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-anti-base text-sm">
                    Duration
                  </span>
                  <span className="font-medium text-anti-base text-sm">
                    {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-anti-base text-sm">
                    Price Per Day
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-blue-600">
                    ${carData.dailyRentalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-anti-base text-sm">
                    Total
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-blue-600">
                    ${carData.dailyRentalPrice * calculateDays()}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="btn bg-btn-bg border-none rounded-xl text-base w-full sm:w-auto"
              type="submit"
            >
              {loading ? <Loader /> : 'Submit'}
            </button>
          </form>
          <div className="modal-action justify-start">
            <form method="dialog" className="flex justify-end w-full">
              <button className="btn bg-btn-bg border-none rounded-xl text-base">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default CarDetails;
