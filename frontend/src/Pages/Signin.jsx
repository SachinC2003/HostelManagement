import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../Store/userAtom';
import { Link } from 'react-router-dom';
import signin from "../assets/signin.png"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../Components/Input';
import Dropdown from '../Components/Dropdown';

const Signin = () => {

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, role });
    try {
      const endpoint = role === 'User' ? "http://localhost:3000/api/v1/user/signin" : "http://localhost:3000/api/v1/owner/signin";
      const response = await axios.post(endpoint, { email, password, role });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        setUser({
          userId: response.data.userId,
          role: response.data.role,
          gender: response.data.gender,
        });
        console.log("User state set:", { userId: response.data.userId, role: response.data.role, gender: response.data.gender });
        toast.success("Signin successful!");
        navigate("/home");
      } else {
        console.error("Authentication successful but token is missing in the response");
        alert("Authentication successful, but there was an issue. Please try again.");
      }
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${signin})`, backgroundSize: 'cover', width: '100%', height: '100vh' }}>
      <div>
        <div className='absolute top-32 left-20'>
          <h1 className='text-xl'>Welcome back ! Please enter your details</h1>
      </div>
     
      <div className="flex items-center  h-screen">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded shadow-md sm:ml-20">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <Input  label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input  label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Dropdown 
            options={["User", "Owner"]}
            label="User Type"
            onChange={(selected) => setRole(selected)}
          />
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
          <div className='text-md text-center'>
            Don't have an account? <Link to="/signup" className='text-slate-500'>Signup</Link>
          </div>
            </form>
             </div>
        </div>
        </div>
    </div>
  );
};

export default Signin;