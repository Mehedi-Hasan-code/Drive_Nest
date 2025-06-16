const MyBookingsRow = ({ booking }) => {
  const {
    bookingDate,
    bookingStatus,
    carImage,
    carModel,
    endDate,
    startDate,
    totalPrice,
  } = booking;

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
        <div className="join join-vertical">
          <button
            onClick={() =>
              document.getElementById(`modal-${booking._id}`).showModal()
            }
            className="btn join-item"
          >
            Update
          </button>
          <button className="btn join-item">Cancel</button>
        </div>
      </th>
    </tr>
  );
};

export default MyBookingsRow;
