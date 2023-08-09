const router = require("express").Router();
const NotFoundErr = require("../errors/NotFoundErr");

router.all("/", () => {
    throw new NotFoundErr({ message: "Ресурс не найден" });
});

module.exports = router;
