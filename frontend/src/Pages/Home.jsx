<<<<<<< HEAD
import React from 'react';
import homebg from "../assets/smhomebg.png"
const Home = () => {
  return (
    <div className='-mt-20'>
    <div className="h-screen bg-cover bg-center " style={{ backgroundImage: `url(${homebg})` }}>
      <h1 className="text-white text-3xl">Hello, World!</h1>
      </div>
      </div>
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../Components/Box';

const Home = () => {
  const [hostel, setHostel] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [selectedHostel, setSelectedHostel] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      hostels(storedToken);
    }
  }, []);

  const hostels = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/hostel', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(response.data.data)) {
        setHostel(response.data.data);
        setError('');
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Received unexpected data format from the server.");
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setError("Failed to fetch hostels. Please try again later.");
    }
  }

  const handleBoxClick = (data) => {
    setSelectedHostel(data);
  };

  const handleClosePopup = () => {
    setSelectedHostel(null);
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mr-5 flex-wrap'>
        {hostel.length > 0 ? (
          hostel.map((item, index) => (
            <Box key={index} data={item} onClick={() => handleBoxClick(item)} />
          ))
        ) : (
          Array.from({ length: 8 }).map((_, index) => (
            <Box key={index} data={{}} />
          ))
        )}
        {error && <div className="error">{error}</div>}
      </div>

      {selectedHostel && (
        <Popup data={selectedHostel} onClose={handleClosePopup} />
      )}
    </div>
>>>>>>> 10f59b69ea9fb1ec8cd83fec019db91bfd2c9838
  );
};

const Popup = ({ data, onClose }) => {
  const commonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s";
  const { hostelName, price, area, contact, drinkingWater, hotWater, owner, rooms, sharing, totalStudents, vacancy, ventilation, wifi } = data;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="rounded-xl overflow-hidden mb-4">
          <img src={commonImage} alt="Hostel" />
        </div>
        <h2 className="text-xl font-bold mb-4">{hostelName}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Area:</strong> {area}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Drinking Water:</strong> {drinkingWater}</p>
        <p><strong>Hot Water:</strong> {hotWater}</p>
        <p><strong>Rooms:</strong> {rooms}</p>
        <p><strong>Sharing:</strong> {sharing}</p>
        <p><strong>Total Students:</strong> {totalStudents}</p>
        <p><strong>Vacancy:</strong> {vacancy}</p>
        <p><strong>Ventilation:</strong> {ventilation}</p>
        <p><strong>Wi-Fi:</strong> {wifi}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default Home;
