import React from 'react';

const Navbar = () => {
  return (
    <nav className=" p-6 hidden sm:block">
      <div className="container mx-auto flex justify-evenly items-center">
        <div className="space-x-4 absolute ">
          <a href="/" className="text-white-300 hover:text-gray-400">Home</a>
          <a href="/about" className="text-white-300 hover:text-gray-400">About</a>
          <a href="/contact" className="text-white-300 hover:text-gray-400">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
