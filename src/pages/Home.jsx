import React from 'react';
import Hero from '../components/Home/Hero';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import RecentListing from '../components/Home/RecentListing';
import SpecialOffers from '../components/Home/SpecialOffers';
import { useLoaderData } from 'react-router-dom';
import Testimonial from '../components/Home/Testimonial';

const Home = () => {
  const cars = useLoaderData()
  console.log(cars);
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <RecentListing cars = {cars} />
      <SpecialOffers />
      <Testimonial />
    </>
  );
};

export default Home;
