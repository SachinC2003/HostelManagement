import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { userMenu, ownerMenu } from '../Constants/index';
import { useRecoilValue } from "recoil";
import { userAtom } from "../Store/userAtom";


const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  console.log("User state in Layout:", user);

  const menuToBeRendered = user.role === 'admin' ? adminMenu
                         : user.role === 'teacher' ? teacherMenu
                         : userMenu;

  console.log("User role:", user.role);
  console.log(menuToBeRendered);

  const handleLogout = (e) => {
    e.preventDefault();
      localStorage.removeItem("token");
      navigate('/')
      console.log('User logged out');
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-indigo-800 text-white h-screen ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-2xl font-bold">Udimi</h1>
        </div>
        <div className="menu mt-8">
          {menuToBeRendered.map((menu, index) => (
            <Link 
              key={index} 
              to={menu.path} 
              className="block px-6 py-4 mb-4 hover:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={menu.name === 'Logout' ? handleLogout : undefined}
            >
              <div className="flex items-center">
                <i className={`${menu.icon} text-2xl`}></i>
                {!collapsed && <span className="ml-4 text-lg font-bold">{menu.name}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="header flex items-center justify-between p-4 bg-white shadow-md">
          <i
            className={`ri-menu-${collapsed ? 'unfold' : 'fold'}-line text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150`}
            onClick={() => setCollapsed(!collapsed)}
          ></i>
          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="relative text-indigo-800 hover:text-indigo-600 transition-colors duration-150">
              <i className="ri-notification-3-fill text-2xl"></i>
            </Link>
            <p className="username text-indigo-800 font-medium text-lg">{user.username || 'Username'}</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;