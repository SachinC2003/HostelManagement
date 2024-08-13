import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../Components/Box';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../Store/userAtom';

const Hostel = () => {
  const [hostel, setHostel] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [filterPopup, setFilterPopup] = useState(false);
  const [price, setPrice] = useState('');
  const [sharing, setSharing] = useState('');
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchHostels(storedToken);
    }
  }, []);

  const fetchHostels = async (token, filters = {}) => {
    try {
      setHostel([]); // Clear existing hostels before fetching new ones
      setError(''); // Clear existing error message
      const response = await axios.get('http://localhost:3000/api/v1/user/hostel', {
        headers: { Authorization: `Bearer ${token}`, id: user._id },
        params: filters
      });
      if (!response.data.data || response.data.data.length === 0) {
        setError("No hostels available at the moment.");
      } else if (Array.isArray(response.data.data)) {
        setHostel(response.data.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Received unexpected data format from the server.");
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setError("Failed to fetch hostels. Please try again later.");
    }
  };

  const handleBoxClick = (data) => {
    setSelectedHostel(data);
  };

  const handleClosePopup = () => {
    setSelectedHostel(null);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setFilterPopup(false);
  
    // Create filters object and add only valid filters
    const filters = {};
    if (price) filters.price = Number(price);
    if (sharing) filters.sharing = Number(sharing);
  
    fetchHostels(token, filters);
  
    // Clear input values after applying filter
    setPrice('');
    setSharing('');
  };
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center font-bold text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className='bg-white z-10'>
      <div className='flex justify-end items-center'>
        <button
          onClick={() => setFilterPopup(true)}
          className='px-4 py-2 mt-2 mr-2 w-35 text-xl bg-blue-500 text-white rounded'
        >
          Filter
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mr-5 flex-wrap'>
        {hostel.length > 0 ? (
          hostel.map((item, index) => (
            <Box key={index} data={item} onClick={() => handleBoxClick(item)} />
          ))
        ) : (
          <div className="flex items-center justify-center h-64 text-lg font-bold text-gray-600">
            {error ? error : 'Loading...'}
          </div>
        )}
      </div>

      {selectedHostel && (
        <Popup data={selectedHostel} onClose={handleClosePopup} />
      )}

      {filterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 mr-1">Filter Hostels</h2>
            <form onSubmit={handleFilter}>
              <div className="mb-4">
                <label className="block text-gray-700">Price (less than)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sharing (less than)</label>
                <input
                  type="number"
                  value={sharing}
                  onChange={(e) => setSharing(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Apply Filter
                </button>
                <button
                  onClick={() => setFilterPopup(false)}
                  className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Popup = ({ data, onClose }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 z-50">
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
          <p><strong>Drinking Water:</strong> {drinkingWater}</p>
          <p><strong>Hot Water:</strong> {hotWater}</p>
          <p><strong>Owner:</strong> {owner}</p>
          <p><strong>Rooms:</strong> {rooms}</p>
          <p><strong>Sharing:</strong> {sharing}</p>
          <p><strong>Total Students:</strong> {totalStudents}</p>
          <p><strong>Vacancy:</strong> {vacancy}</p>
          <p><strong>Ventilation:</strong> {ventilation}</p>
          <p><strong>Wi-Fi:</strong> {wifi}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hostel;
