import React from 'react';
import { useLoaderData } from 'react-router-dom';;
import CarCard from '../components/common/CarCard';

const AvailableCars = () => {
  const cars = useLoaderData();
  return (
    <div className="text-mint-500">
      <h1>Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
