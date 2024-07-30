import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Layout from "./Pages/Layout";
import UplodeHostel from "./Pages/UplodeHostel";
import { userAtom } from "./Store/userAtom"


function AppContent() {
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Log the token
    if (token) {
      axios.get('http://localhost:3000/api/vi/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("Full response from /user/me:", response.data);
        if (!response.data.userId) {
          console.error("userId is missing from the response");
          throw new Error("Invalid response from server");
        }
        setUser({ userId: response.data.userId, role: response.data.role || 'user', gender:response.data.gender});
        console.log("User state set:", { userId: response.data.userId, role: response.data.role || 'user', gender:response.data.gender });
      })
      .catch(error => {
        console.error('Error verifying token:', error.response ? error.response.data : error.message);
        localStorage.removeItem('token');
        setUser({ userId: null, role: '', gender:'' }); // Reset user state on error
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      console.log("No token found in localStorage");
      setIsLoading(false);
    }
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Layout><UplodeHostel /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;