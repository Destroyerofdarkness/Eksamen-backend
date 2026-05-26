const Issue = require("../models/Issue.js")
const {handleIssueErrors} = require("../handlers/modelErrorsHandlers.js")

const publish_issue = async (req,res)=>{
    const {BODY} = req.body;
    console.log(BODY)
    try {
        await Issue.publish(BODY);
        res.status(200).json({success:true, message: "Succesfully published the issue!!"});
    } catch (err) {
       const errors = handleIssueErrors(err)
       console.log(errors)
        res.status(400).json({errors, success:false, message: "Unable to publish the issue because of errors!!"});
    }
}

module.exports = {
    publish_issue
}