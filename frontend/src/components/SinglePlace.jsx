import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios"; 

const SinglePlace = () => {
  const { id } = useParams(); 
  const [place, setPlace] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
    
        const res = await axios.get(`http://localhost:3000/api/places/${id}`);
        
        if (res.data && res.data.data) {
          setPlace(res.data.data);
        } else {
          setPlace(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching place details from server:", error);
        setLoading(false);
      }
    };
    fetchPlaceDetails();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#151d23] flex items-center justify-center text-white text-2xl font-serif">
        Loading Destination Details... ✈️
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-[#151d23] flex items-center justify-center text-white">
        <h2 className="text-2xl font-bold">Place not found! 🛶</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151d23] text-white">
      <div className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
      
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-400 transition-colors font-semibold group"
          >
            <div className="p-2 bg-orange-600/10 rounded-full group-hover:bg-orange-600/20 group-hover:scale-110 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span>Back to Explore</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8"
        >
          {/* Main Image Container */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative h-[300px] md:h-[550px]">
            <img
              src={place.image}
              alt={place.placeName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151d23]/80 via-transparent to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="mt-4 px-2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {place.placeName} 
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-slate-300">
                <MapPin className="w-4 h-4 text-orange-500" />
        

                <span className="text-sm font-medium">{place.stateId?.stateName || "India"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-slate-300 capitalize">
                <Tag className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">{place.category}</span>
              </div>
            </div>

            {/* Description Box */}
            
<div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm shadow-xl mt-8">
  <h3 className="text-xl font-bold text-orange-500 mb-4 uppercase tracking-wider text-sm">
    About this place
  </h3>
  <p className="text-slate-300 leading-relaxed text-lg md:text-xl font-light">
    {/* ⚡ Yahan dhyan se check karo: place.description hi hona chahiye lowercase me */}
    {place.description || "Discover the mesmerizing beauty, cultural richness, and unforgettable experiences waiting for you at this breath-taking destination."}
  </p>
</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SinglePlace;