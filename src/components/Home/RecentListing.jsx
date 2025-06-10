import React from 'react';
import CarCard from '../RecentListing/CarCard';

const RecentListing = ({ cars }) => {
  // Sort cars by date in descending order (most recent first)
  const sortedCars = [...cars].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );


  return (
    <div>
      <h1>RecentListing</h1>
      <div>
        {sortedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default RecentListing;
