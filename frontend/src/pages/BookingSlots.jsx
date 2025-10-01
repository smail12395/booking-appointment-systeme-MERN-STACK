import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { fetchMoroccoTime } from "../utils/timeHelpers";



const generateSlots = (date, isToday, startTime, endTime, slotInterval, changeSys, docInfo) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const slots = [];
  const start = new Date(date);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, endMinute, 0, 0);

  let current = new Date(start);

  // Skip past slots if today
  if (isToday) {
    const now = new Date();
    now.setSeconds(0, 0);
    while (current <= now) {
      current.setMinutes(current.getMinutes() + slotInterval);
    }
  }

  while (current <= end) {
    let day = current.getDate();
    let month = current.getMonth() + 1;
    let year = current.getFullYear();

    const slotDate = `${day}/${month}/${year}`;
    const slotTime = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: changeSys === "AM/PM"
    });

    // ✅ Check if booked
    const isSlotBooked =
      docInfo?.slots_booked?.[slotDate]?.includes(slotTime);
      console.log(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));    

    if (!isSlotBooked) {
      slots.push(slotTime);
    }

    current.setMinutes(current.getMinutes() + slotInterval);
  }

  return slots;
};


const BookingSlots = ({ setSlotsByDay, docInfo }) => {
  const { startTime, endTime, slotInterval, changeSys } = useContext(AppContext);
  useEffect(() => {
    const loadSlots = async () => {
      const now = await fetchMoroccoTime();
      const allSlots = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i);

        const dayName = day.toLocaleDateString("en-US", { weekday: "short" });
        const dayNumber = day.getDate();
        const month = day.getMonth() + 1;

        const slots = generateSlots(
            day,
            i === 0,
            startTime,
            endTime,
            slotInterval,
            changeSys,
            docInfo // ✅ pass doctor info
          );

        allSlots.push({ dayName, dayNumber, month, slots, isToday: i === 0 });
      }

      setSlotsByDay(allSlots);
    };

    loadSlots();
  }, [startTime, endTime, slotInterval, changeSys, docInfo]);

  return null;
};

export default BookingSlots;
