import React from 'react';

const Navbar = () => {
  return (
    <nav className=" p-6 hidden sm:block  flex justify-between align-center">

          <a href="/" className="text-white-300 hover:text-gray-400 mr-5 text-xl">Home</a>
          <a href="/about" className="text-white-300 hover:text-gray-400 mr-5 text-xl">About</a>
          <a href="/contact" className="text-white-300 hover:text-gray-400 mr-5 text-xl">Contact</a>
  
    </nav>
  );
}

export default Navbar;
