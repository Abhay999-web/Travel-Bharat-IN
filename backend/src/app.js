const express = require("express")
const cors = require("cors")




const app = express()

app.use(cors({
    origin:  "https://travel-bharat-in-1.onrender.com",
    credentials: true
}))


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Travel Bharat API Server is running successfully.",
        timestamp: new Date().toISOString(),
        environment: "production"
    });
});



app.use(express.json())



module.exports = app