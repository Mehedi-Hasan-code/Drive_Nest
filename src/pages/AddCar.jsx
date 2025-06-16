import React, { useState } from 'react';
import { privateApi } from '../api/privateApi';
import Loader from '../components/common/ui/Loader';
import { toast } from 'react-toastify';
const AddCar = () => {
  const [loading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const date = new Date();
    const toDay = `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;

    const form = e.target;
    const formData = new FormData(form);
    const carData = Object.fromEntries(formData.entries());
    const featuresArr = formData.get('features').split(',');
    const trimmedFeaturesArr = featuresArr.map((feature) => feature.trim());

    carData.features = trimmedFeaturesArr;
    carData.date = toDay;
    carData.bookingCount = 0;
    carData.bookingStatus = 'Not Booked';

    privateApi
      .post(`${import.meta.env.VITE_API_BASE_URL}/cars`, carData)
      .then((res) => {
        if(res.acknowledged === true && res.insertedId) {
          toast.success('Car Added !')
        } else {
          toast.warn('Something went wrong !')
        }
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <div>
      <div className="bg-base rounded-2xl">
        <form onSubmit={handleSubmit} className="p-2 sm:p-4">
          <h1 className="text-center text-section-heading text-anti-base my-10 md:my-20 font-bold">
            Add Car
          </h1>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {/* Car Model */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Car Model
              </label>
              <input
                type="text"
                name="carModel"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter Your Car Model"
                required
              />
            </fieldset>

            {/* Daily Rental Price */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Daily Rental Price
              </label>
              <input
                type="text"
                name="dailyRentalPrice"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter The Daily Rental Price Or Topic"
                required
              />
            </fieldset>

            {/* Availability */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Availability
              </label>
              <select
                name="availability"
                className="select bg-base w-full border border-anti-base text-anti-base"
                required
              >
                <option value="">Select Availability</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </fieldset>

            {/* Vehicle Registration Number */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter Vehicle Registration Number"
                required
              />
            </fieldset>

            {/* Features */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Features
              </label>
              <input
                type="text"
                name="features"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Features: Separate Using Comma"
                required
              />
            </fieldset>

            {/* Description */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Description
              </label>
              <input
                type="text"
                name="description"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter Car Description"
                required
              />
            </fieldset>

            {/* Booking Count */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Booking Count
              </label>
              <input
                type="text"
                name="bookingCount"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                defaultValue="0"
                readOnly
                required
              />
            </fieldset>

            {/* image url */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter Your Image URL"
                required
              />
            </fieldset>

            {/* Location */}
            <fieldset className="fieldset border-anti-base border rounded-2xl p-2 sm:p-4">
              <label className="label text-anti-base font-semibold">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="input w-full border border-anti-base placeholder:text-anti-base text-anti-base rounded-xl"
                placeholder="Enter Your Location"
                required
              />
            </fieldset>

            <button
              className="btn sm:col-span-2 bg-btn-bg border-none rounded-2xl text-base tracking-widest font-bold"
              type="submit"
            >
              {loading ? <Loader /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
