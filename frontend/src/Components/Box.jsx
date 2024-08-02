import React from 'react';

const Box = ({ data = {}, onClick }) => {
  const { hostelName: name, price } = data;
  const commonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s";

  return (
    <div className="cursor-pointer grid p-5 pr-7" onClick={onClick}>
      <div className='bg-blue-200 p-5 rounded-lg'>
        <div className="rounded-xl overflow-hidden">
          <div>
            <img src={commonImage} alt="Hostel" />
          </div>
        </div>
        <div className="pl-2">
          <div className="text-white-800 text-xl font-medium pb-2 pt-2">
            {name || "No Name"}
          </div>
          <div className="text-black-400 text-md font-normal pb-1">
            {price !== undefined ? `${price}` : "No Price"}{" Rs.  per student"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
