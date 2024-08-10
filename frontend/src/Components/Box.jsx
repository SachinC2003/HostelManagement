import React from 'react';

const Box = ({ data = {}, onClick }) => {
  const { hostelName: name, price, imageUrls = [] } = data;
  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : 'https://via.placeholder.com/150';

  console.log('Box Image URL:', imageUrl); // Check the image URL

return (
    <div className="cursor-pointer grid p-5" onClick={onClick}>
    <div className='bg-blue-200 p-5 rounded-lg flex justify-center'>
      <div>
        <div className="rounded-xl overflow-hidden w-64 h-64">
          <img 
            src={imageUrl} 
            alt="Hostel" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pl-2">
          <div className="text-white-800 text-xl font-medium pb-2 pt-2">
            {name || "No Name"}
          </div>
          <div className="text-black-400 text-md font-normal pb-1">
            {price !== undefined ? `${price} Rs. per student` : "No Price"}
          </div>
      </div>
      </div>
    </div>
    
    </div>
  );
};

export default Box;
