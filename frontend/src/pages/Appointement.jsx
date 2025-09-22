import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import BookingSlots from "./BookingSlots";
import { toast } from "react-toastify";
import axios from "axios";

const Appointement = () => {
  const [slotsByDay, setSlotsByDay] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const navigate = useNavigate()

  const { docId } = useParams();
  const { doctors, currencySymbole, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const doc = doctors.find(doc => doc._id === docId);
    setDocInfo(doc);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);


const bookAppointement = async () => {
  if (!token) {
    toast.warn('Login to book appointment');
    return navigate('/login');
  }

  if (!selectedTime) {
    toast.warn('Please select a time slot');
    return;
  }

  try {
    const dayInfo = slotsByDay[selectedDayIndex]; // selected day

    // Slot date in day/month/year format
    const slotDate = `${dayInfo.dayNumber}/${dayInfo.month}/${new Date().getFullYear()}`;

    // Slot time as selected (AM/PM format)
    const slotTime = selectedTime;

    console.log("✅ slotDate:", slotDate);
    console.log("✅ slotTime:", slotTime);

     const { data } = await axios.post(
       `${backendUrl}/api/user/book-appointement`, // full URL
       { docId, slotDate, slotTime }, // body
       { headers: { token } } // headers
     );
    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointement')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
    console.log("Error booking appointment:", error);
  }
};

  return docInfo && (
    <div className="bg-white p-5 rounded-xl shadow-lg group hover:shadow-2xl transition-shadow duration-500">
      {/* Doctor Info & About Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Left: Doctor Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-1/2 transform transition duration-500 group-hover:-translate-y-1">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary shadow-md mb-3 transform transition duration-500 group-hover:scale-105"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <p className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {docInfo.name}
              </p>
              <img src={assets.verified_icon} alt="Verified" className="w-4 h-4 transform transition duration-500 group-hover:rotate-12"/>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {docInfo.degree} • {docInfo.speciality}
            </p>
            <button className="mt-2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full shadow-sm transform transition duration-500 hover:scale-105 hover:bg-primary/90">
              + {docInfo.experience} experience
            </button>
            <p className="text-sm font-medium text-gray-700 mt-2">
              Appointment fee: <span className="text-primary font-semibold">{currencySymbole}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Right: About Section */}
        <div className="flex-1 sm:w-1/2 flex flex-col justify-center transform transition duration-500 group-hover:translate-x-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary transition-colors">
              About
            </p>
            <img src={assets.info_icon} alt="Info" className="w-4 h-4 opacity-80 transform transition duration-500 group-hover:rotate-6 group-hover:opacity-100"/>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-tight line-clamp-4 group-hover:text-gray-700 transition-colors">
            {docInfo.about}
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="p-4 mt-4">
        <p className="text-lg m-2 text-center font-bold">Booking Slots</p>

        {/* Preloader */}
        {loadingSlots && (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-500">Loading available slots...</p>
          </div>
        )}

        {/* Fetch & Store Slots */}
          <BookingSlots 
            docInfo={docInfo}   // ✅ pass docInfo
            setSlotsByDay={(slots) => {
              setSlotsByDay(slots);
              setLoadingSlots(false);
            }} 
         />

        {/* Days & Times */}
        {!loadingSlots && slotsByDay.length > 0 && (
          <div className="mt-6">
            {/* Days Block */}
            <div className="flex overflow-x-auto gap-2 mb-4 p-2">
              {slotsByDay.map((day, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedDayIndex(index);
                    setSelectedTime(null);
                  }}
                  className={`flex-none px-4 py-2 rounded-lg text-center cursor-pointer transition-colors duration-200
                    ${selectedDayIndex === index ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  <p className="text-sm">{day.dayName}</p>
                  <p className="text-lg font-semibold">{day.dayNumber}/{day.month}</p>
                </div>
              ))}
            </div>

            {/* Times Block */}
            <div className="flex overflow-x-auto gap-2 px-2 p-2">
              {slotsByDay[selectedDayIndex].slots.length > 0 ? (
                slotsByDay[selectedDayIndex].slots.map((time, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTime(time)}
                    className={`flex-none px-3 py-2 rounded-lg cursor-pointer border
                      ${selectedTime === time ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}
                  >
                    {time}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No slots available today.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={bookAppointement}
        type="submit"
        className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-4"
      >
        Confirm Appointment
      </button>
    </div>
  );
};

export default Appointement;
