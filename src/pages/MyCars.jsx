import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import MyCarsRow from '../components/MyCars/MyCarsRow';
import Modal from '../components/MyCars/Modal';

const MyCars = () => {
  const initialCars = useLoaderData();
  const navigate = useNavigate()
  const [cars, setCars] = useState(initialCars);

  const handleDelete = (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
  };

  if (!cars || cars.length < 1) return <div className='flex flex-col justify-center items-center grow'>
    <h1 className='text-center text-section-heading text-anti-base my-4 md:my-8 font-bold'>No cars found</h1>
    <button onClick={() => navigate('/add-car')} className='btn bg-btn-bg border-none rounded-xl text-base'>Add Car</button>
  </div>;

  return (
    <div className="overflow-x-auto">
      <table className="table bg-white">
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
      {cars.map((car) => (
        <Modal key={car._id} car={car} />
      ))}
    </div>
  );
};

export default MyCars;
