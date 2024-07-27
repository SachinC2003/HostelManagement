const { error } = require("console")
const express = require("express")
const zod = require("zod")
const router = express.Router()
const { user, owner } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { verifyToken } = require("../middleware")

router.get("/signin", (req, res) => {
    return {
        msg: "owner "
    }
})

module.exports = router;