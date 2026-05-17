import React, { useRef } from 'react';
import Hero from './Hero';
import CategoryFilter from '../ui/CategoryFilter';
import Footer from './Footer';

const LandingPage = () => {
  const filterRef = useRef(null);

  const scrollToFilter = () => {
    filterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#151d23]">
      <Hero onDiscoverClick={scrollToFilter} />
      
      <CategoryFilter ref={filterRef} />
      
      
    </div>
  );
};

export default LandingPage;