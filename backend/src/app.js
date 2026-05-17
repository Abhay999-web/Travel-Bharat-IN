const express = require("express")
const cors = require("cors")




const app = express()

app.use(cors({
    origin:  "http://localhost:5173",
    credentials: true
}))



app.use(express.json())



module.exports = app