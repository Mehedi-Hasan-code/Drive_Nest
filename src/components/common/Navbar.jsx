import React, { useState, useEffect, useRef, useContext } from 'react';
import NavLinks from './NavLinks';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { toast } from 'react-toastify';
const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, handleToggleTheme } = useContext(ThemeContext);
  const { user, signOutUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success('logout successful'))
      .catch((err) => console.log(err));
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="navbar bg-base sticky top-4 max-w-[1600px] z-50 rounded-2xl">
      <div className="navbar-start gap-2 sm:gap-4">
        <div className="dropdown relative" ref={dropdownRef}>
          <div role="button" className="lg:hidden">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" checked={isOpen} onChange={toggleMenu} />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current text-anti-base"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current text-anti-base"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
          <ul
            tabIndex={0}
            className={`menu bg-amber-50 menu-sm absolute top-[100%] rounded-box z-1 mt-3 w-52 p-2 shadow ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <NavLinks onSelect={closeDropdown} />
          </ul>
        </div>
        <Link to='/' className="text-xl sm:text-2xl md:text-3xl text-anti-base font-bold">Drive Nest</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-anti-base text-[1rem] font-semibold">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end gap-2 sm:gap-4">
        <div onClick={() => handleToggleTheme()}>{isDark ? '☀️' : '🌙'}</div>
        {user ? (
          <button
            className="bg-body-bg rounded-xl px-6 py-2 cursor-pointer border-anti-base border-2 text-anti-base"
            onClick={handleSignOut}
          >
            {' '}
            LogOut{' '}
          </button>
        ) : (
          <button
            className="bg-body-bg rounded-xl px-6 py-2 cursor-pointer  border-anti-base border-2 text-base"
            onClick={handleNavigate}
          >
            {' '}
            Login{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
