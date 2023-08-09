const router = require("express").Router();
const { userFeedback } = require("../controllers/users");

router.post("/feedback", userFeedback);

module.exports = router;
