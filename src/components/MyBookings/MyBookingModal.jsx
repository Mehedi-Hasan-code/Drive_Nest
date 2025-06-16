import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { privateApi } from '../../api/privateApi';
import Loader from '../common/ui/Loader';

const MyBookingModal = ({ booking, onBookingUpdate }) => {
  const [loading, setIsLoading] = useState(false);

  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newEndDate, setNewEndDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const updatedDate = {
        startDate: formatDate(newStartDate),
        endDate: formatDate(newEndDate),
      };

      await privateApi.patch(`/bookings/${booking._id}/date`, updatedDate);

      // Create updated booking object with new dates
      const updatedBooking = {
        ...booking,
        startDate: updatedDate.startDate,
        endDate: updatedDate.endDate,
      };

      // Update the parent component with the new booking data
      onBookingUpdate(updatedBooking);
      // Close the modal
      document.getElementById(`modal-${booking._id}`).close();
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <dialog
      id={`modal-${booking._id}`}
      className="modal modal-bottom sm:modal-middle text-anti-base"
    >
      <div className="modal-box bg-base border border-anti-base rounded-2xl shadow-2xl relative overflow-visible">
        <p>Press Esc or close btn to close the modal !</p>
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl sm:text-5xl text-center font-semibold  text-anti-base my-6 p-4">
            Update Booking Dates
          </h1>
          <div className="relative">
            <label className="label">Start Date : </label>
            <div className="relative z-50 mb-4">
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={newStartDate}
                onChange={(date) => setNewStartDate(date)}
                className="w-full p-2 border rounded-lg"
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
              />
            </div>

            <label className="label">End Date : </label>
            <br />
            <div className="relative z-50">
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={newEndDate}
                onChange={(date) => setNewEndDate(date)}
                className="w-full p-2 border rounded-lg"
                minDate={newStartDate}
                dateFormat="dd-MM-yyyy"
              />
            </div>
          </div>
          <br />
          <button
            className="btn bg-btn-bg border-none rounded-xl text-base"
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
  );
};

export default MyBookingModal;
