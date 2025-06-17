import React from 'react';
import Hero from '../components/Home/Hero';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import RecentListing from '../components/Home/RecentListing';
import SpecialOffers from '../components/Home/SpecialOffers';
import { useLoaderData } from 'react-router-dom';
import Testimonial from '../components/Home/Testimonial';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Drive Nest');
  const cars = useLoaderData() || [];

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <RecentListing cars={cars} />
      <SpecialOffers />
      <Testimonial />
    </>
  );
};

export default Home;
