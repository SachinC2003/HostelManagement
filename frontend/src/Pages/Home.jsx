import React from 'react';
import homebg from "../assets/smhomebg.png"
const Home = () => {
  return (
    <div className='-mt-20'>
    <div className="h-screen bg-cover bg-center " style={{ backgroundImage: `url(${homebg})` }}>
      <h1 className="text-white text-3xl">Hello, World!</h1>
      </div>
      </div>
  );
}

export default Home;
