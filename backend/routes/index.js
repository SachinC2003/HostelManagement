const express = require("express");
const userRouter = require("./user");
const ownerRouter = require("./owner");

const router = express.Router();

router.use("/user", userRouter);
router.use("/owner", ownerRouter);

module.exports = router;
