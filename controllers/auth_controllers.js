const { handlerUserErrors } = require("../handlers/modelErrorsHandlers");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const signJWT = (id)=>{
    return jwt.sign({id}, process.env.secret, {
        expiresIn: 10 * 60 * 60
    });
}


const sign_in_user = async(req,res)=>{
    const {BODY} = req.body
    try {
        console.log(BODY)
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

module.exports = {sign_in_user, sign_up_user};