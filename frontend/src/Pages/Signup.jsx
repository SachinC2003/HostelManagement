import React, { useState } from 'react';
import Input from '../Components/Input';
import {Link} from "react-router-dom"
import Dropdown from '../Components/Dropdown';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { firstName, lastName, username, password, gender });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-green-300 rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Ramesh" label="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="Patil" label="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="abc@gmail.com" label="Email" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="@@@@@" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          
          <div className='flex justify-around'>
          
            <Dropdown 
            options={["Male", "Female", "Other"]}
            label="Gender"
            onChange={(selected) => setGender(selected)}
          />
          <Dropdown 
            options={["User", "Owner"]}
            label="User Type"
            onChange={(selected) => setUserType(selected)}
          />
            </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div >
          <div className='text-md'>
         Already have an accound ? <span className='text-slate-500'>Signin</span> 
 </div>       </form>
      </div>
    </div>
  );
};

export default SignUp;