import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';
import CarCardList from '../components/common/CarCardList';
import { publicApi } from '../api/publicApi';
import {
  Grid,
  List,
  Search,
  ArrowUpDown,
  Calendar,
  DollarSign,
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AvailableCars = () => {
  useDocumentTitle('Available Cars');
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    publicApi
      .get(`/cars?searchQuery=${searchQuery}`)
      .then((data) => setCars(data));
  }, [searchQuery]);


  const sortedCars = [...cars].sort((a, b) => {
    if (sortBy === 'date') {
      // Parse dd-mm-yyyy format
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day);
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    } else if (sortBy === 'price') {
      const priceA = parseFloat(a.dailyRentalPrice);
      const priceB = parseFloat(b.dailyRentalPrice);
      return sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
    }
    return 0;
  });

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort order if same field is selected
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // Set new sort field with default order
      setSortBy(newSortBy);
      setSortOrder(newSortBy === 'date' ? 'desc' : 'asc'); // Date defaults to newest first, price to lowest first
    }
  };

  const getSortButtonText = () => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? 'Newest First' : 'Oldest First';
    } else if (sortBy === 'price') {
      return sortOrder === 'desc' ? 'Highest First' : 'Lowest First';
    }
    return 'Sort';
  };

  return (
    <div>
      <h1 className="text-center text-section-heading text-anti-base my-10 md:my-20 font-bold">
        Available Cars
      </h1>

      {/* Search, Sort, and View Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1 max-w-md w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anti-base w-5 h-5" />
            <input
              type="text"
              placeholder="Search by model, brand, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-anti-base text-anti-base placeholder:text-anti-base rounded-lg focus:outline-none focus:ring-2"
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

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-anti-base text-sm">
            <span>Sort by:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSortChange('date')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  sortBy === 'date'
                    ? 'bg-btn-bg text-base'
                    : 'bg-base text-anti-base hover:bg-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Date Added</span>
                {sortBy === 'date' && (
                  <ArrowUpDown
                    className={`w-4 h-4 transition-transform ${
                      sortOrder === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              <button
                onClick={() => handleSortChange('price')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  sortBy === 'price'
                    ? 'bg-btn-bg text-base'
                    : 'bg-base text-anti-base hover:bg-gray-700'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Price</span>
                {sortBy === 'price' && (
                  <ArrowUpDown
                    className={`w-4 h-4 transition-transform ${
                      sortOrder === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Current Sort Display */}
          <div className="text-anti-base/70 text-sm">
            Currently: {getSortButtonText()}
          </div>
        </div>
      </div>

      {/* Cars Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCars.map((car) => (
            <CarCardList key={car._id} car={car} />
          ))}
        </div>
      )}

      {/* No Results Message */}
      {sortedCars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-anti-base/70 text-lg">
            {searchQuery
              ? 'No cars found matching your search.'
              : 'No cars available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
