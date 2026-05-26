const {Schema, model } = require("mongoose");

const issueSchema = new Schema({
    title:{
        required:[true, "Skriv inn tittel.."],
        type:String,
        unique:true
    },
    description:{
        required:[true, "Skriv inn beskrivelse.."],
        type:String,
        minLength: [100,"Beskrivelsen må være minimum 100 tegn.."]
    },
    criticality:{
        type:String,
        default: "Ubestemt"
    },
    status:{
        type:String,
        default:"Åpen"
    },
    connection:{
        type:String,
        required:true
    }
})

issueSchema.statics.publish = async(info)=>{
    const newIssue = new Issue({
        title:info.title,
        description:info.description,
        connection:info.connection
    })
    await newIssue.save();
    return;
}

const Issue = model("Issues",issueSchema);

module.exports = Issue;