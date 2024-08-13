const express = require("express");
const zod = require("zod");
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Hostel, Owner } = require("../db");
const jwt = require("jsonwebtoken");
const authmiddleware = require('../middlewares/authmiddleware');

router.get('/me', authmiddleware, async (req, res) => {
    try {
        console.log(req.headers.id)
      const user = await User.findById(req.headers.id).select('-password'); 
      const owner = await Owner.findById(req.headers.id).select('-password');
      if (!user && !owner) {
        return res.status(404).send({ message: 'User not found' });
      }
      if(user)
      {
        res.status(200).send(user);
      }else{
        res.status(200).send(owner);
      }
      
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

router.post("/createnotification", authmiddleware, async(req, res)=>{
    const {userId, massage} = req.body
    try{
        const newNotification = await Notification.create({userId, massage});
        await newNotification.save();
        res.status(201).json(newNotification)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.get("/notification/:id", authmiddleware, async(req, res)=>{
    const userId = req.params.id;
    try{
        const notifications = await Notification.find({userId})
        res.status(201).json(notifications)
    }catch(error){
        res.status(500).json({error : error.massage})
    }
})

const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string().max(50, "First name cannot be longer than 50 characters"),
    lastName: zod.string().max(50, "Last name cannot be longer than 50 characters"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    role: zod.string(),
    gender: zod.string()
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
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(201).json({
            userId: newUser._id, role: newUser.role, gender: newUser.gender,
            message: "User successfully created",
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



const signinbody = zod.object({
    role: zod.string(),
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

        const token = jwt.sign({ userId: findUser._id, role: findUser.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ token, userId: findUser._id, role: findUser.role, gender: findUser.gender });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/hostel', authmiddleware, async (req, res) => {
    const id = req.headers.id;
    const { price, sharing } = req.query;
    console.log("Query Parameters:", { price, sharing });

    let query = {};

    try {
        const user = await User.findById(id);
        let hostels;

        if (user) {
            query.gender = user.gender;
            if (price) {
                query.price = { $lte: Number(price) }; // Convert price to number
            }
            if (sharing) {
                query.sharing = { $lte: Number(sharing) }; // Convert sharing to number
            }
            console.log("Constructed Query for User:", query);
            hostels = await Hostel.find(query);
        } else {
            const owner = await Owner.findById(id);
            if (owner) {
                if (price) {
                    query.price = { $lte: Number(price) }; // Convert price to number
                }
                if (sharing) {
                    query.sharing = { $lte: Number(sharing) }; // Convert sharing to number
                }
                console.log("Constructed Query for Owner:", query);
                hostels = await Hostel.find(query);
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found.'
                });
            }
        }

        if (hostels.length === 0) {
            return res.status(201).json({
                status: 201,
                message: 'No hostels found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Hostels retrieved successfully.',
            data: hostels
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});





module.exports = router