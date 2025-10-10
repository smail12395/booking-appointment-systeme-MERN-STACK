import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import BookingSlots from "./BookingSlots";
import { toast } from "react-toastify";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Translated from "../components/Translated";

const Appointement = () => {
  const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const [slotsByDay, setSlotsByDay] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/me`, {
        headers: { token }
      });
      if (data.success) setCurrentUser(data.user);
    } catch (error) {
      console.log("Error fetching user:", error.message);
    }
  };

  const resolveShortUrlToLatLng = async (shortUrl) => {
    try {
      const response = await axios.get(shortUrl, { maxRedirects: 0, validateStatus: null });
      const finalUrl = response.headers.location;
      if (!finalUrl) return null;

      const match = finalUrl.match(/@([-.\d]+),([-.\d]+)/);
      if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      return null;
    } catch (err) {
      console.log("Error resolving short URL:", err.message);
      return null;
    }
  };

  const navigate = useNavigate()

  const { docId, docLastName } = useParams();
  const { doctors, currencySymbole, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const slugFromUrl = docLastName || docId; 
  const fetchDocInfo = async () => {
    if (!doctors || doctors.length === 0) return;

    const doc = doctors.find(doc => {
      const lastName = doc.name.trim().split(' ').pop().toLowerCase();
      return lastName === slugFromUrl.toLowerCase();
    });

    if (!doc) {
      navigate("/not-found");
      return;
    }

    setDocInfo(doc);

    let defaultLat = 30.4278;
    let defaultLng = -9.5981;

    if (doc && doc.mapLocation) {
      try {
        const match = doc.mapLocation.match(/@([-.\d]+),([-.\d]+)/);
        if (match) {
          setLatitude(parseFloat(match[1]));
          setLongitude(parseFloat(match[2]));
        } else {
          setLatitude(defaultLat);
          setLongitude(defaultLng);
        }
      } catch (err) {
        console.log("Error parsing mapLocation:", err.message);
        setLatitude(defaultLat);
        setLongitude(defaultLng);
      }
    } else {
      setLatitude(defaultLat);
      setLongitude(defaultLng);
    }
  };

  useEffect(() => {
    fetchDocInfo();
    fetchCurrentUser()
  }, [doctors, docId]);


  const bookAppointement = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!selectedTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const { data: appData } = await axios.get(
        `${backendUrl}/api/user/appointements`,
        { headers: { token } }
      );

      if (appData.success) {
        for (const app of appData.appointements) {
          if (app.docId === docId && !app.cancelled && !app.isCompleted) {
            toast.warn("You already have appointment with this doctor");
            navigate('/my-appointement')
            return;
          }
        }
      }

      const dayInfo = slotsByDay[selectedDayIndex];
      const slotDate = `${dayInfo.dayNumber}/${dayInfo.month}/${new Date().getFullYear()}`;
      const slotTime = selectedTime;

      const actualDocId = docInfo._id;
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointement`,
        { docId: actualDocId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        navigate("/my-appointement");
        toast.success(data.message);
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
              {docInfo.degree} • <Translated text={docInfo.speciality} />
            </p>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              <Translated text="Address :" />
            </p>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {docInfo.address.line1}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {docInfo.address.line2}
            </p>
            <button className="mt-2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full shadow-sm transform transition duration-500 hover:scale-105 hover:bg-primary/90">
              + <Translated text={docInfo.experience}/> <Translated text="experience" />
            </button>
            <p className="text-sm font-medium text-gray-700 mt-2">
              <Translated text="Appointment fee:" /> <span className="text-primary font-semibold">{docInfo.fees} {currencySymbole}</span>
            </p>
          </div>
        </div>

        {/* Right: About Section */}
        <div className="flex-1 sm:w-1/2 flex flex-col justify-center transform transition duration-500 group-hover:translate-x-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary transition-colors">
              <Translated text="About" />
            </p>
            <img src={assets.info_icon} alt="Info" className="w-4 h-4 opacity-80 transform transition duration-500 group-hover:rotate-6 group-hover:opacity-100"/>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-tight line-clamp-4 group-hover:text-gray-700 transition-colors">
            <Translated text={docInfo.about} />
          </p>
        </div>
      </div>

      {currentUser && currentUser.isReported >= 4 && (
        <p className="text-red-500 font-semibold mb-2">
          ⚠️ <Translated text="You have been reported multiple times. You cannot book new appointments." />{" "}
          <span
            onClick={() => navigate("/payment")}
            className="underline cursor-pointer text-blue-600 hover:text-blue-800"
          >
            <Translated text="Click here to remove report" />
          </span>
        </p>
      )}
      {/* Booking Slots */}
      <div className="p-4 mt-4">
        <p className="text-lg m-2 text-center font-bold">
          <Translated text="Booking Slots" />
        </p>

        {loadingSlots && (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-500">
              <Translated text="Loading available slots..." />
            </p>
          </div>
        )}

        <BookingSlots 
          docInfo={docInfo}
          setSlotsByDay={(slots) => {
            setSlotsByDay(slots);
            setLoadingSlots(false);
          }} 
        />

        {!loadingSlots && slotsByDay.length > 0 && (
          <div className="mt-6">
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
                <p className="text-gray-500">
                  <Translated text="No slots available today." />
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={bookAppointement}
        type="submit"
        disabled={currentUser && currentUser.isReported >= 4}
        className={`bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-4
          ${currentUser && currentUser.isReported >= 4 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Translated text="Confirm Appointment" />
      </button>

      {latitude && longitude && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            <Translated text="Location" />
          </p>
          <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "250px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            <Marker position={[latitude, longitude]} icon={redIcon}>
              <Popup>{docInfo.name}</Popup>
            </Marker>
          </MapContainer>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                const link = `https://www.google.com/maps/@${latitude},${longitude},15z`;
                navigator.clipboard.writeText(link);
                toast.success("Location link copied!");
              }}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg shadow hover:bg-primary/90 transition"
            >
              <Translated text="Copy Location" />
            </button>
            <a
              href={`https://www.google.com/maps/@${latitude},${longitude},15z`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-200 text-sm rounded-lg shadow hover:bg-gray-300 transition"
            >
              <Translated text="Open in Google Maps" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointement;