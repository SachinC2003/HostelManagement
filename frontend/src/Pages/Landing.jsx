import React from 'react';
import { FaUser, FaUserShield, FaExchangeAlt } from 'react-icons/fa';
import hostel from "../assets/hostel.png";
import logo from "../assets/logo.png";
import Footer from '../Components/Footer';
import Intro from "./Intro";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="relative max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex">
        <motion.div
          className='absolute left-2 top-1 lg:-mt-12 -mt-1'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={logo} alt="Logo" className='lg:w-64 lg:h-64 w-28 h-28'/>
        </motion.div>
        <div className='absolute right-0 top-8'>
          <div className='flex justify-between p-4 rounded -mt-3'>
            <button onClick={() => navigate('/signup')} className='px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer'>Register</button>
            <button onClick={() => navigate('/signin')} className='px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer ml-4'>Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="lg:mt-0 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <motion.h2
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block">The Home</span>
            <span className="block text-indigo-600 relative overflow-hidden whitespace-nowrap border-r-0 border-black animate-typing">
              <span className='text-yellow-500'>C</span>ampus <span className='text-yellow-500'>C</span>omfort
            </span>
          </motion.h2>
          <p className="mt-2 text-xl leading-6 text-gray-500">
            Find your Home away from Home
          </p>
          <div className="mt-2 ml-5 flex">
            <div className="inline-flex rounded-md shadow">
              <button onClick={() => navigate('/signup')} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:mt-0 lg:w-1/2">
          <motion.img
            className="w-full h-full object-cover rounded"
            src={hostel}
            alt="Hero image of a hostel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const FeaturesSection = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="max-w-7xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <motion.div
          className="m-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaUser className="text-6xl text-indigo-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">User</h3>
          <p className="mt-2 text-gray-600">Users can browse, book, and manage their rentals with ease.</p>
        </motion.div>
        <motion.div
          className="m-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaExchangeAlt className="text-6xl text-indigo-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">Interaction</h3>
          <p className="mt-2 text-gray-600">Users and admins interact through our platform, ensuring smooth transactions.</p>
        </motion.div>
        <motion.div
          className="m-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FaUserShield className="text-6xl text-indigo-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">Admin</h3>
          <p className="mt-2 text-gray-600">Admins can manage users, properties, and handle booking requests.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

const LandingPage = () => {
  return (
    <div className="min-h-screen custom-scrollbar">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

const Demo = () => {
  const [showIntro, setShowIntro] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showIntro ? <Intro /> : <LandingPage />}
    </div>
  );
}

export default Demo;
