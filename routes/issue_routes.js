const router = require("express").Router();
const controller = require("../controllers/issue_controllers");

router.post("/publish", controller.publish_issue);

router.get("/get", controller.send_out_all_issues);

router.get("/categorize/:critical", controller.send_categorize_critical_issues)

router.put("/update/logg", controller.update_logg_issue);

router.put("/update/criticality", controller.update_criticalLevel_issue);

router.put("/update/authorized", controller.update_authorized_issue);

router.put("/close", controller.close_issue_req);


module.exports = router;