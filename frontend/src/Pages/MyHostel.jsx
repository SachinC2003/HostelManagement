import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../Components/Box';
import UpdateHostelPopup from './UpdateHostel';

const MyHostel = () => {
  const [myhostel, setMyHostel] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      myhostels(storedToken);
    } else {
      setError("No authentication token found. Please log in.");
      setLoading(false);
    }
  }, []);

  const myhostels = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/owner/myhostel', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.data.data || response.data.data.length === 0) {
        setError("No any hostels uploded by you.");
      }else if (Array.isArray(response.data.data)) {
        setMyHostel(response.data.data);
        setError('');
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Received unexpected data format from the server.");
      }
    } catch (error) {
      console.error("Error fetching myhostels:", error);
      setError("Failed to fetch myhostels. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleBoxClick = (data) => {
    setSelectedHostel(data);
  };

  const handleClosePopup = () => {
    setSelectedHostel(null);
  };

  const handleUpdateClick = (hostelId) => {
    setUpdate(hostelId);
  };

  const handleCloseUpdatePopup = () => {
    setUpdate(null);
  };

  if (loading) {
    return (
      <div className="bg-white overflow-hidden w-screen h-screen flex justify-center items-center ">
       <div>
        <div className="flex justify-center">
          </div>
          <div className="flex items-center justify-center mt-10">
            <img src="https://static.javatpoint.com/csspages/images/css-loader.gif" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center font-bold text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className='z-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mr-5 flex-wrap'>
        {myhostel.length > 0 ? (
          myhostel.map((item, index) => (
            <Box key={index} data={item} onClick={() => handleBoxClick(item)} />
          ))
        ) : (
          <div>No hostels found.</div>
        )}
      </div>

      {selectedHostel && (
        <Popup data={selectedHostel} onClose={handleClosePopup} onUpdateClick={handleUpdateClick} />
      )}

      {update && (
        <UpdateHostelPopup hostelId={update} onClose={handleCloseUpdatePopup} />
      )}

    </div>
  );
};

const Popup = ({ data, onClose, onUpdateClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { hostelName, price, area, address, contact, drinkingWater, hotWater, owner, rooms, sharing, totalStudents, vacancy, ventilation, wifi, imageUrls = [] } = data;
  const imageUrl = imageUrls[currentImageIndex] || 'https://via.placeholder.com/150';

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="relative rounded-xl overflow-hidden mb-4">
          <img src={imageUrl} alt="Hostel" className="w-full h-48 object-cover" />
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-r"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-l"
              >
                &gt;
              </button>
            </>
          )}
        </div>
        <h2 className="text-xl font-bold mb-4">{hostelName}</h2>
        <div className="space-y-2">
          <p><strong>Price:</strong> {price}{" Rs per student"}</p>
          <p><strong>Area:</strong> {area}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Contact:</strong> {contact}</p>
          <p><strong>Rooms:</strong> {rooms}</p>
          <p><strong>Sharing:</strong> {sharing} students per room</p>
          <p><strong>Total Students:</strong> {totalStudents}</p>
          <p><strong>Vacancy:</strong> {vacancy}</p>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Ventilation:</strong> {ventilation}</p>
            <p><strong>Wi-Fi:</strong> {wifi}</p>
            <p><strong>Hot Water:</strong> {hotWater}</p>
            <p><strong>Drinking Water:</strong> {drinkingWater}</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-7">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded">Close</button>
          <button onClick={() => onUpdateClick(data._id)} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default MyHostel;
