const {Schema, model } = require("mongoose");
const crypto = require("crypto");


const keySchema = new Schema({
    key:{
        type:String,
        unique:true,
        required:true
    }
})

keySchema.statics.make = async()=>{
    const key = await crypto.randomBytes(32).toString("hex");
    console.log(key);
    const hash = await crypto.createHash("sha256").update(key).digest("hex");
    const newKey = new Key({
        key:hash
    })
     
    await newKey.save();

    return;
}


const Key = model("api_keys",keySchema);


module.exports = Key