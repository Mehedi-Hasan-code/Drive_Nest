import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCarsRow from '../components/MyCars/MyCarsRow';
import Modal from '../components/MyCars/Modal';
import { AuthContext } from '../context/auth/AuthContext';
import { privateApi } from '../api/privateApi';

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (user) {
      privateApi
        .get(`/my-cars?email=${user.email}`)
        .then((res) => setCars(res));
    }
  }, [user]);

  const handleDelete = (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
  };

  const handleUpdate = (carId, updatedData) => {
    setCars(
      cars.map((car) => (car._id === carId ? { ...car, ...updatedData } : car))
    );
  };

  if (!cars || cars.length < 1)
    return (
      <div className="flex flex-col justify-center items-center grow">
        <h1 className="text-center text-section-heading text-anti-base my-4 md:my-8 font-bold">
          No cars found
        </h1>
        <button
          onClick={() => navigate('/add-car')}
          className="btn bg-btn-bg border-none rounded-xl text-base"
        >
          Add Car
        </button>
      </div>
    );

  return (
    <div className="w-full grow flex items-center">
      <div className="overflow-x-auto max-w-full p-6 bg-base rounded-2xl">
        <table className="table  text-anti-base ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rental Price</th>
              <th>bookingCount</th>
              <th>Availability</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {cars.map((car, index) => (
              <MyCarsRow
                key={car._id}
                index={index}
                car={car}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {cars.map((car) => (
        <Modal key={car._id} car={car} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default MyCars;
