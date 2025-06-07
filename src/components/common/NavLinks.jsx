import React from 'react';
import { NavLink } from 'react-router-dom'
const NavLinks = () => {
  return (
    <>
      {' '}
      {/*Non logged in users */}
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/available-cars'}>Available Cars</NavLink>
      </li>


      {/* Logged in users*/}
      <li>
        <NavLink to={'/add-car'}>Add Car</NavLink>
      </li>
      <li>
        <NavLink to={'/my-cars'}>My Cars</NavLink>
      </li>
      <li>
        <NavLink to={'/my-booking'}>My Bookings</NavLink>
      </li>
    </>
  );
};

export default NavLinks;
