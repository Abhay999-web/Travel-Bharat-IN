import React, { useState, useEffect, useMemo, forwardRef } from "react";
import { Search, MapPin, Filter, Plane, Landmark, Mountain, Building2, Palmtree, X, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import StateHorizontalList from "./StateHorizontalList";

const categories = [
  { id: 1, name: "hill" }, { id: 2, name: "city" },
  { id: 3, name: "temple" }, { id: 4, name: "beach" }
];

const CategoryFilter = forwardRef((props, ref) => {
  const [places, setPlaces] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [shuffleIndex, setShuffleIndex] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesRes = await axios.get("http://localhost:3000/api/places");
        const statesRes = await axios.get("http://localhost:3000/api/states/all-states");

        setPlaces(placesRes.data.data || []);
        setStatesList(statesRes.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading feed data from server:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (!loading && !showResults && !searchInput && places.length > 0) {
      const interval = setInterval(() => {
        setShuffleIndex((prev) => (prev + 4 >= places.length ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showResults, searchInput, loading, places.length]);


  const filteredData = useMemo(() => {
    return places.filter(p => {
      const searchTerm = searchInput.toLowerCase().trim();
      const placeStateName = p.stateId?.stateName || "";

      if (searchTerm !== "") {
        return p.placeName.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          placeStateName.toLowerCase().includes(searchTerm);
      }
      return (!selectedState || placeStateName === selectedState) &&
        (!selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase());
    });
  }, [selectedState, selectedCategory, searchInput, places]);

  const getCategoryIcon = (cat) => {
    const icons = { hill: <Mountain size={14} />, temple: <Landmark size={14} />, beach: <Palmtree size={14} />, city: <Building2 size={14} /> };
    return icons[cat.toLowerCase()] || <Filter size={14} />;
  };

  const handleReset = () => {
    setSelectedState("");
    setSelectedCategory("");
    setSearchInput("");
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#151d23] flex items-center justify-center text-white text-2xl font-bold font-serif">
        Loading Feed... ✈️
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full px-4 md:px-6 py-12 min-h-screen bg-[#151d23]">

      {/* 1. Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center lg:text-left">Find your best place</h2>

        <div className="flex flex-wrap justify-center items-center gap-3 bg-white/5 p-3 rounded-3xl border border-white/10 backdrop-blur-md w-full lg:w-auto">

          {/* State Dropdown Linked with DB */}
          <select
            value={selectedState}
            onChange={(e) => { setSelectedState(e.target.value); setShowResults(true); setSearchInput(""); }}
            className="bg-transparent text-slate-300 w-30 px-2 py-2 outline-none border-r border-white/10 text-sm md:text-base cursor-pointer"
          >
            <option value="" className="bg-slate-900">State</option>
            {statesList.map(s => (
              <option key={s._id} value={s.stateName} className="bg-slate-900">
                {s.stateName}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setShowResults(true); setSearchInput(""); }}
            className="bg-transparent text-slate-300 px-4 py-2 outline-none text-sm md:text-base cursor-pointer"
          >
            <option value="" className="bg-slate-900">Category</option>
            {categories.map(c => <option key={c.id} value={c.name} className="bg-slate-900 capitalize">{c.name}</option>)}
          </select>

          <button
            onClick={handleReset}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Eye size={18} /> All
          </button>

          <button
            onClick={() => setShowResults(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all w-full md:w-auto flex items-center justify-center gap-2 transform active:scale-95"
          >
            Find now <Plane size={18} />
          </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="max-w-6xl mx-auto mb-10 relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value); setShowResults(true); }}
          placeholder="Search destinations (e.g. Shimla, Beach)..."
          className="w-full pl-14 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-md focus:border-orange-500/50 outline-none transition-all shadow-lg"
        />
        {searchInput && <X onClick={() => setSearchInput("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer transition-colors" size={20} />}
      </div>

      <StateHorizontalList
        activeState={selectedState}
        onStateSelect={(s) => { setSelectedState(s); setShowResults(true); setSearchInput(""); }}
      />

      {/* 3. Cards Grid - Live Mapped */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {(showResults || searchInput ? filteredData : places.slice(shuffleIndex, shuffleIndex + 4)).length > 0 ? (
          (showResults || searchInput ? filteredData : places.slice(shuffleIndex, shuffleIndex + 4)).map((place) => (
            /* Link tags connected to real database schema IDs */
            <Link to={`/place/${place._id}`} key={place._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="group bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-orange-500/40 shadow-xl relative h-[400px] cursor-pointer"
              >
                <img src={place.image} alt={place.placeName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-white flex items-center gap-1.5 border border-white/10">
                  {getCategoryIcon(place.category)} {place.category}
                </div>
                <div className="absolute bottom-6 left-6 pr-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-1">{place.placeName}</h3>
                  <p className="flex items-center text-slate-400 text-sm gap-1">
                    <MapPin size={12} className="text-orange-500" /> {place.stateId?.stateName || "India"}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 px-4 text-center border border-dashed border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <div className="p-4 bg-orange-500/10 rounded-full text-orange-500 mb-2">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">No Results Found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We couldn't find any destinations matching your criteria. Try adjusting your keywords or filters!
            </p>
            <button
              onClick={handleReset}
              className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default CategoryFilter;