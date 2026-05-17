import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faHeart, faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
    return (
        <footer className="w-full bg-[#0f172a] backdrop-blur-md text-white/80 border-t border-white/10 font-serif">
            
            {/* Main Footer Content */}
            <div className="w-[80%] lg:w-[85%] mx-auto px-6 md:px-14 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 text-lg">
                
                {/* 1. Logo and Intro */}
                <div className="md:col-span-2 space-y-4">
                    <Link to="/" className="flex items-center gap-3 text-white font-semibold text-2xl md:text-3xl tracking-wide">
                        <FontAwesomeIcon icon={faMapPin} className="text-2xl text-[#ea580c]" />
                        <span>Travel Bharat IN</span>
                    </Link>
                    <p className="max-w-md text-white/70 leading-relaxed text-base md:text-lg">
                        Explore the rich heritage and diverse landscapes of India. From the Himalayas to the backwaters, discover incredible destinations with us.
                    </p>
                </div>

                {/* 2. Quick Links */}
                <div className="space-y-4">
                    <h4 className="font-medium text-white text-xl justify-center">Quick Links</h4>
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="w-fit hover:text-[#ea580c] hover:scale-105 transition-all duration-300 transform origin-left">Home</Link>
                        <Link to="/states" className="w-fit hover:text-[#ea580c] hover:scale-105 transition-all duration-300 transform origin-left">States</Link>
                        
                       
                    </div>
                </div>

                {/* 3. Contact Section */}
                <div className="space-y-4">
                    <h4 className="font-medium text-white text-xl">Get in Touch</h4>
                    <div className="flex flex-col gap-3 text-base md:text-lg">
                        <div className="flex items-center gap-3 hover:text-white cursor-default transition-colors">
                            <FontAwesomeIcon icon={faEnvelope} className="text-[#ea580c]" />
                            <span>info@travelbharat.in</span>
                        </div>
                        <div className="flex items-center gap-3 hover:text-white cursor-default transition-colors">
                            <FontAwesomeIcon icon={faHeart} className="text-[#ea580c]" />
                            <span>Lucknow, India</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Section */}
            <div className="border-t border-white/10 mt-8">
                <div className="w-[90%] mx-auto px-6 md:px-8 py-6 flex flex-col md:row justify-between items-center text-sm md:text-base text-white/60 gap-4">
                    <p>© {new Date().getFullYear()} Travel Bharat IN. All rights reserved.</p>
                    
                   
                    <div className="flex items-center gap-2">
                        <span>Maintained & Engineered by</span>
                        <span className="font-semibold text-[#ea580c]">Abhay Pratap Singh</span>
                    </div>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;