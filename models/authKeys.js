const {Schema, model} = require("mongoose");
const crypto = require("crypto")

const authKeySchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    authority:{
        required:true,
        type:String
    }
})

authKeySchema.statics.makeAdmin = async()=>{
    const key = Math.floor(Math.random()* (1) * 999999);
    console.log(key);
    const hash = crypto.createHash("sha256").update(key.toString()).digest("hex");
    console.log(hash)
    const newKey = new authKeys({
        key:hash,
        authority:"admin"
    })
    await newKey.save();
    return key;
}

authKeySchema.statics.makeDriver = async()=>{
    const key = Math.floor(Math.random()* (1) * 999999);
    console.log(key);
    const hash = crypto.createHash("sha256").update(key.toString()).digest("hex")
    const newKey = new authKeys({
        key:hash,
        authority:"driftspersonell"
    })
    await newKey.save();
    return key;
}

authKeySchema.statics.makeIT = async()=>{
    const key = Math.floor(Math.random()* (1) * 999999);
    console.log(key);
    const hash = crypto.createHash("sha256").update(key.toString()).digest("hex");
    console.log(hash)
    const newKey = new authKeys({
        key:hash,
        authority:"IT"
    })
    await newKey.save();
    return key;
}

const authKeys = model("authKeys", authKeySchema);

module.exports = authKeys;