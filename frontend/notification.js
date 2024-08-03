import axios from 'axios';

const createNotification = async (userId, message) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/createnotification', 
      { userId, message },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log("notification created");
    return response.data;
  } catch (error) {
    console.error('Failed to create notification:', error);
    throw error;
  }
};

export default createNotification;
