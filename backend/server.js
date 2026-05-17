require("dotenv").config()
const app = require("./src/app")
const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")
const stateRouter = require("./src/routes/stateRoute")
const placeRouter = require("./src/routes/placeRoute")


connectToDb()

app.use("/api/states", stateRouter) 

app.use("/api/places", placeRouter) 




app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
} )