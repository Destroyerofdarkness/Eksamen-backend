const {Schema, model} = require("mongoose");

const workerSchema = new Schema({
    name:{
        type:String,
        required:true
    }
})

const Worker = model("workers", workerSchema)

module.exports = Worker