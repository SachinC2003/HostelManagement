// src/components/LogoIntro.js
import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png"
const Intro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 800); // Change 3000 to the number of milliseconds you want the logo to show
    return () => clearTimeout(timer);
  }, []);

  return (
    show && (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Logo" className="w-80 h-80"  />
      </div>
    )
  );
};

export default Intro;
