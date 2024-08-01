/*import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../Store/userAtom';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import { Link } from "react-router-dom";
import Dropdown from '../Components/Dropdown';

export const Signup = () => {
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
      console.log("Response data:", response.data);
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-green-300 rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <Input placeholder="First Name" label="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="Last Name" label="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="abc@gmail.com" label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          
          <div className='flex justify-around'>
            <Dropdown 
              options={["Male", "Female", "Other"]}
              label="Gender"
              onChange={(selected) => setGender(selected)}
            />
            <Dropdown 
              options={["User", "Owner"]}
              label="User Type"
              onChange={(selected) => setRole(selected)}
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
*/
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../Store/userAtom';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import { Link } from "react-router-dom";
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
  
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser({
          // Since we don't have userId from the server, we could use email as a temporary identifier
          userId: email,
          // We know the role from the form
          role: role,
          // We know the gender from the form
          gender: gender
        });
  
        console.log("User state set:", { userId: email, role: role, gender: gender });
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-green-300 rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <Input placeholder="First Name" label="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="Last Name" label="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="abc@gmail.com" label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          
          <div className='flex justify-around'>
            <Dropdown 
              options={["Male", "Female", "Other"]}
              label="Gender"
              onChange={(selected) => setGender(selected)}
            />
            <Dropdown 
              options={["User", "Owner"]}
              label="User Type"
              onChange={(selected) => setRole(selected)}
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
