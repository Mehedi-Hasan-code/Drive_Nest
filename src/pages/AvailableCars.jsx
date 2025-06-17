import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';
import { publicApi } from '../api/publicApi';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    publicApi
      .get(`/cars?searchQuery=${searchQuery}`)
      .then((data) => setCars(data));
  }, [searchQuery]);

  return (
    <div>
      <h1 className="text-center text-section-heading text-anti-base my-10 md:my-20 font-bold">
        Available Cars
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-anti-base placeholder:text-anti-base  rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
