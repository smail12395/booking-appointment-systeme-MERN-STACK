import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const specialities = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Gynecologist',
  'General Physician'
];


const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState(speciality || '');

  const {doctors} = useContext(AppContext)

  
useEffect(() => {
  setActiveSpeciality(speciality || '');
  
const normalize = (str) => {
  return str
    .toLowerCase()
    .replace("physycien", "physician") // handle typo
    .trim();
};

const filtered = speciality
  ? doctors.filter(doc =>
      normalize(doc.speciality).includes(normalize(speciality))
    )
  : doctors;

  setFilterDoc(filtered);
}, [speciality, doctors]);

  const handleSpecialityClick = (spec) => {
    if (spec.toLowerCase() === activeSpeciality.toLowerCase()) {
      navigate('/doctors'); // reset filter if clicking the active one
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg font-medium mb-4">Browse Into the doctors speciality</p>

      {/* Suggested Specialities */}
      <div className="mb-6 flex flex-wrap gap-2">
        {specialities.map((spec, index) => (
          <span
            key={index}
            onClick={() => handleSpecialityClick(spec)}
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-200
              ${activeSpeciality.toLowerCase() === spec.toLowerCase() ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Doctors List */}
      {filterDoc.length === 0 ? (
        <p className="text-center text-gray-500">There is no doctor in this speciality.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointement/${item._id}`)}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
              />
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
      )}
    </div>
  );
};

export default Doctors;
