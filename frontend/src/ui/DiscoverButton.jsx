import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const DiscoverButton = ({ className = "", onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`
                px-6 py-3 rounded-full 
                bg-white/10 backdrop-blur-lg 
                border border-white/20 
                text-white font-medium text-lg md:text-xl
                flex items-center gap-3
                shadow-lg hover:bg-orange-600 hover:border-orange-500
                hover:scale-105 active:scale-95
                transition-all duration-300 group ${className}
            `}
        >
            Discover 
            <FontAwesomeIcon 
                icon={faArrowRight} 
                className="group-hover:translate-x-1 transition-transform" 
            />
        </button>
    );
};

export default DiscoverButton;