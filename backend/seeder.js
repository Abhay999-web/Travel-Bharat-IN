require("dotenv").config();
const mongoose = require("mongoose");
const stateModel = require("./src/models/stateModel");
const placeModel = require("./src/models/placeModel");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Seeder: Connected to Database..."))
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

const statesData = [
    { name: "Uttarakhand", region: "North" },
    { name: "Himachal Pradesh", region: "North" },
    { name: "Goa", region: "West" },
    { name: "Rajasthan", region: "West" },
    { name: "Kerala", region: "South" },
    { name: "Uttar Pradesh", region: "North" },
    { name: "Maharashtra", region: "West" },
    { name: "Tamil Nadu", region: "South" },
    { name: "Punjab", region: "North" }
];

const placesData = [
    { 
        name: "Nainital", 
        state: "Uttarakhand", 
        category: "hill", 
        description: "Nainital is a beautiful hill station nestled in the Kumaon foothills of the Himalayas. Known for its pear-shaped lake, surrounded by mountains on three sides, Nainital offers breathtaking views, pleasant weather, and a serene atmosphere perfect for nature lovers and adventure seekers alike." 
    },
    { 
        name: "Mussoorie", 
        state: "Uttarakhand", 
        category: "hill", 
        description: "Known as the Queen of the Hills, Mussoorie is a charming hill station with colonial-era architecture, scenic waterfalls, and panoramic views of the Shivalik ranges and Doon Valley." 
    },
    { 
        name: "Baga Beach", 
        state: "Goa", 
        category: "beach", 
        description: "Famous for its vibrant nightlife, thrilling water sports, and beachside seafood shacks, Baga Beach is one of North Goa's most popular destinations for party lovers." 
    },
    { 
        name: "Anjuna Beach", 
        state: "Goa", 
        category: "beach", 
        description: "Famous for its unique rock formations, stunning sunsets, and the iconic weekly flea market, Anjuna Beach offers a laid-back and artistic hippie vibe." 
    },
    { 
        name: "Shimla", 
        state: "Himachal Pradesh", 
        category: "hill", 
        description: "The former summer capital of British India, Shimla charms visitors with its colonial architecture, bustling Mall Road, and panoramic views of snow-covered Himalayan peaks." 
    },
    { 
        name: "Manali", 
        state: "Himachal Pradesh", 
        category: "hill", 
        description: "Manali is a high-altitude Himalayan resort town known for its snow-capped mountains, adventure activities, and the famous Solang Valley. It is a absolute paradise for trekkers." 
    },
    { 
        name: "Jaipur", 
        state: "Rajasthan", 
        category: "city", 
        description: "The Pink City of India, Jaipur is famous for its grand palaces, imposing forts, and vibrant traditional bazaars. Hawa Mahal and Amber Fort are iconic landmarks here." 
    },
    { 
        name: "Udaipur", 
        state: "Rajasthan", 
        category: "city", 
        description: "Often called the Venice of the East, Udaipur is known for its beautiful lakes, grand heritage palaces, and romantic ambiance. Lake Pichola makes it incredibly picturesque." 
    },
    { 
        name: "Munnar", 
        state: "Kerala", 
        category: "hill", 
        description: "Munnar is a stunning hill station known for its rolling green tea plantations, misty mountain peaks, winding roads, and cool climate, making it a perfect nature retreat." 
    },
    { 
        name: "Alleppey", 
        state: "Kerala", 
        category: "beach", 
        description: "Alleppey (Alappuzha) is the gateway to Kerala's world-famous backwaters. Renowned for its unique houseboat cruises, serene lagoons, and lush coconut-fringed waterways." 
    },
    { 
        name: "Wayanad", 
        state: "Kerala", 
        category: "hill", 
        description: "Wayanad is a lush green district in Kerala known for its rich wildlife sanctuaries, ancient caves, cascading waterfalls, and spice plantations nestled in the Western Ghats." 
    },
    { 
        name: "Varkala", 
        state: "Kerala", 
        category: "beach", 
        description: "Varkala is a coastal town unique for its stunning red cliffs adjacent to the Arabian Sea. It features the beautiful Papanasam Beach and unique cliff-side cafes." 
    },
    { 
        name: "Varanasi", 
        state: "Uttar Pradesh", 
        category: "temple", 
        description: "The spiritual heart of India, Varanasi is one of the world's oldest continually inhabited cities. It is famous for its sacred Ganga Ghats, ancient temples, and mystical evening Aarti." 
    },
    { 
        name: "Agra", 
        state: "Uttar Pradesh", 
        category: "city", 
        description: "Home to the world-famous Taj Mahal, one of the Seven Wonders of the World. Agra showcases the pinnacle of Mughal architecture with its grand forts and historical monuments." 
    },
    { 
        name: "Mumbai", 
        state: "Maharashtra", 
        category: "city", 
        description: "The City of Dreams, Mumbai is India's financial hub. Home to iconic spots like Marine Drive, Gateway of India, and a bustling, fast-paced cosmopolitan lifestyle." 
    },
    { 
        name: "Madurai", 
        state: "Tamil Nadu", 
        category: "temple", 
        description: "Madurai is an ancient temple city famous for the magnificent Meenakshi Amman Temple, featuring towering intricately-carved gopurams that attract travelers globally." 
    },
    { 
        name: "Amritsar", 
        state: "Punjab", 
        category: "temple", 
        description: "The spiritual center of Sikhism, Amritsar is famous for the breathtaking Golden Temple. It is equally renowned for its patriotic Wagah Border ceremony and delicious Punjabi food." 
    },
    { 
        name: "Chandigarh", 
        state: "Punjab", 
        category: "city", 
        description: "India's first planned city, known as 'The City Beautiful'. Designed by Le Corbusier, it is famous for its architecture, clean layout, urban greenery, and the unique Rock Garden." 
    }
];

async function importData() {
    try {
        await stateModel.deleteMany();
        await placeModel.deleteMany();
        console.log("Old data cleared!");

        // 2. States Insert 
        const createdStates = [];
        for (let st of statesData) {
            const imageName = st.name.toLowerCase().replace(/\s+/g, '-');
            const newState = await stateModel.create({
                stateName: st.name,
                stateDesc: `${st.name} is a beautiful tourist destination in India.`,
                region: st.region,
                stateImageUrl: `https://ik.imagekit.io/aps999/Explore-Bharat/${imageName === 'uttarakhand' ? 'nanital' : imageName === 'goa' ? 'baga-beach' : imageName}.jpg`
            });
            createdStates.push(newState);
        }
        console.log(`${createdStates.length} States inserted successfully!`);

        // 3. Places Insert with Descriptions
        let placesCount = 0;
        for (let pl of placesData) {
            const matchedState = createdStates.find(s => s.stateName === pl.state);
            
            if (matchedState) {
                let imgFileName = pl.name.toLowerCase().replace(/\s+/g, '-');
                
                // Exact matching to match your folder structure screenshot
                if (imgFileName === 'nainital') imgFileName = 'nanital'; 
                if (imgFileName === 'anjuna-beach') imgFileName = 'goa-arjuna-beach';
                if (imgFileName === 'manali') imgFileName = 'manali'; // Safeguard

                await placeModel.create({
                    placeName: pl.name,
                    stateId: matchedState._id, 
                    category: pl.category,
                    image: `https://ik.imagekit.io/aps999/Explore-Bharat/${imgFileName}.jpg`,
                    description: pl.description, // 🔥 DESCRIPTION DUMP LOCKED FOR MONGODB
                    location: `${pl.name}, ${pl.state}`,
                    bestTime: "October to March",
                    rating: 5
                });
                placesCount++;
            }
        }
        console.log(`${placesCount} Places inserted, described, and linked successfully!`);
        process.exit();

    } catch (error) {
        console.error("Error with data import:", error);
        process.exit(1);
    }
}

importData();