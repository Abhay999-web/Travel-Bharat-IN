import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Mountain, Calendar } from "lucide-react";
import axios from "axios";

const PlaceDetail = () => {
    const { id } = useParams(); // URL se dynamic _id nikalega
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/places/${id}`);


                if (res.data && res.data.data) {
                    setPlace(res.data.data);
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
            <div className="w-full min-h-screen bg-[#151d23] flex items-center justify-center text-white text-2xl font-serif">
                Loading Destination Details... ✈️
            </div>
        );
    }

    if (!place) {
        return (
            <div className="w-full min-h-screen bg-[#151d23] flex flex-col items-center justify-center text-white gap-4">
                <h2 className="text-2xl font-bold">Destination Not Found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                    <ArrowLeft size={18} /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#151d23] text-white pb-12">
            {/* Hero Banner Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <img
                    src={place.image}
                    alt={place.placeName || place.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151d23] via-transparent to-black/40" />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/10 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">

                    {/* Category Tag */}
                    <span className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs uppercase tracking-wider font-bold px-4 py-1.5 rounded-full mb-4">
                        <Mountain size={14} /> {place.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">
                        {place.placeName}
                    </h1>

                    {/* State */}
                    <div className="flex items-center gap-2 text-slate-400 text-md md:text-lg mb-6 border-b border-white/5 pb-6">
                        <MapPin size={18} className="text-orange-500" />
                        <span className="font-medium text-slate-300">
                            {place.stateId?.stateName || "India"}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-md leading-relaxed font-light">
                        {place.description}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default PlaceDetail;