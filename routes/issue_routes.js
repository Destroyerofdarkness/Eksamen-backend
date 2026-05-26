const router = require("express").Router();
const controller = require("../controllers/issue_controllers");

router.post("/publish", controller.publish_issue);




module.exports = router;