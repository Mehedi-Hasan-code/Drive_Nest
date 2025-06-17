import { toast } from 'react-toastify';
import { privateApi } from '../../api/privateApi';
import Swal from 'sweetalert2';

const MyBookingsRow = ({ booking, giveBookingStatus }) => {
  const {
    bookingDate,
    bookingStatus,
    carImage,
    carModel,
    endDate,
    startDate,
    totalPrice,
  } = booking;

  const handleCancel = () => {
    if (bookingStatus === 'canceled') {
      toast.warn('Already canceled');
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const status = { bookingStatus: 'canceled' };

          privateApi
            .patch(`/bookings/${booking._id}/status`, status)
            .then((res) => {
              if (
                res.acknowledged === true &&
                res.modifiedCount === 1 &&
                res.matchedCount === 1
              ) {
                Swal.fire({
                  title: 'Canceled',
                  text: 'Your booking has been canceled.',
                  icon: 'success',
                });
                giveBookingStatus(status);
              }
            });
        }
      });
    }
  };

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={carImage} alt="car image" />
          </div>
        </div>
      </td>
      <td>{carModel}</td>
      <td>{bookingDate}</td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{totalPrice}</td>
      <td>{bookingStatus}</td>
      <th>
        <div className="join join-vertical space-y-2">
          <button
            onClick={() =>
              document.getElementById(`modal-${booking._id}`).showModal()
            }
            className="btn join-item bg-btn-bg border-none rounded-xl text-base"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="btn join-item bg-btn-bg border-none rounded-xl text-base"
          >
            Cancel
          </button>
        </div>
      </th>
    </tr>
  );
};

export default MyBookingsRow;
