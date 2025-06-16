import React, { useRef } from 'react';

const Modal = ({ car }) => {
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target 
    const formData = new FormData(form)
    const updatedCarData = Object.fromEntries(formData.entries())

    const featuresArr = formData.get('features').split(',');
    const trimmedFeaturesArr = featuresArr.map((feature) => feature.trim());
    updatedCarData.features = trimmedFeaturesArr;
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <dialog
      ref={modalRef}
      id={`my_modal-${car._id}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white">
        <p className='text-anti-base'>Press ESC key or click the button below to close</p>
        <div className="modal-action">
          {/* form */}
          <form method="dialog" onSubmit={handleSubmit}>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-anti-base my-6">
              Update Car
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
                  defaultValue={car.carModel}
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
                  defaultValue={car.dailyRentalPrice}
                  required
                />
              </fieldset>

              {/* Availability */}
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-2 sm:p-4">
                <label className="label">Availability</label>
                <select
                  name="availability"
                  className="select w-full border"
                  defaultValue={car.availability}
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
                  defaultValue={car.vehicleRegistrationNumber}
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
                  defaultValue={car.features}
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
                  defaultValue={car.description}
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
                  defaultValue={car.imageUrl}
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
                  defaultValue={car.location}
                  required
                />
              </fieldset>

              <button
                className="btn sm:col-span-2 bg-btn-bg text-base rounded-2xl tracking-widest font-bold border-none"
                type="submit"
              >
                Submit
              </button>
            </div>
            {/* if there is a button in form, it will close the modal */}
            <div className='flex justify-end mt-6'>
            <button type="button" className="btn bg-btn-bg border-none rounded-xl text-base" onClick={handleClose}>
              Close
            </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
