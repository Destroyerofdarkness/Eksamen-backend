const Key = require("../models/Key");
const crypto = require("crypto");

const authorize = async (req,res, next)=>{
    const key = req.headers.authorization;
    if(key){
        const hash = await crypto.createHash("sha256").update(key).digest("hex");
        const foundKey = await Key.findOne({key:hash});
        if(foundKey){
            next()
        }else{
            res.status(401).json({success:false, message: "Unauthorized access!! Provided API KEY doesn't seem right"});
        }
    }else{
        res.status(403).json({success:false, message: "Forbidden access!! No API KEY provided!!"});
    }
}

module.exports = authorize;