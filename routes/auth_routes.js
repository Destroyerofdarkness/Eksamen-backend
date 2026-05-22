const router = require("express").Router();
const controller = require("../controllers/auth_controllers");

router.post("/signIn", controller.sign_in_user);

router.post("/signUp", controller.sign_up_user);


module.exports = router;