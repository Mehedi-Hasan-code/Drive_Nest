import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CarCard from '../components/common/CarCard';

const AvailableCars = () => {
  const cars = useLoaderData();

  console.log(cars);
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div>
      <h1 className='text-center text-section-heading text-anti-base my-10 md:my-20 font-bold'>Available Cars</h1>
      <div className="flex justify-between items-center mb-6">
      <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-mint-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500"
          />
        </div>
        <button
          onClick={() =>
            setView((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'))
          }
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
