

const { error } = require("console")
const express = require("express")
const zod = require("zod")
const router = express.Router()
const { User, Owner } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { verifyToken } = require("../middleware")

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(403).json({
            message: "incorrect Input"
        })
    }
    const exisingUser = await User.findOne({
        username: req.body.username
    })
    if (exisingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const CreateUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        password: req.body.password,
        lastName: req.body.lastName
    })

    const userId = CreateUser._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "LastUser",
        token: token
    })
})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req, res) => {
    const success = signinbody.safeParse(req.body);
    if (!success) {
        return res.status(403).json({
            msg: "Invalid Input"
        })
    }
    const findUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (findUser) {
        const token = jwt.sign({
            userId: findUser._id
        }, JWT_SECRET);
        res.json({
            token
        })
    }
    return;
})

module.exports = router