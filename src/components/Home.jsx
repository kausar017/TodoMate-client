import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import video from "../../public/video/1856985-hd_1920_1080_25fps.mp4";
const Home = () => {
  const { user } = useContext(AuthContext);

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
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(intervalId);
  }, []);

  const { englishDate, bengaliDate } = formatDate(currentDate);

  return (
    <>
      <div className="flex flex-col justify-center min-h-[90vh]">
        {/* Initial background and welcome text animation */}
        <div className="text-center">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.h1
              className="text-4xl font-bold text-white"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Welcome to Todo App
            </motion.h1>
          </motion.div>
        </div>
        <div className="flex flex-col justify-center items-center min-h-[500px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="md:flex md:gap-5 items-center lg:border p-5 md:border rounded-l-full md:shadow-md shadow-gray-500 backdrop-blur-md"
            draggable
          >
            <div className="relative z-10">
              {/* Analog clock using react-clock */}
              {showAnalogClock && (
                <div>
                  <Clock
                    value={new Date()}
                    size={250}
                    className="bg-white rounded-full shadow-md shadow-gray-600"
                  />
                </div>
              )}
              {/* Digital clock appearance after 2 seconds */}
              <div className="absolute top-10 left-[4.5rem] pt-5 flex items-center gap-2 ">
                {showClock && (
                  <div>
                    <span className="bg-white p-2 rounded-full font-semibold text-gray-800">
                      {time}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2 }}
                className="text-white"
              >
                {/* Card */}
                <div className="p-6 rounded-lg shadow-md shadow-black">
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
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="flex justify-center"
        >
          {!user && (
            <Link
              to={"/login"}
              className="btn px-8 bg-[#0e5128]/80 text-white shadow-md shadow-gray-500"
            >
              Start
            </Link>
          )}
        </motion.div>
        <video
          className="left-0 w-full h-screen object-cover absolute top-0 -z-20"
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Home;
