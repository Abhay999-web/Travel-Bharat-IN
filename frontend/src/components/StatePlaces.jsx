import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios'; 

const StatePlaces = () => {
  // FIX: App.js ke naye path pattern ke hisab se params se direct stateId nikal li
  const { stateId } = useParams(); 
  const [placesList, setPlacesList] = useState([]);
  const [stateInfo, setStateInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`https://travel-bharat-in.onrender.com/api/places/state/${stateId}`);
        const data = response.data.data || [];
        setPlacesList(data);
        
       
        if (data.length > 0 && data[0].stateId) {
          setStateInfo(data[0].stateId.stateName);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching places for this state:", error);
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [stateId]);

 
  const filteredPlaces = useMemo(() => {
    return placesList.filter(place => {
      const matchesSearch = place.placeName.toLowerCase().includes(searchTerm.toLowerCase());
     

      const matchesCategory = selectedCategory === "All" || place.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [placesList, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151d23] flex items-center justify-center text-white text-2xl font-bold font-serif">
        Loading Beautiful Places... 🏔️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151d23] text-white pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 1. Back Button - Wahi Orange Style */}
        <Link 
          to="/states" 
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-8 font-semibold group"
        >
          <div className="p-2 bg-orange-600/10 rounded-full group-hover:bg-orange-600/20 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span>Back to States</span>
        </Link>

        {/* 2. Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Places in <span className="text-orange-500">{stateInfo || "State"}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Explore the best destinations in {stateInfo || "this state"}.
          </p>
        </div>

        {/* 3. Filter Bar - Dark Theme Style */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex flex-col md:flex-row gap-6 mb-12 shadow-2xl">
          <div className="flex-1">
            <label className="block text-xs font-bold text-orange-500 uppercase mb-2 tracking-widest">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 bg-[#1c262e] border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-300 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="hill">Hill Station</option>
              <option value="beach">Beach</option>
              <option value="temple">Religious</option>
              <option value="city">City / Heritage</option>
            </select>
          </div>

          <div className="flex-[2]">
            <label className="block text-xs font-bold text-orange-500 uppercase mb-2 tracking-widest">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Find a place..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-12 bg-[#1c262e] border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 text-white placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 4. Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPlaces.map((place) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={place._id} 
            >
              <Link to={`/place/${place._id}`} className="group block bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 shadow-xl">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.placeName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase">
                    {place.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151d23] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {place.placeName}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={16} className="text-orange-500" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results found */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <p className="text-slate-500 text-2xl font-light">Oops! No destinations found matching your criteria. 🛶</p>
            <button 
               onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
               className="mt-4 text-orange-500 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default StatePlaces;