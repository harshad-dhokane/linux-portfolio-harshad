import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const updateDateTime = () => {
    const now = new Date();
    
    // Update time (24-hour format)
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setTime(`${hours}:${minutes}`);
    
    // Update date
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = months[now.getMonth()];
    const day = now.getDate();
    setDate(`${month} ${day}`);
  };

  useEffect(() => {
    // Initial update
    updateDateTime();
    
    // Update every minute
    const intervalId = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-4 right-4 text-white flex items-center bg-black bg-opacity-50 px-3 py-1 rounded-md z-20">
      <div id="time-display" className="mr-2">
        {time}
      </div>
      <div id="date-display">{date}</div>
    </div>
  );
};

export default DateTimeDisplay;
