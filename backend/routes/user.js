const express = require("express");
const zod = require("zod");
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Hostel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
    role : zod.string(),
    gender : zod.string()
});

router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);
    if (!success.success) {
        return res.status(400).json({
            message: "Incorrect input",
            errors: success.error.errors // Send the validation errors to the client
        });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        const userId = newUser._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: "User successfully created",
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


const signinbody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const success = signinbody.safeParse(req.body);
    if (!success.success) {
        return res.status(400).json({
            message: "Invalid Input",
            errors: success.error.errors // Include validation errors if any
        });
    }

    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, findUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: "Signed in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/dashboard", async (req, res) => {
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
            email: owner.email,
            firstName: owner.firstName,
            lastName: owner.lastName,
            _id: owner._id
        }))
    })
});

router.get('/hostel', async (req, res) => {
    try {
        const hostels = await Hostel.find({});
        
        if (hostels.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No hostels found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Hostels retrieved successfully.',
            data: hostels
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});



module.exports = router