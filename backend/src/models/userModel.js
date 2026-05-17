const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required : [true, "Username is required"],
        trim: true

    },
    email:{
        type: String,
        unique: [true],
        required : [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required : [true, "Password is required"],
        minlength: [6,"Password must be at least 6 characters"]

    },
    role:{
        type: String,
        enum: ["admin"],
        default: "admin"
    }

},{
    timestamps: true
});


const userModel = mongoose.model("User", userSchema)

module.exports = userModel;