import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaCar, FaCalendarAlt, FaGift } from 'react-icons/fa';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Get 15% off for weekend rentals!',
      icon: <FaCalendarAlt className="w-12 h-12 text-blue-600" />,
      buttonText: 'Book Now',
    },
    {
      id: 2,
      title: 'Luxury Experience',
      description: 'Luxury cars at $99/day this holiday season!',
      icon: <FaCar className="w-12 h-12 text-blue-600" />,
      buttonText: 'Learn More',
    },
    {
      id: 3,
      title: 'Holiday Package',
      description: 'Free upgrade on bookings over 7 days!',
      icon: <FaGift className="w-12 h-12 text-blue-600" />,
      buttonText: 'View Details',
    },
  ];

  return (
    <section>
      <h1 className='text-center text-section-heading text-anti-base my-10 md:my-20 font-bold'>
        Special Offers
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            className="bg-base rounded-xl p-8 shadow-lg text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center mb-4">{offer.icon}</div>
            <h3 className="text-2xl font-semibold text-anti-base mb-3">
              {offer.title}
            </h3>
            <p className="text-anti-base/70 text-lg mb-6">{offer.description}</p>
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {offer.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
