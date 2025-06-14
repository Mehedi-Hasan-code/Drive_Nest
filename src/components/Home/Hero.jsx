import React from 'react';
import HeroImage from '../../assets/HeroImage.jpeg';

const Hero = () => {
  return (
    <div
      className="flex flex-col justify-center items-center my-10 rounded-2xl"
      style={heroStyle}
    >
      <h1 className="text-7xl text-center">Drive Your Dreams Today</h1>
      <button className="btn">View Available Cars</button>
    </div>
  );
};

const heroStyle = {
  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${HeroImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh',
  position: 'relative',
};
export default Hero;
