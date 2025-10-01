import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-primary text-white px-6 py-12 rounded-xl shadow-lg">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl mb-4 font-semibold">Page Not Found</h2>
      <p className="text-lg text-center max-w-md mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/doctors')}
        className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:bg-gray-100 transition-all duration-300"
      >
        Go Back Home
      </button>

    </div>
  );
};

export default NotFound;
