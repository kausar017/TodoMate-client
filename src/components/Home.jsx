import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showClock, setShowClock] = useState(false);
  const [showAnalogClock, setShowAnalogClock] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    setTimeout(() => {
      setShowClock(true);
      setShowAnalogClock(true);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to format the date in English and Bengali
  const formatDate = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const daysOfWeekBn = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthsBn = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];

    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    const dateOfMonth = date.getDate();
    const year = date.getFullYear();

    // English Date
    const englishDate = `${daysOfWeek[dayOfWeek]}, ${months[month]} ${dateOfMonth}, ${year}`;

    // Bengali Date
    const bengaliDate = `${daysOfWeekBn[dayOfWeek]}, ${monthsBn[month]} ${dateOfMonth}, ${year}`;

    return { englishDate, bengaliDate };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date()); // Update current date every day
    }, 1000 * 60 * 60 * 24); // Update after every 24 hours (daily)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const { englishDate, bengaliDate } = formatDate(currentDate);

  return (
    <div className="flex items-center justify-center h-screen  text-black ">
      {/* Initial background and welcome text animation */}
      <div className="absolute top-40">
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-bold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Welcome to Todo App
          </motion.h1>
        </motion.div>
      </div>

      <div className="flex absolute w-72 h-72  items-center justify-center space-x-4">
        <div>
          {/* Analog clock using react-clock */}
          {showAnalogClock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              className="relative"
            >
              <Clock value={new Date()} size={250} className='bg-purple-800/50 rounded-full' />
            </motion.div>
          )}
          {/* Digital clock appearance after 2 seconds */}
          {showClock && (
            <motion.div
              className="absolute top-10 -left-20 p-4 rounded-full shadow-lg flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span>{time}</span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className=""
        >
          {/* Card */}
          <div className="p-6 rounded-lg shadow-md shadow-black w-80">
            <h2 className="text-2xl font-bold mb-4">Current Date</h2>

            {/* English Date */}
            <div className="mb-2">
              <p className="text-lg font-medium">English Date:</p>
              <p className="text-xl">{englishDate}</p>
            </div>

            {/* Bengali Date */}
            <div className="mb-2">
              <p className="text-lg font-medium">বাংলা তারিখ:</p>
              <p className="text-xl">{bengaliDate}</p>
            </div>

            {/* Day */}
            <div className="flex items-center">
              <p className="text-lg font-medium">Day:</p>
              <p className="text-xl">{englishDate.split(",")[0]}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
