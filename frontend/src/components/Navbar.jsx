import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 1. Handle Scroll bar color change
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🎯 2. FIX: Dynamic Body Scroll Lock Logic for Mobile Overlay
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup tab to prevent freeze on route switch
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <nav className="fixed top-0 z-[100] w-full flex justify-center transition-all duration-300">
   
            <div className={`
                w-full px-6 md:px-34 py-4 flex items-center justify-between text-white transition-all duration-500
                ${isScrolled 
                    ? "bg-white/10 backdrop-blur-lg border-b border-white/10 shadow-lg" 
                    : "bg-transparent border-b border-white/5"}
            `}>
                
                {/* Logo Section */}
                <div className="text-white font-semibold tracking-wide text-2xl md:text-3xl whitespace-nowrap">
                    Travel Bharat IN
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-4 text-lg">
                    <Link className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-all" to="/">
                        Home
                    </Link>
                    <Link className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-all" to="/states">
                        States
                    </Link>
                </div>

                
                <div className="md:hidden text-2xl z-[110] cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </div>

                <div className={`
                    fixed inset-0 h-screen w-screen  backdrop-blur-2xl flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden z-[105]
                    ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}
                `}>
                    <Link 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-4xl font-light tracking-widest bg-transparent hover:text-[#ea580c] transition-colors" 
                        to="/"
                    >
                        HOME
                    </Link>
                    <Link 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-4xl font-light tracking-widest bg-transparent hover:text-[#ea580c] transition-colors" 
                        to="/states"
                    >
                        STATES
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;