import React, { useEffect, useState } from 'react';

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

  const [startMonth, startDay, startYear] = startDate.split('/');
  const [endMonth, endDay, endYear] = endDate.split('/');

  const [convertedStartDate, setConvertedStartDate] = useState(
    `${startDay}-${startMonth}-${startYear}`
  );
  const [convertedEndDate, setConvertedEndDate] = useState(
    `${endDay}-${endMonth}-${endYear}`
  );

  useEffect(() => {
    setConvertedStartDate(`${startDay}-${startMonth}-${startYear}`);
    setConvertedEndDate(`${endDay}-${endMonth}-${endYear}`);
  }, [
    startDate,
    endDate,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
  ]);

  const handleCancel = () => {};
  return (
    <>
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
        <td>{convertedStartDate}</td>
        <td>{convertedEndDate}</td>
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
            <button onClick={handleCancel} className="btn join-item">
              Cancel
            </button>
          </div>
        </th>
      </tr>
    </>
  );
};

export default MyBookingsRow;
