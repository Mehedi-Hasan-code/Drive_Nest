import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CarCard from '../components/common/CarCard';

const AvailableCars = () => {
  const cars = useLoaderData();
  console.log(cars);
  const [view, setView] = useState('grid')
  return (
    <div className="text-mint-500">
      <h1>Available Cars</h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setView(prevMode => prevMode === 'grid' ? 'list' : 'grid')}
          className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
        >
          {view === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
      </div>
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }
      ></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
