import React from 'react';
import carAnimation from '../../assets/lottie/car.json';
import bookingAnimation from '../../assets/lottie/booking.json';
import moneyAnimation from '../../assets/lottie/money.json';
import serviceAnimation from '../../assets/lottie/service.json';
import Lottie from 'lottie-react';

const WhyChooseUs = () => {
  return (
    <div>
      <h1 className='text-center text-section-heading text-anti-base my-10 md:my-20 font-bold'>Why Choose Us</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* reason 1 */}
        <div className="bg-base relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] rounded-full bg-blue-500 overflow-hidden w-[80px] h-[80px] shadow-md">
            <Lottie
              animationData={carAnimation}
              style={animationStyle}
              loop={true}
            />
          </div>

          <div className="pt-12 pb-6 px-6">
            <h1 className="text-xl font-semibold text-anti-base text-center mb-4">
              Wide Variety of Cars
            </h1>

            {/* divider */}
            <div className="flex justify-center mb-4">
              <div className="border-b-[2px] w-[30%] border-gray-300"></div>
            </div>

            <p className="text-anti-base/60 text-center">
              Whether you're looking for a fuel-efficient compact car, a
              spacious SUV for family trips, or a premium luxury vehicle for
              special occasions, our platform has it all. We offer a broad
              selection of vehicles to suit every need and budget, ensuring you
              find the perfect ride every time.
            </p>
          </div>
        </div>

        {/* reason 2 */}
        <div className="bg-base relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] rounded-full bg-blue-500 overflow-hidden w-[80px] h-[80px] shadow-md">
            <Lottie
              animationData={moneyAnimation}
              style={animationStyle}
              loop={true}
            />
          </div>

          <div className="pt-12 pb-6 px-6">
            <h1 className="text-xl font-semibold text-anti-base text-center mb-4">
              Affordable Prices
            </h1>

            {/* divider */}
            <div className="flex justify-center mb-4">
              <div className="border-b-[2px] w-[30%] border-gray-300"></div>
            </div>

            <p className="text-anti-base/60 text-center">
              Enjoy the freedom of the road without breaking the bank. Our
              competitive pricing model ensures that you get excellent value
              with no hidden fees. Whether you're booking for a day or an
              extended period, our affordable rates make quality car rentals
              accessible to everyone.
            </p>
          </div>
        </div>

        {/* reason 3 */}
        <div className="bg-base relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] rounded-full bg-blue-500 overflow-hidden w-[80px] h-[80px] shadow-md">
            <Lottie
              animationData={bookingAnimation}
              style={animationStyle}
              loop={true}
            />
          </div>

          <div className="pt-12 pb-6 px-6">
            <h1 className="text-xl font-semibold text-anti-base text-center mb-4">
              Easy Booking Process
            </h1>

            {/* divider */}
            <div className="flex justify-center mb-4">
              <div className="border-b-[2px] w-[30%] border-gray-300"></div>
            </div>

            <p className="text-anti-base/60 text-center">
              We've made booking your ideal car fast, simple, and hassle-free.
              With our user-friendly platform, you can search, compare, and
              confirm your rental in just a few clicks. No long forms or
              complicated steps—just choose, book, and go.
            </p>
          </div>
        </div>

        {/* reason 4 */}
        <div className="bg-base relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] rounded-full bg-blue-500 overflow-hidden w-[80px] h-[80px] shadow-md">
            <Lottie
              animationData={serviceAnimation}
              style={animationStyle}
              loop={true}
            />
          </div>

          <div className="pt-12 pb-6 px-6">
            <h1 className="text-xl font-semibold text-anti-base text-center mb-4">
              Customer Support
            </h1>

            {/* divider */}
            <div className="flex justify-center mb-4">
              <div className="border-b-[2px] w-[30%] border-gray-300"></div>
            </div>

            <p className="text-anti-base/60 text-center">
              Our dedicated customer support team is available 24/7 to assist
              you with anything you need—from booking help to on-the-road
              issues. We're here to ensure your experience is smooth and
              stress-free, every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const animationStyle = {
  width: '100%',
  height: '100%',
};

export default WhyChooseUs;
