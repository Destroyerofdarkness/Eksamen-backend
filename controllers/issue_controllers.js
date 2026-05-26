const Issue = require("../models/Issue.js")

const publish_issue = async (req,res)=>{
    const {BODY} = req.body;
    try {
        await Issue.publish(BODY);
        res.status(200).json({success:true, message: "Succesfully published the issue!!"});
    } catch (err) {
        console.log(err);
        res.status(400).json({err, success:false, message: "Unable to publish the issue because of errors!!"});
    }
}

module.exports = {
    publish_issue
}