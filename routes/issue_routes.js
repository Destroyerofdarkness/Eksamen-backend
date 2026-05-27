const router = require("express").Router();
const controller = require("../controllers/issue_controllers");

router.post("/publish", controller.publish_issue);

router.get("/get", controller.send_out_all_issues);

router.put("/update/logg", controller.update_logg_issue)


module.exports = router;