import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <>
      {' '}
      {/*Non logged in users */}
      <li>
        <NavLink to={'/'} onClick={handleClick}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={'/available-cars'} onClick={handleClick}>
          Available Cars
        </NavLink>
      </li>
      {/* Logged in users*/}
      <li>
        <NavLink to={'/add-car'} onClick={handleClick}>
          Add Car
        </NavLink>
      </li>
      <li>
        <NavLink to={'/my-cars'} onClick={handleClick}>
          My Cars
        </NavLink>
      </li>
      <li>
        <NavLink to={'/my-booking'} onClick={handleClick}>
          My Bookings
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
