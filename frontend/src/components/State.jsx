import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const States = () => {
 
  const [statesList, setStatesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        
        const response = await axios.get('https://travel-bharat-in.onrender.com/api/states/all-states');
        setStatesList(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states from database:", error);
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#151d23] flex items-center justify-center text-white text-2xl font-bold font-serif">
        Loading States... 🌍
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151d23] pt-32 pb-20 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-[#FFF] mb-4 font-serif">
          Explore States
        </h1>
        <p className="text-gray-500 text-lg font-bold">
          Choose a state to discover its most beautiful destinations.
        </p>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {statesList.map((state) => (
          
          <Link 
            to={`/state/${state._id}`} 
            key={state._id} 
            className="group relative h-[250px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 block"
          >
           
            <img 
              src={state.stateImageUrl} 
              alt={state.stateName} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Text Content - Bottom Left */}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-1 group-hover:text-orange-500 transition-colors">
                {state.stateName}
              </h3>
            

              <p className="text-sm font-medium opacity-80">{state.region} Region</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default States;