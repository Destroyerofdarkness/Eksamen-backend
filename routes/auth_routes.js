const router = require("express").Router();
const controller = require("../controllers/auth_controllers");

router.post("/signIn", controller.sign_in_user);

router.post("/signUp", controller.sign_up_user);

router.post("/createKey", controller.createKey);

router.get("/authenticate/:token", controller.authenticate_and_check_user);


module.exports = router;