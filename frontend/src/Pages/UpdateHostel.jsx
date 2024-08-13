import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Webcam from 'react-webcam';

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
    imageUrls:new Array(),
    ventilation: '',
    drinkingWater: '',
    vacancy: '',
  });
  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef(null);

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
        const data = response.data.data;
        setFormData((prev)=>({...prev,...data}))
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
      const formDataToSend = new FormData();
  
      // Append each form field individually
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
  
      // Append each image file
      images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });
  
      const response = await axios.put(
        `http://localhost:3000/api/v1/owner/update/${hostelId}`,
        formDataToSend,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      toast.success('Hostel information updated successfully!');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating hostel:', error.response?.data || error.message);
      toast.error('Error updating hostel information: ' + (error.response?.data?.message || error.message));
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `camera_image_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setImages(prevImages => [...prevImages, file]);
        });
      setCameraOpen(false);
    }
  }, [webcamRef]);

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  const removeFormImage = (index) => {
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index)
    setFormData((prev)=>({
      ...prev,
      imageUrls:newImageUrls
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
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
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Added Images ({formData.imageUrls.length})</h4>
              <div className="flex flex-wrap gap-2">
                {formData.imageUrls.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeFormImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              </div>
            </div>
            <div className="mb-4 mt-2">
              <label className="text-lg font-bold mb-2">New Images (Minimum 2)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setCameraOpen(true)}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Capture Image
              </button>
              {cameraOpen && (
                <div className="mt-4">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                  />
                  <button
                    onClick={capture}
                    className="mt-2 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                  >
                    Capture
                  </button>
                  <button
                    onClick={() => setCameraOpen(false)}
                    className="mt-2 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Close Camera
                  </button>
                </div>
              )}
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
