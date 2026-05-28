const {Schema, model} = require("mongoose");
const argon2 = require("argon2");
const authKey = require("./authKeys");
const crypto = require("crypto");

const userSchema = new Schema({
    username:{
        type:String,
        required:[true, "Brukernavnet må bli skrevet inn.."],
        unique:true
    },
    passwd:{
        type:String,
        required:[true, "Passordet må bli skrevet inn.."],
        minLength: [6, "Passordet må lengre enn 5 tegn.."]
    },
    authorization:{
        type:String,
        required:true
    }
})


userSchema.pre("save",async function(){
    this.passwd = await argon2.hash(this.passwd);
})

userSchema.statics.signIn = async(info)=>{
    const user = await User.findOne({username:info.username});
    if(user){
    if(await argon2.verify(user.passwd, info.passwd)){
        return user._id;
    }else{
        throw Error("Feil Passord..");
    }
}
throw Error("Oppgitt bruker eksisterer ikke..");
}


userSchema.statics.signUp = async(info)=>{
    if(info.passwd === info.conPass){ 
    const hash = crypto.createHash("sha256").update(info.authKey).digest("hex");
    const foundKey = await authKey.findOne({key:hash});
    if(foundKey){
    const newUser = new User({
        username:info.username,
        passwd:info.passwd,
        authorization:foundKey.authority
    });
    await newUser.save();
    await authKey.findOneAndDelete({key:hash});
    return newUser._id;
    }else{
        throw Error("Nøkkelen er ikke aktiv..")
    }
    }else{
        throw Error("Passordet er ikke likt som det gjentatte passordet..")
    }
}


const User = model("users", userSchema);

module.exports = User