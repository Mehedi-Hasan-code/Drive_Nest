import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';
import CarCardList from '../components/common/CarCardList';
import { publicApi } from '../api/publicApi';
import { Grid, List } from 'lucide-react';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-anti-base placeholder:text-anti-base rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2 bg-base rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === 'grid'
                ? 'bg-btn-bg text-base'
                : 'text-anti-base hover:bg-gray-700'
            }`}
            title="Grid View"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === 'list'
                ? 'bg-btn-bg text-base'
                : 'text-anti-base hover:bg-gray-700'
            }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cars Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cars.map((car) => (
            <CarCardList key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
