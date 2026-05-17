const stateModel = require("../models/stateModel")

/* State controller */
async function createStateController(req,res){

    try{
        const {stateName, stateImageUrl, stateDesc, region} = req.body
        
        /* Checking validation =>>> */

        if(!stateName || !stateImageUrl || !stateDesc || !region){
            return res.status(400).json({
                message: "All fields are required"
            })
        
     }
     /* Check existing state=>> */
     const existingState = await stateModel.findOne({stateName})

     if(existingState){
    
    return res.status(400).json({
        message: "State is already exists"
    })
   }
   /* Create new state=>>> */
   const newState = await stateModel.create({
    stateName,
    stateImageUrl,
    stateDesc,
    region
   })

   /* Success response=>>>*/
    res.status(201).json({
        message: "state created successfully",
        data: newState
    })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        })
        
    }
}

/*all places  */
async function getAllStatesController(req,res){
    try{
        
        const states = await stateModel.find(); //fetch all the state from DB
        
        if(!states|| states.length === 0 ){
            return res.status(404).json({
                message: "No states found"
            })

        }

        res.status(200).json({
            message: "State fetched successfully",
            total: states.length, //for total states
            data: states  //actual states(data) show karega 
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal Server Error"
        })
        

    }
}

module.exports = {createStateController, getAllStatesController}