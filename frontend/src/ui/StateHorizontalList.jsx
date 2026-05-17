import React from "react";
import { motion } from "framer-motion";
import { Map } from "lucide-react";


const StateHorizontalList = ({ activeState, onStateSelect }) => {
  

  const statesList = [
    "Uttarakhand", "Goa", "Rajasthan", "Himachal Pradesh", 
    "Kerala", "Uttar Pradesh", "Maharashtra", "Tamil Nadu", "Punjab"
  ];

  const handleStateClick = (state) => {
    if (onStateSelect) onStateSelect(state); 
  };

  return (
   
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-6 mt-2 mb-4">
      
      
      <div className="flex flex-wrap items-center gap-3 py-6 w-full justify-center relative">
        
        {/* Label Section */}
        <div className="flex items-center gap-2 px-3 py-2 text-orange-500 font-bold border-r border-white/10 ">
          <Map size={18} />
          <span className="text-sm tracking-widest uppercase whitespace-nowrap">States</span>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap gap-3 justify-center">
          {statesList.map((state) => (
            <motion.button
              key={state}
             
              whileHover={{ scale: 1.1, y: -8 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStateClick(state)}
           
              className={`px-5 py-2 rounded-full border transition-all duration-300 text-sm font-medium relative hover:z-50
                ${activeState === state 
                  ? "bg-orange-600 border-orange-600 text-white shadow-[0_10px_25px_rgba(234,88,12,0.4)]" 
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
            >
              {state}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateHorizontalList;