import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateHostelPopup = ({ hostelId, onClose }) => {
  const [token, setToken] = useState('');
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    hostelName: '',
    area: '',
    address: '',
    gender: '',
    contact: 0,
    rooms: 0,
    sharing: 0,
    totalStudents: 0,
    price: 0,
    hotWater: '',
    wifi: '',
    ventilation: '',
    drinkingWater: '',
    vacancy: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("No authentication token found. Please log in.");
    }
  }, []);

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/owner/hostel/${hostelId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        const data = response.data;
        setFormData({
          hostelName: data.hostelName,
          area: data.area,
          address: data.address,
          gender: data.gender,
          rooms: data.rooms,
          sharing: data.sharing,
          totalStudents: data.totalStudents,
          price: data.price,
          contact: data.contact,
          hotWater: data.hotWater,
          wifi: data.wifi,
          ventilation: data.ventilation,
          drinkingWater: data.drinkingWater,
          vacancy: data.vacancy,
        });
      } catch (error) {
        toast.error('Error fetching hostel data!');
      }
    };

    if (token) {
      fetchHostelData();
    }
  }, [hostelId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['contact', 'rooms', 'sharing', 'totalStudents', 'price'].includes(name)
        ? parseInt(value, 10) || 0
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/owner/update/${hostelId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      toast.success('Hostel information updated successfully!');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating hostel:', error.response?.data || error.message);
      toast.error('Error updating hostel information: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='z-10'>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Update Hostel Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Hostel Name</label>
              <input
                type="text"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter hostel name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select area</option>
                <option value="Near Kit college">Near Kit college</option>
                <option value="ST colony">ST colony</option>
                <option value="Near Main Gate">Near Main Gate</option>
                <option value="Bharati Vidyapeeth">Bharati Vidyapeeth</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Contact</label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Rooms</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter number of rooms"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Sharing</label>
              <input
                type="number"
                name="sharing"
                value={formData.sharing}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter sharing"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Total Students</label>
              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter total students"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter price"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Vacancy</label>
              <select
                name="vacancy"
                value={formData.vacancy}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select vacancy</option>
                <option value="fill">Fill</option>
                <option value="vacant">Vacant</option>
              </select>
            </div>
            <h3 className="text-lg font-bold mt-6 mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Hot Water</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="hotWater"
                      value="yes"
                      checked={formData.hotWater === 'yes'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hotWater"
                      value="no"
                      checked={formData.hotWater === 'no'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Wi-Fi</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="wifi"
                      value="yes"
                      checked={formData.wifi === 'yes'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="wifi"
                      value="no"
                      checked={formData.wifi === 'no'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Ventilation</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="ventilation"
                      value="yes"
                      checked={formData.ventilation === 'yes'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="ventilation"
                      value="no"
                      checked={formData.ventilation === 'no'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Drinking Water</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="drinkingWater"
                      value="yes"
                      checked={formData.drinkingWater === 'yes'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="drinkingWater"
                      value="no"
                      checked={formData.drinkingWater === 'no'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Upload Images (Minimum 2 images)</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => setImages([...e.target.files])}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition duration-200 mr-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateHostelPopup;