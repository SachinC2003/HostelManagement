import React from 'react';
import Box from "../Components/Box";

const Home = () => {
  const boxes = Array.from({ length: 8 });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mr-5 fle-wrap '>
      {
        boxes.map((_, index) => (
          <Box key={index} />
        ))
      }
    </div>
  );
}

export default Home;
