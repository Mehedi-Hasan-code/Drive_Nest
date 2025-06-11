import React from 'react';
import { AuthContext } from '../context/auth/AuthContext';


const AddCar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const toDay = date.toISOString().split('T')[0];

    const form = e.target;
    const formData = new FormData(form);
    const carData = Object.fromEntries(formData.entries());
    const featuresArr = formData.get('features').split(',');
    const trimmedFeaturesArr = featuresArr.map((feature) => feature.trim());

    carData.features = trimmedFeaturesArr;
    carData.date = toDay;
    carData.bookingCount = 0;
    carData.bookingStatus = 'Not Booked';
    console.log(carData);
  };

  return (
    <div>
      <div className="bg-blue-200">
        <form onSubmit={handleSubmit} className="p-2 sm:p-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-center m-12 text-emerald-800">
            Add Car
          </h1>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Car Model */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4 ">
              <label className="label">Car Model</label>
              <input
                type="text"
                name="carModel"
                className="input w-full border"
                placeholder="Enter Your Car Model"
                required
              />
            </fieldset>

            {/* Daily Rental Price */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Daily Rental Price</label>
              <input
                type="text"
                name="dailyRentalPrice"
                className="input w-full border"
                placeholder="Enter The Daily Rental Price Or Topic"
                required
              />
            </fieldset>

            {/* Availability */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Availability</label>
              <select
                name="availability"
                className="select w-full border"
                required
              >
                <option value="">Select Availability</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </fieldset>

            {/* Vehicle Registration Number */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Vehicle Registration Number</label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                className="input w-full border"
                placeholder="Enter Vehicle Registration Number"
                required
              />
            </fieldset>

            {/* Features */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Features</label>
              <input
                type="text"
                name="features"
                className="input w-full border"
                placeholder="Features: Separate Using Comma"
                required
              />
            </fieldset>

            {/* Description */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Description</label>
              <input
                type="text"
                name="description"
                className="input w-full border"
                placeholder="Enter Car Description"
                required
              />
            </fieldset>

            {/* Booking Count */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Booking Count</label>
              <input
                type="text"
                name="bookingCount"
                className="input w-full border"
                defaultValue="0"
                readOnly
                required
              />
            </fieldset>

            {/* image url */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="input w-full border"
                placeholder="Enter Your Image URL"
                required
              />
            </fieldset>

            {/* Location */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                className="input w-full border"
                placeholder="Enter Your Location"
                required
              />
            </fieldset>

            <button
              className="btn sm:col-span-2 bg-green-600 text-white tracking-widest font-bold"
              type="submit"
            >
              {false ? <Loader /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
