import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Root = () => {
  return (
    <div className='relative bg-body-bg isolate'>
      <div className="flex flex-col min-h-screen max-w-[1600px] mx-auto">
        <Navbar />
        <div className="grow flex flex-col w-11/12 mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div style={gridLines} className="-z-10 absolute inset-0"></div>
      <div style={gridDots} className="-z-10 absolute inset-0"></div>
    </div>
  );
};

// styles
const gridLines = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent 1px)
  `,
  backgroundSize: '40px 40px',
};
const gridDots = {
  backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
  backgroundSize: '20px 20px',
};

export default Root;
