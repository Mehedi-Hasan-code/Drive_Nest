import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MyCarsRow from '../components/MyCars/MyCarsRow';
import Modal from '../components/MyCars/Modal';

const MyCars = () => {
  const initialCars = useLoaderData();
  const [cars, setCars] = useState(initialCars);

  const handleDelete = (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
  };

  if (!cars || cars.length < 1) return <div>No car found</div>;

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
