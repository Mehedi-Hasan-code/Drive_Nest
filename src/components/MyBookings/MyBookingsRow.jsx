import { toast } from 'react-toastify';
import { privateApi } from '../../api/privateApi';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { Edit, Trash2 } from 'lucide-react';

const MyBookingsRow = ({ booking, giveBookingStatus, isEven }) => {
  const { user } = useContext(AuthContext);
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
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          const status = { bookingStatus: 'canceled' };

          privateApi
            .patch(
              `/bookings/${booking._id}/status?email=${user.email}`,
              status
            )
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
                giveBookingStatus(status, booking._id);
              }
            });
        }
      });
    }
  };

  return (
    <tr
      className={`transition-all duration-200 hover:bg-anti-base/20 hover:shadow-md ${
        isEven ? 'bg-base' : 'bg-anti-base/10'
      }`}
    >
      <td className="py-3 px-2">
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={carImage} alt="car image" />
          </div>
        </div>
      </td>
      <td className="py-3 px-2 text-anti-base">{carModel}</td>
      <td className="py-3 px-2 text-anti-base">{bookingDate}</td>
      <td className="py-3 px-2 text-anti-base">{startDate}</td>
      <td className="py-3 px-2 text-anti-base">{endDate}</td>
      <td className="py-3 px-2 text-anti-base">{totalPrice}</td>
      <td className="py-3 px-2 text-anti-base">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            bookingStatus === 'confirmed'
              ? 'bg-green-100 text-green-800'
              : bookingStatus === 'canceled'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {bookingStatus}
        </span>
      </td>
      <th className="py-3 px-2">
        <div className="join join-vertical space-y-2 ">
          <button
            onClick={() =>
              document.getElementById(`modal-${booking._id}`).showModal()
            }
            className="btn join-item bg-btn-bg border-none rounded-xl text-base hover:scale-105 transition-transform duration-200"
          >
            <Edit className="w-4 h-4" />
            Modify Date
          </button>
          <button
            onClick={handleCancel}
            className="btn join-item bg-red-600 border-none rounded-xl text-base hover:scale-105 transition-transform duration-200"
          >
            <Trash2 className="w-4 h-4 text-white" />
            Cancel
          </button>
        </div>
      </th>
    </tr>
  );
};

export default MyBookingsRow;
