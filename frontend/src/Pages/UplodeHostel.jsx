import React, { useState } from 'react';
import { toast } from 'react-toastify';

function UplodeHostel() {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    room: '',
    sharing: '',
    totalStudents: '',
    price: '',
    hotWater: '',
    wifi: '',
    ventilation: '',
    drinkingWater: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/owner/uploderoom", formData);
      toast.success('Form data submitted successfully!');
    } catch (error) {
      toast.error('Error submitting form data!');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Hostel Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Hostel Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
                <option value="Area 1">Near Kit college.</option>
                <option value="Area 2">ST colony.</option>
                <option value="Area 3">Near Main Gate</option>
                <option value="Area 4">Bharati Vidyapeeth</option>
            </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Room</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter room"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Sharing</label>
          <input
            type="text"
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

        <h3 className="text-lg font-bold mt-6 mb-4">Features</h3>
        <div className='grid grid-cols-2'>
            <div className="mb-4 ">
            <label className="block text-gray-700 font-medium mb-2">Hot Water</label>
            <div className="flex space-x-4">
                <label>
                <input
                    type="radio"
                    name="hotWater"
                    value="yes"
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
                    onChange={handleChange}
                    className="mr-1"
                />
                No
                </label>
            </div>
            </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UplodeHostel;
