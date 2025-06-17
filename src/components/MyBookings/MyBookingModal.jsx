import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { privateApi } from '../../api/privateApi';
import Loader from '../common/ui/Loader';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth/AuthContext';
import Swal from 'sweetalert2';

const MyBookingModal = ({ booking, onBookingUpdate }) => {
  const { user } = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);

  // Convert booking dates from dd-MM-yyyy format to Date objects
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day);
  };

  const [newStartDate, setNewStartDate] = useState(
    parseDate(booking.startDate)
  );
  const [newEndDate, setNewEndDate] = useState(parseDate(booking.endDate));

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

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update',
      }).then((result) => {
        if (result.isConfirmed) {
          if (user) {
            privateApi
              .patch(
                `/bookings/${booking._id}/date?email=${user.email}`,
                updatedDate
              )
              .then((res) => {
                if (res.acknowledged === true && res.modifiedCount === 1) {
                  Swal.fire({
                    title: 'Success',
                    text: 'Your data has been update',
                    icon: 'success',
                  });

                  const updatedBooking = {
                    ...booking,
                    startDate: updatedDate.startDate,
                    endDate: updatedDate.endDate,
                  };
                  onBookingUpdate(updatedBooking);
                } else if (
                  res.acknowledged === true &&
                  res.modifiedCount === 0 &&
                  res.matchedCount === 1
                ) {
                  toast.error('Nothing to update');
                } else {
                  toast.error('Something went wrong');
                }
              });
          }
        }
      });

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
            {loading ? <Loader /> : 'Update'}
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
