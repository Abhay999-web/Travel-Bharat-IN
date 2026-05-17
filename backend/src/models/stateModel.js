const mongoose = require("mongoose")


const stateSchema = new mongoose.Schema({

    stateName: {
    type: String,
    required: [true, "State name is required"],
    unique: true,
    trim: true,

    },

    stateImageUrl: {
        type: String,
        required: [true, "State image is required"]
    },
    
    stateDesc: {
        type: String,
        required: [true, "State description is required"]

    },
    region: {
        type: String,
        required: [true, "Region is required"],
        
    },



},{
    timestamps: true
})

const stateModel = mongoose.model("State", stateSchema)

module.exports = stateModel;