const { handlerUserErrors } = require("../handlers/modelErrorsHandlers");
const User = require("../models/User");
const authKeys = require("../models/authKeys");
const jwt = require("jsonwebtoken");

const signJWT = (id)=>{
    return jwt.sign({id}, process.env.secret, {
        expiresIn: 10 * 60 * 60
    });
}


const sign_in_user = async(req,res)=>{
    const {BODY} = req.body
    try {
        const userID = await User.signIn(BODY);
        const token = signJWT(userID);
        res.status(200).json({token, success:true, message: "Succesfully signed in the User!!"});
    } catch (err) {
        const errors = handlerUserErrors(err);
        console.log(errors);
        res.status(400).json({errors,success:false, message:"Unable to sign in user because of errors!!"})
    }
}

const sign_up_user = async(req,res)=>{
   const {BODY} = req.body;
    try {
        const userID = await User.signUp(BODY);
        const token = signJWT(userID);
        res.status(200).json({token, success:true, message: "Succesfully signed up the User!!"});
    } catch (err) {
        console.log(err);
        const errors = handlerUserErrors(err);
        res.status(400).json({errors, success:false, message: "Unable to sign up the user because of errors!!"})
    }
}

const createKey = async(req,res)=>{
    const {authority} = req.body;
    let key;
    switch(authority){
        case "admin":
            key = await authKeys.makeAdmin();
            res.status(200).json({key, success:true, message: "Succesfully made the key for admin!!"});
            break;
        case "IT":
            key = await authKeys.makeIT();
            res.status(200).json({key, success:true, message: "Succesfully made the key for IT!!"});
            break;
        case "driftspersonell":
            key = await authKeys.makeDriver();
            res.status(200).json({key, success:true, message: "Succesfully made the key for driver!!"});
            break;
    }
    try {
        
    } catch (err) {
        res.status(500).json({err:err.message, success:false, message: "Unable to create key because of errors"});
    }
}

const authenticate_and_check_user = async(req,res)=>{
    const token = req.params.token;
    try {
        jwt.verify(token, process.env.secret, async(err, decodedToken)=>{
            if(err){
                res.status(400).json({user:null,success:false, message:"Couldn't authenticate user because of invalid signature!!"});
            }else{
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.status(200).json({user, success:true, message: "Succesfully authenticated the user via the decoded token"});
            }
        })
    } catch (err) {
        res.status(400).json({err,success:false, message: "Couldn't authenticate or check user because of errors!!"})
    }
}

module.exports = {sign_in_user, sign_up_user, authenticate_and_check_user, createKey};