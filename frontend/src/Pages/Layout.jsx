import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"
import { userMenu, ownerMenu } from '../Constants/index';
import { useRecoilValue, useSetRecoilState} from "recoil";
import { userAtom } from "../Store/userAtom";
import { RxCross1 } from "react-icons/rx";
import { CgMenuLeftAlt } from "react-icons/cg";
import axios from 'axios';

const Layout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token"); 
  const [notifications, setNotifications] = useState([]);

  console.log("User state in Layout:", user);

  const menuToBeRendered = user.role === 'Owner' ? ownerMenu : userMenu;

  console.log("User role:", user.role);
  console.log(menuToBeRendered);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser({ userId: null, role: '', gender: '' });
    navigate('/signin');
    console.log('User logged out');
  };
  
  const fetchNotification = async() => {
    const userId = user.userId
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/notification/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setNotifications(response.data)
      console.log("successfully fetch notifications")
    } catch(error) {
      console.log("error to fetch notifications")
    }
  }

  useEffect(() => {
    fetchNotification()
  }, [])

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-slate-200 text-white h-screen ${sidebarVisible ? 'w-64' : 'w-0'} md:w-64 border-blacks`}>
        <div className=" flex justify-evenly items-end -mt-5">
          <div className='flex justify-center -mt-8 border-b border-indigo-700'>
            <img src={logo} alt="logo" className='w-3/4 h-3/4 mt-3' />
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
        <div className="menu mt-1">
          {menuToBeRendered.map((menu, index) => (
            <Link 
              key={index} 
              to={menu.path} 
              className="block px-6 py-4 mb-4 hover:bg-blue-200 transition duration-150 ease-in-out text-black"
              onClick={() => {
                if (menu.name === 'Logout') {
                  handleLogout();
                }
                setSidebarVisible(false);
              }}
            >
              <div className="flex items-center">
                <span>{menu.icon}</span>
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
        <div className="header flex items-center justify-between p-4 bg-slate-200 shadow-md">
          <div className="flex items-center">
            {!sidebarVisible && (
              <i
                className="ri-menu-line text-2xl cursor-pointer text-indigo-800 hover:text-indigo-600 transition-colors duration-150 md:hidden mr-4"
                onClick={() => setSidebarVisible(true)}
              >
                <CgMenuLeftAlt size={40} />
              </i>
            )}
            <h2 className="text-xl font-bold text-gray-800 py-2 border-b-2 border-indigo-500 inline-block">
              {menuToBeRendered.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className='bg-slate-400 p-2 rounded-full hover:bg-slate-500 transition-colors duration-150'
              onClick={toggleNotifications}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <p className="text-indigo-800 font-medium text-lg">{user.role}</p>
          </div>
        </div>

        {/* Notifications Popup */}
        {notificationsVisible && (
          <div className="fixed top-16 right-4 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="border-b last:border-none py-2">
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 rounded overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;