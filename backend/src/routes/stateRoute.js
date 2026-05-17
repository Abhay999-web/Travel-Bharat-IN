const express = require("express")
const stateController = require("../controllers/stateController")

const stateRouter = express.Router()
/* POST -> /api/states/create-state */
stateRouter.post("/create-state", stateController.createStateController)

/* GET -> /api/states/allstates*/
stateRouter.get("/all-states", stateController.getAllStatesController)





module.exports = stateRouter