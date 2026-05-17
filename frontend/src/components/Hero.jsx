import React from 'react';
import mountain from "../assets/mountain.webp";

import DiscoverButton from '../ui/DiscoverButton';

const Hero = ({ onDiscoverClick }) => {
  return (
    <div className='w-full h-[80vh] bg-cover bg-center relative object-cover pt-30'
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className='absolute inset-0 bg-black/70'></div>

      <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6'>
        {/* Responsive  */}
        <h1 className='text-6xl md:text-5xl lg:text-9xl font-bold leading-tight tracking-wide mb-2'>
          Explore  <span className="text-orange-500 md:text-white">Bharat</span>
          
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-3 max-w-2xl mx-auto">
          Explore the most stunning destinations across India from serene hills to golden deserts. </p>

        <div className='mt-2'>
          <DiscoverButton onClick={onDiscoverClick}/>
         
        </div>
      </div>
    </div>
  );
};

export default Hero;