import React from 'react';

const Box = ({ data = {}, onClick }) => {
  const { hostelName: name, price } = data;
  const commonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s";

  return (
    <div className="cursor-pointer grid p-5 pr-7" onClick={onClick}>
      <div className='bg-gray-500 p-5 rounded-lg'>
        <div className="rounded-xl overflow-hidden">
          <div>
            <img src={commonImage} alt="Hostel" />
          </div>
        </div>
        <div className="pl-2">
          <div className="text-white-800 text-lg font-medium pb-2">
            {name || "No Name"}
          </div>
          <div className="text-gray-400 text-lg font-normal pb-1">
            {price !== undefined ? `$${price}` : "No Price"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
