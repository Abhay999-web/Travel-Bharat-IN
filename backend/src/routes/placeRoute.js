const express = require("express")
const placeController = require("../controllers/placeController")

const placeRouter = express.Router()

/* POST ->> /api/states/:stateId */
placeRouter.post("/state/:stateId", placeController.createPlaceController)

/* GET  /api/places/ */
placeRouter.get("/", placeController.getAllPlaces)

/* GET ->> /api/allstates/state/:stateId */
placeRouter.get("/state/:stateId", placeController.getPlacesByState)

/* GET ->> /api/places/:placeId */
placeRouter.get("/:placeId", placeController.getSinglePlace)


/* Update /api/places/:placeId */
placeRouter.put("/:placeId", placeController.updatePlace)

/* Delete /api/places/:placeId */
placeRouter.delete("/:placeId", placeController.deletePlace)

module.exports = placeRouter