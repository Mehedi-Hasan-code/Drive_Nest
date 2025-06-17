import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCarsRow from '../components/MyCars/MyCarsRow';
import Modal from '../components/MyCars/Modal';
import { AuthContext } from '../context/auth/AuthContext';
import { privateApi } from '../api/privateApi';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyCars = () => {
  useDocumentTitle('My Cars')
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('newest');


  useEffect(() => {
    if (user) {
      privateApi
        .get(`/my-cars?email=${user.email}`)
        .then((res) => setCars(res));
    }
  }, [user]);

  // Sort
  const sortedCars = [...cars].sort((a, b) => {
    if (sortBy === 'date') {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));

      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    } else if (sortBy === 'price') {
      const priceA = parseFloat(a.dailyRentalPrice);
      const priceB = parseFloat(b.dailyRentalPrice);

      if (sortOrder === 'highest') {
        return priceB - priceA;
      } else {
        return priceA - priceB;
      }
    }
    return 0;
  });

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {

      if (sortBy === 'date') {
        setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
      } else if (sortBy === 'price') {
        setSortOrder(sortOrder === 'highest' ? 'lowest' : 'highest');
      }
    } else {

      setSortBy(newSortBy);
      if (newSortBy === 'date') {
        setSortOrder('newest');
      } else if (newSortBy === 'price') {
        setSortOrder('lowest');
      }
    }
  };

  const handleDelete = (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
  };

  const handleUpdate = (carId, updatedData) => {
    setCars(
      cars.map((car) => (car._id === carId ? { ...car, ...updatedData } : car))
    );
  };

  if (!cars || cars.length < 1)
    return (
      <div className="flex flex-col justify-center items-center grow">
        <h1 className="text-center text-section-heading text-anti-base my-4 md:my-8 font-bold">
          No cars found
        </h1>
        <button
          onClick={() => navigate('/add-car')}
          className="btn bg-btn-bg border-none rounded-xl text-base"
        >
          Add Car
        </button>
      </div>
    );

  return (
    <div className="w-full grow flex flex-col items-center">
      {/* Sorting btns */}
      <div className="w-full max-w-6xl p-6 mb-4">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-anti-base font-medium">Sort by:</span>
            <div className="join">
              <button
                className={`btn btn-sm join-item ${
                  sortBy === 'date'
                    ? 'bg-btn-bg text-base border-none'
                    : 'bg-base text-anti-base border-none'
                }`}
                onClick={() => handleSortChange('date')}
              >
                Date Added
              </button>
              <button
                className={`btn btn-sm join-item ${
                  sortBy === 'price'
                    ? 'bg-btn-bg text-base border-none'
                    : 'bg-base text-anti-base border-none'
                }`}
                onClick={() => handleSortChange('price')}
              >
                Price
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-anti-base font-medium">Order:</span>
            <div className="join">
              {sortBy === 'date' ? (
                <>
                  <button
                    className={`btn btn-sm join-item ${
                      sortOrder === 'newest'
                        ? 'bg-btn-bg text-base border-none'
                        : 'bg-base text-anti-base border-none'
                    }`}
                    onClick={() => setSortOrder('newest')}
                  >
                    Newest First
                  </button>
                  <button
                    className={`btn btn-sm join-item ${
                      sortOrder === 'oldest'
                        ? 'bg-btn-bg text-base border-none'
                        : 'bg-base text-anti-base border-none'
                    }`}
                    onClick={() => setSortOrder('oldest')}
                  >
                    Oldest First
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`btn btn-sm join-item ${
                      sortOrder === 'lowest'
                        ? 'bg-btn-bg text-base border-none'
                        : 'bg-base text-anti-base border-none'
                    }`}
                    onClick={() => setSortOrder('lowest')}
                  >
                    Lowest First
                  </button>
                  <button
                    className={`btn btn-sm join-item ${
                      sortOrder === 'highest'
                        ? 'bg-btn-bg text-base border-none'
                        : 'bg-base text-anti-base border-none'
                    }`}
                    onClick={() => setSortOrder('highest')}
                  >
                    Highest First
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-w-full p-6 bg-base rounded-2xl">
        <table className="table  text-anti-base ">
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
            {sortedCars.map((car, index) => (
              <MyCarsRow
                key={car._id}
                index={index}
                car={car}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {sortedCars.map((car) => (
        <Modal key={car._id} car={car} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default MyCars;
