import React, { useState, useEffect, useRef, useContext } from 'react';
import NavLinks from './NavLinks';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { toast } from 'react-toastify';
import { MoonStar, Sun } from 'lucide-react';
const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, handleToggleTheme } = useContext(ThemeContext);
  const { user, signOutUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('logout successful');
        navigate('/login');
      })
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
    <div className="navbar bg-base  sticky top-0 w-11/12 mx-auto  z-50 rounded-2xl mb-2">
      <div className="navbar-start gap-2 sm:gap-4">
        <div className="w-18 hidden xl:block">
          <img className="w-full" src="car.png" alt="car logo" />
        </div>
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
            className={`menu bg-base text-anti-base absolute top-[165%]  p-6 rounded-2xl z-1 mt-3 w-52 shadow ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <NavLinks onSelect={closeDropdown} />
          </ul>
        </div>
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl text-anti-base font-bold hidden sm:block"
        >
          Drive Nest
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-anti-base text-[1rem] font-semibold">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end gap-2 sm:gap-4">
        <div onClick={() => handleToggleTheme()}>
          {isDark ? (
            <div className=" bg-btn-bg text-base p-2 rounded-full">
              <Sun size={24} />
            </div>
          ) : (
            <div className=" bg-btn-bg text-base p-2 rounded-full">
              <MoonStar size={24} />
            </div>
          )}
        </div>
        {user ? (
          <button
            className="btn bg-btn-bg rounded-2xl text-base border-none"
            onClick={handleSignOut}
          >
            LogOut
          </button>
        ) : (
          <button
            className="btn bg-btn-bg rounded-2xl text-base border-none"
            onClick={handleNavigate}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
