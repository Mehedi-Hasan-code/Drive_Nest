import React from 'react';
import ErrorAnimation from '../../assets/lottie/error.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Lottie animationData={ErrorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-4">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;
