const mongoose=require("mongoose")

const locationSchema=mongoose.Schema({
    location:{
        type:String
    },
    temp:{
        type:String
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
})

module.exports=mongoose.model("locations",locationSchema)