import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LandingPage from "../src/Pages/Landing";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Layout from "./Pages/Layout";
import Home from "../src/Pages/Home";
import Hostel from "./Pages/Hostel";
import cssloader from "./assets/cssloader.gif"
import Mess from "./Pages/Mess";
import MyHostel from "../src/Pages/MyHostel";
import Notfound from "../src/assets/Notfound.avif"
import { userAtom } from "./Store/userAtom";
import UplodeHostel from "./Pages/UplodeHostel";
import UpdateHostel from "./Pages/UpdateHostel";
import UplodeMess from "./Pages/UplodeMess";
import ProtectedRoute from "./Components/ProtectedRoute";

function NotFound() {
  return (
    <div className="bg-white flex justify-center items-center">
      <img src={Notfound} alt="Not Found " className=" w-screen h-screen" />
      {/* Replace the src with your own image URL */}
    </div>
  );
}

function AppContent() {
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    if (token) {
      axios.get('http://localhost:3000/api/v1/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("Full response from /user/me:", response.data);
        if (!response.data._id) {
          console.error("userId is missing from the response");
          throw new Error("Invalid response from server");
        }
        setUser({ 
          userId: response.data._id, 
          role: response.data.role || 'User', 
          gender: response.data.gender 
        });
        console.log("User state set:", { 
          userId: response.data.userId, 
          role: response.data.role || 'User', 
          gender: response.data.gender 
        });
      })
      .catch(error => {
        console.error('Error verifying token:', error.response ? error.response.data : error.message);
        setUser({ userId: null, role: '', gender: '' }); // Reset user state on error
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
    return (
      <div className="bg-white overflow-hidden w-screen h-screen flex justify-center items-center ">
       <div>
        <div className="flex justify-center">
          </div>
          <div className="flex items-center justify-center mt-10">
            <img src={cssloader} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route 
          path="/hostel" 
          element={
            <ProtectedRoute roles={['Owner', 'User']}>
              <Layout><Hostel /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mess" 
          element={
            <ProtectedRoute roles={['Owner', 'User']}>
              <Layout><Mess /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute roles={['Owner', 'User']}>
              <Layout><Home /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myhostel" 
          element={
            <ProtectedRoute roles={['Owner']}>
              <Layout><MyHostel /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uplodehostel" 
          element={
            <ProtectedRoute roles={['Owner']}>
              <Layout><UplodeHostel /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/updatehostel" 
          element={
            <ProtectedRoute roles={['Owner']}>
              <Layout><UpdateHostel /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uplodemess" 
          element={
            <ProtectedRoute roles={['Owner']}>
              <Layout><UplodeMess /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for undefined paths */}
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
