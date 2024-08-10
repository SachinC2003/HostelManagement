import React from "react";
import hostelhome from "../assets/hostelhome.png";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-start p-8 lg:w-1/2">
        <h1 className="text-4xl lg:text-6xl font-bold text-indigo-500 mb-4">
          Find Your <br />Home Away <br />from Home
        </h1>
        <p className="text-lg lg:text-xl text-blue-900 leading-relaxed">
          Experience the perfect blend of comfort,<br /> community, and adventure. Your journey begins at <br />
          our hostel—where every stay is more than just a <br /> place to sleep.
        </p>
      </div>
      <div className="flex justify-center items-center lg:w-1/2">
        <img src={hostelhome} alt="Hostel Home" className="w-full h-auto object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
