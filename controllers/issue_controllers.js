const Issue = require("../models/Issue.js");
const { handleIssueErrors } = require("../handlers/modelErrorsHandlers.js");

const publish_issue = async (req, res) => {
  const { BODY } = req.body;
  console.log(BODY);
  try {
    await Issue.publish(BODY);
    res
      .status(200)
      .json({ success: true, message: "Succesfully published the issue!!" });
  } catch (err) {
    const errors = handleIssueErrors(err);
    console.log(errors);
    res
      .status(400)
      .json({
        errors,
        success: false,
        message: "Unable to publish the issue because of errors!!",
      });
  }
};

const send_out_all_issues = async (req, res) => {
  try {
    const Issues = await Issue.find(
      {
        status: {$ne: "Lukket"}
      }
    );
    res
      .status(200)
      .json({
        Issues,
        success: true,
        message: "Succesfully got all the Issues from the database",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't get all the issues because of Internal Server Error!!",
      });
  }
};

const send_categorize_critical_issues = async (req, res) => {
  const critical = req.params.critical;
  try {
    const Issues = await Issue.find({
      criticality: critical,
    });
    res
      .status(200)
      .json({
        Issues,
        success: true,
        message: "Succesfully got all the Issues from the database",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't get all the categorized issues because of Internal Server Error!!",
      });
  }
};

const update_logg_issue = async (req, res) => {
  const { BODY } = req.body;
  try {
    console.log(BODY);
    await Issue.updateLogg(BODY);
    res
      .status(200)
      .json({
        success: true,
        message: "Succesfully updated the logg for the issue!!",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't update the issue logg because of Internal Server Error!!",
      });
  }
};

const update_criticalLevel_issue = async (req, res) => {
  const { BODY } = req.body;
  try {
    console.log(BODY);
    await Issue.updateCriticality(BODY);
    res
      .status(200)
      .json({
        success: true,
        message: "Succesfully updated the critical level for the issue!!",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't update the issue criticalLevel because of Internal Server Error!!",
      });
  }
};

const update_authorized_issue = async (req, res) => {
  const { BODY } = req.body;
  try {
    console.log(BODY);
    await Issue.updateAuthorized(BODY);
    res
      .status(200)
      .json({
        success: true,
        message: "Succesfully updated the critical level for the issue!!",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't update the issue because of Internal Server Error!!",
      });
  }
};

const close_issue_req = async(req,res)=>{
  const {BODY} = req.body
  try {
    await Issue.closeIssue(BODY);
    res
      .status(200)
      .json({
        success: true,
        message: "Succesfully updated the critical level for the issue!!",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't close the issue because of Internal Server Error!!",
      });
  }
}

const open_issue_req = async(req,res)=>{
  const {BODY} = req.body;
  try {
     await Issue.openIssue(BODY);
    res
      .status(200)
      .json({
        success: true,
        message: "Succesfully updated the critical level for the issue!!",
      });
  } catch (err) {
    console.log(err);
     res
      .status(500)
      .json({
        err,
        success: false,
        message:
          "Couldn't open the issue because of Internal Server Error!!",
      });

  }
}

module.exports = {
  publish_issue,
  send_out_all_issues,
  update_logg_issue,
  update_criticalLevel_issue,
  send_categorize_critical_issues,
  update_authorized_issue,
  close_issue_req,
  open_issue_req
};
