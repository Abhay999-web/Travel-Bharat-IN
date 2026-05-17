const placeModel = require("../models/placeModel")
const stateModel = require("../models/stateModel")


/* Creating place for admin */
async function createPlaceController(req, res) {

    try {

        const { placeName, category, image, bestTime, location, rating } = req.body
        const stateId = req.params.stateId

        if (!placeName || !stateId || !category || !location) {
            return res.status(400).json({
                message: "All field required"
            })
        }

        const existingStateId = await stateModel.findById(stateId)
        if (!existingStateId) {
            return res.status(404).json({
                message: "No state found"
            })
        }

        const existingPlace = await placeModel.findOne({ placeName, stateId })
        if (existingPlace) {
            return res.status(400).json({
                message: "Place already exists in this state"
            })
        }

        const newPlace = await placeModel.create({
            placeName,
            stateId,
            category,
            image: image || [],
            bestTime,
            location,
            rating: rating || 4
        })
        res.status(201).json({
            message: "Place created Successfully",
            data: newPlace,
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

/* Places by state for user */
async function getPlacesByState(req, res) {
    try {
        const stateId = req.params.stateId

        const places = await placeModel.find({ stateId }).populate("stateId")
        if (!places || places.length === 0) {
            return res.status(404).json({
                message: "No places found for this state"
            })
        }
        res.status(200).json({
            message: "Places fetched successfully",
            total: places.length,
            data: places,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })



    }
}
/* Single place for user*/
async function getSinglePlace(req, res) {
    try {
        const placeId = req.params.placeId;
        
       
        const singlePlace = await placeModel.findById(placeId).populate("stateId");

        if (!singlePlace) {
            return res.status(404).json({
                message: "Place does not exist"
            });
        }

        res.status(200).json({
            message: "Place found successfully",
            data: singlePlace 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

/* Get all places */
async function getAllPlaces(req, res){
    try{
        const places = await placeModel.find().populate("stateId")

        res.status(200).json({
            message: "All places fetched",
            total: places.length,
            data: places
        })

    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

/* Update place (admin) */

async function updatePlace(req, res) {
    try {

        const { placeId } = req.params;
        const updatePlace = await placeModel.findByIdAndUpdate(placeId, req.body, { new: true })

        if (!updatePlace)
            return res.status(404).json({
                message: "Place Not Found"
            })
        res.status(200).json({
            message: "Place Updated Successfully",
            data: updatePlace
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

/* Delete place (admin) */
async function deletePlace(req, res) {
    try {

        const {placeId} = req.params;
        const deletePlace = await placeModel.findByIdAndDelete(placeId)
        if(!deletePlace){
            return res.status(404).json({
                message: "Place not found"
            })
        }

        res.status(200).json({
            message: "Place deleted successfully",
            
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

module.exports = {
    createPlaceController,
    getPlacesByState,
    getSinglePlace,
    getAllPlaces,
    updatePlace,
    deletePlace
}