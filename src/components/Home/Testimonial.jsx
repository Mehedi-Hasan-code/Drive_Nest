import React, { useState, useEffect } from 'react';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "DriveNest made my business trip seamless! The car was spotless, the pickup process was quick, and the customer service was exceptional. I'll definitely use them again for all my travel needs.",
      car: 'Toyota Camry',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Family Vacation',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Perfect experience for our family vacation! We rented a spacious SUV that comfortably fit all our luggage and kids. The rental process was smooth and the car was in excellent condition.',
      car: 'Honda CR-V',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Weekend Getaway',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Amazing service! I booked a luxury car for a special weekend and everything exceeded my expectations. The car was immaculate and the staff went above and beyond to ensure a great experience.',
      car: 'BMW 3 Series',
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Road Trip Enthusiast',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "Best car rental experience I've ever had! The vehicle was reliable for our cross-country road trip, and the 24/7 support gave us peace of mind. Highly recommend DriveNest!",
      car: 'Ford Explorer',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in my-10 md:my-20">
          <h1 className="text-center text-section-heading text-anti-base  font-bold">
            What Our Customers Say
          </h1>
          <p className="text-lg text-anti-base/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their DriveNest experience.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-base rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto transform transition-all duration-500 hover:scale-105">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg animate-pulse">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating Stars */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-anti-base mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Customer Info */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-anti-base">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-anti-base/70">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600">
                      Rented: {testimonials[currentIndex].car}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-anti-base/70 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-base"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="hidden md:block absolute right-4 bg-anti-base/70 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-base"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2 animate-count">
              10,000+
            </div>
            <div className="text-anti-base/70">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2 animate-count">
              500+
            </div>
            <div className="text-anti-base/70">Vehicles Available</div>
          </div>
          <div className="text-center p-6 bg-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2 animate-count">
              4.9★
            </div>
            <div className="text-anti-base/70">Average Rating</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes count-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-count {
          animation: count-up 1s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
