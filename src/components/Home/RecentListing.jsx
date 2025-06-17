import React from 'react';
import CarCard from '../common/CarCard';

const RecentListing = ({ cars }) => {
  const sortedCars = [...cars].sort((a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    return dateB - dateA;
  });

  return (
    <div>
      <h1 className="text-center text-section-heading text-anti-base my-10 md:my-20 font-bold">
        Recent Listing
      </h1>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default RecentListing;
