import React from "react";
import { motion } from "framer-motion";
import hostelhomeimg from "../assets/hostehomeimg.png";
import LocationTracker from "./LocationTracker";

// URL of a sample animated GIF (you can replace this with any URL of your choice)

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white z-10 sm:-mt-20">
      <motion.div
        className="flex flex-col items-start p-8 lg:w-1/2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl lg:text-6xl font-bold text-indigo-500 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Find Your <br /><span className="text-yellow-500">Home</span> Away <br />from &nbsp;<span className="text-yellow-500">Home</span>
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl text-black leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Experience the perfect blend of comfort,<br /> community, and adventure. Your journey begins at <br />
          our hostel where every stay is more than just a <br /> place to sleep.
        </motion.p>
      </motion.div>
      <motion.div
        className="bg-transparent justify-center items-center sm:mr-8 lg:w-1/2"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={hostelhomeimg}
          alt="Animated Image"
          className="w-full h-auto object-cover rounded-lg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
      <LocationTracker/>
    </div>
  );
};

export default Home;
