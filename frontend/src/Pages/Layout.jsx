import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import { Navigate } from 'react-router-dom';
import { userMenu, ownerMenu } from '../Constants/index';
import { useRecoilValue, useSetRecoilState} from "recoil";
import { userAtom } from "../Store/userAtom";
import { RxCross1 } from "react-icons/rx";
import { CgMenuLeftAlt } from "react-icons/cg";
const Layout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate(userAtom);
  console.log("User state in Layout:", user);

  const menuToBeRendered = user.role === 'Owner' ? ownerMenu
                         : userMenu;

  console.log("User role:", user.role);
  console.log(menuToBeRendered);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser({ userId: null, role: '', gender: '' });
    navigate('/signin');
    console.log('User logged out');
  };
  

  return (
    <div className="h-screen flex ">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-white text-white h-screen ${sidebarVisible ? 'w-64' : 'w-0'} md:w-64 border-blacks`}>
        <div className="ssborder-b border-indigo-700 flex justify-between items-center">
          <div className=' flex align-center justify-center  -mt-8'>
          <img src={logo} alt="logo" className='w-3/4 h-3/4' />
          </div>
          <button 
            onClick={() => setSidebarVisible(false)} 
            className="text-white text-2xl md:hidden"
          >
            <div className='text-black'>
              <RxCross1 />
              </div>
          </button>
          
        </div>
        <hr className="w-full border-t-2 border-gray-300 -mt-6" />
        <div className="menu mt-8">

          {menuToBeRendered.map((menu, index) => (
            <Link 
              key={index} 
              to={menu.path} 
              className="block px-6 py-4 mb-4 hover:bg-blue-200 transition duration-150 ease-in-out text-black"
              onClick={menu.name === 'Logout' ? handleLogout : undefined}
            >
              <div className="flex items-center">
                <span>   {menu.icon} </span>
                <span className="ml-4 text-lg font-bold hidden md:block">{menu.name}</span>
                {sidebarVisible && <span className="ml-4 text-lg font-bold">{menu.name}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="header flex items-center justify-between p-4 bg-white shadow-md">
          {!sidebarVisible && (
            <i
              className="ri-menu-line text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150 md:hidden"
              onClick={() => setSidebarVisible(true)}
            >
              <CgMenuLeftAlt size={40} />
            </i>
          )}
          <div className="flex items-center space-x-4 flex-row-reverse">
            <Link to="/notifications" className="relative text-indigo-800 hover:text-indigo-600 transition-colors duration-150">
              <i className="ri-notification-3-fill text-2xl"></i>
            </Link>
            <div className="flex ml-auto">
              <p className="text-indigo-800 font-medium text-lg pr-2 align-text-right">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
