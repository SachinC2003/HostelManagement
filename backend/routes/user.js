const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);
    if (!success.success) {
        return res.status(403).json({
            message: "Incorrect input"
        });
    }
    const existingUser = await User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    const newUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User successfully created",
        token: token
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

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


    // --*******************************--


    global.mainUser = findUser;


    // --*******************************--

    if (!findUser) {
        return res.status(400).json({
            msg: "Invalid Credentials"
        })
    }
    if (findUser) {
        const token = jwt.sign({
            userId: findUser._id
        }, JWT_SECRET);
        res.json({
            token
        })
        return;
    }

})

const OwnerSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmE0ZTA4NDg4NTZlYzcyNjllMDFiODQiLCJpYXQiOjE3MjIwODU5ODN9.DD7gmA7O - sibM5cMf3iEGa0Ew18vKQrN_sjfrEKunOA
router.post("/apply", async (req, res) => {
    const success = OwnerSchema.safeParse(req.body);
    const createOwner = Owner.create(mainUser);
})

router.post("/dashboard", async (req, res) => {
    const filter = req.query.filter || "";

    const owner = await Owner.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: owner.map(owner => ({
            username: owner.username,
            firstName: owner.firstName,
            lastName: owner.lastName,
            _id: owner._id
        }))
    })
})
module.exports = router