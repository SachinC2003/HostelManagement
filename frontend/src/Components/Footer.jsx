import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-semibold mb-4 md:mb-0">
            <a href="/" className="hover:text-gray-400">
             Campus Comfort
            </a>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/services" className="hover:text-gray-400">
              Services
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 CampusComfort. All rights reserved.</p>
          <p>Email: contact@mywebsite.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
