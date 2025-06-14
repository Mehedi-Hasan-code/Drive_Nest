import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { privateApi } from '../../api/privateApi';
import { AuthContext } from '../../context/auth/AuthContext';

const MyCarsRow = ({ car, index, onDelete }) => {
  const { user } = useContext(AuthContext);
  const {
    imageUrl,
    carModel,
    dailyRentalPrice,
    bookingCount,
    availability,
    date,
    location,
  } = car;
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        privateApi
          .delete(`/cars?email=${user?.email}`)
          .then((res) => {
            if (res.deletedCount > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              onDelete(car._id);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <>
      <tr>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={imageUrl} alt="car image" />
            </div>
          </div>
        </td>
        <td>
          <div>
            <div className="font-bold">{carModel}</div>
            <div className="text-sm opacity-50">{location}</div>
          </div>
        </td>
        <td>
          <span>{dailyRentalPrice}$</span>
        </td>
        <td>{bookingCount}</td>
        <td>{availability}</td>
        <td>{date}</td>
        <th>
          <div className="join join-vertical">
            <button
              onClick={() =>
                document.getElementById(`my_modal-${car._id}`).showModal()
              }
              className="btn join-item"
            >
              Update
            </button>
            <button onClick={handleDelete} className="btn join-item">
              Delete
            </button>
          </div>
        </th>
      </tr>
    </>
  );
};

export default MyCarsRow;
