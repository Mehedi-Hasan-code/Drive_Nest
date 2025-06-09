import React from 'react';
import Hero from '../components/Home/Hero';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import RecentListing from '../components/Home/RecentListing';
import SpecialOffers from '../components/Home/SpecialOffers';

const Home = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <RecentListing />
      <SpecialOffers />
    </>
  );
};

export default Home;
