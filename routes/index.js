const router = require("express").Router();
const usersRouters = require("./users.js");
const error = require("./error.js");
const auth = require("../middlewares/auth.js");
const { login, createUser } = require("../controllers/users.js");
const {
    validateSignin,
    validateSignup,
} = require("../middlewares/validations.js");

router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.use("/", usersRouters);
router.use(auth);

router.use("*", error);

module.exports = router;
