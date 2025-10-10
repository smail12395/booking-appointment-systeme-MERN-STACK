import React, { useContext } from 'react' 
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const getLastNameSlug = (fullName) => {
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1].toLowerCase(); // take last word, lowercase
  };

  return (
    <div className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center md:text-left">
        Top Doctors To Book
      </h1>
      <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0 text-center md:text-left">
        Find the best doctors available for appointments today.
      </p>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {doctors.slice(0, 3).map((item, index) => (
          <div 
            onClick={() => {
              const lastNameSlug = getLastNameSlug(item.name);
              navigate(`/${lastNameSlug}`);
            }}
            key={index} 
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            {/* Doctor Image */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
            />

            {/* Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full inline-block ${
                    item.available === 1 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <p className="text-sm text-gray-500">
                  {item.available === 1 ? 'Available' : 'Not Available'}
                </p>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="mt-6 text-center">
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="bg-gray-200 text-slate-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">
          More
        </button>
      </div>
    </div>
  )
}

export default TopDoctors
