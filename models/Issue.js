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
    loggText:{
        type: String,
        default: "",
    },
    status:{
        type:String,
        default:"Åpen"
    },
    authorized:{
        type:String,
        default:"Ingen"
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

issueSchema.statics.updateLogg = async(info)=>{
    await Issue.findByIdAndUpdate(info.id, {
        loggText:info.loggText
    })
    return;
}


issueSchema.statics.updateCriticality = async (info)=>{
    await Issue.findByIdAndUpdate(info.issueId, {
        criticality:info.criticality
    })
    return;
}
const Issue = model("Issues",issueSchema);

module.exports = Issue;