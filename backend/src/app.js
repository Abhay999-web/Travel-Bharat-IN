const express = require("express")
const cors = require("cors")




const app = express()

app.use(cors({
    origin:  "https://travel-bharat-in-1.onrender.com",
    credentials: true
}))



app.use(express.json())



module.exports = app