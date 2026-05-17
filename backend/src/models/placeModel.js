const mongoose =  require("mongoose")

const placeSchema = new mongoose.Schema({

    placeName:{
        type: String,
        required: [true, "Place name is required"],
        trim: true,
    },

    stateId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: [true, "State refrence is required"],

    },
    category:{
        type: String,
        enum: ["temple", "hill", "beach", "city"],
        required: [true, "Category is required"],
    },
    image: {
        type: String,
        required: [true, "Image URL is required"]
    },

    description: { type: String, required: true },
        
      bestTime: {
      type: String,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },

},{
    timestamps: true,
})

const placeModel = mongoose.model("Place", placeSchema);
module.exports = placeModel;