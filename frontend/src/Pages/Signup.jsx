import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../Store/userAtom';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import signup from "../assets/signup.jpg"
import { Link } from 'react-router-dom';
import Dropdown from '../Components/Dropdown';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'User' ? "http://localhost:3000/api/v1/user/signup" : "http://localhost:3000/api/v1/owner/signup";
      const response = await axios.post(endpoint, { email, firstName, lastName, password, gender, role });
      console.log("signup req. response", response.data);

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        setUser({
          userId: response.data.userId,
          role: response.data.role,
          gender: response.data.gender
        });
        console.log("User state set:", { userId: response.data.userId, role: response.data.role, gender: response.data.gender });
        toast.success("Signup successful!");
        navigate("/home");
      } else {
        console.error("Authentication successful but token is missing in the response");
        toast.error("Authentication successful, but there was an issue. Please try again.");
      }
    } catch (error) {
      console.error('Authentication error:', error.response ? error.response.data : error);
      toast.error(error.response?.data?.msg || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', width: '100%', height: '100vh' }}>
      <div className="flex justify-end h-screen items-center p-4 sm:p-8">
        <form className="w-full max-w-lg p-6 rounded-lg shadow-md bg-white sm:mr-48" onSubmit={handleSignup}>
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">Create Account</h2>

          <Input label="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <Input label="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

          <div className='justify-evenly flex'>
            
            <Dropdown
              options={["User", "Owner"]}
              label="User Type"
              onChange={(selected) => setRole(selected)}
            />
            <Dropdown
              options={["Male", "Female", "Other"]}
              label="Gender"
              onChange={(selected) => setGender(selected)}
            />
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className='text-md text-center'>
            Already have an account? <Link to="/signin" className='text-slate-500'>Signin</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
