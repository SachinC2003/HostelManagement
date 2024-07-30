// src/components/LandingPage.jsx
import React from 'react';
import { FaUser, FaUserShield, FaExchangeAlt } from 'react-icons/fa';
// import heroImage from '../assets/hero-image.jpg'; // Make sure to add an image to this path

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Website</h1>
        </div>
      </header>
      
      <main>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Beautiful and Functional</span>
                <span className="block text-indigo-600">Web Designs</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Discover how our solutions can transform your online presence.
              </p>
              <div className="mt-8 flex">
                <div className="inline-flex rounded-md shadow">
                  <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Get started
                  </a>
                </div>
                <div className="ml-3 inline-flex">
                  <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <img className="w-full h-full object-cover" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="Hero" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              How Our System Works
            </h2>
            <div className="mt-10">
              <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="m-4 text-center">
                  <FaUser className="text-6xl text-indigo-600 mx-auto" />
                  <h3 className="text-xl font-bold mt-4">User</h3>
                  <p className="mt-2 text-gray-600">Users can browse, book, and manage their rentals with ease.</p>
                </div>
                <div className="m-4 text-center">
                  <FaExchangeAlt className="text-6xl text-indigo-600 mx-auto" />
                  <h3 className="text-xl font-bold mt-4">Interaction</h3>
                  <p className="mt-2 text-gray-600">Users and admins interact through our platform, ensuring smooth transactions.</p>
                </div>
                <div className="m-4 text-center">
                  <FaUserShield className="text-6xl text-indigo-600 mx-auto" />
                  <h3 className="text-xl font-bold mt-4">Admin</h3>
                  <p className="mt-2 text-gray-600">Admins can manage users, properties, and handle booking requests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
