const router = require("express").Router();
const controller = require("../controllers/workers_controller");

router.post("/make", controller.make_worker);

router.get("/get", controller.get_workers);

module.exports = router;