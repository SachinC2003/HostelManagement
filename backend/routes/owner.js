const express = require("express")
const zod = require("zod")
const router = express.Router()
const bcrypt = require('bcrypt');
const { User, Owner, Hostel } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/jwt");
const authmiddleware = require("../middlewares/authmiddleware");
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
/*------------------------------------------------------------------*/
const upload = multer({ storage: multer.memoryStorage() });
/*------------------------------------------------------------------------------*/


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
        const existingOwner = await Owner.findOne({ email: req.body.email });
        if (existingOwner) {
            return res.status(409).json({ message: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newOwner = await Owner.create({
            ...req.body,
            password: hashedPassword
        });
        console.log("New owner created:", newOwner);
        const ownerId = newOwner._id;
        const token = jwt.sign({ ownerId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            userId: newOwner._id,
            role: newOwner.role, // Ensure this line is present
            message: "Owner successfully created",
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
        const findOwner = await Owner.findOne({ email: req.body.email });
        if (!findOwner) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, findOwner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: findOwner._id, role: findOwner.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: findOwner._id, role: findOwner.role, gender: findOwner.gender });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



/*router.post("/uploderoom", async (req, res) => {
    const { owner, hostelName, area, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy } = req.body;
    console.log("Received data:", req.body);

    if (!owner || !hostelName || !area || !rooms || !sharing || !totalStudents || !price || !contact || !hotWater || !wifi || !ventilation || !drinkingWater || !vacancy) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: All fields are required.',
            missingFields: Object.entries({ owner, hostelName, area, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy })
                .filter(([key, value]) => !value)
                .map(([key]) => key)
        });
    }

    try {
        const hostel = await Hostel.create({
            owner,
            hostelName,
            area,
            rooms,
            sharing,
            totalStudents,
            price,
            contact,
            hotWater,
            wifi,
            ventilation,
            drinkingWater,
            vacancy
        });

        res.status(201).json({
            status: 201,
            message: 'Hostel created successfully',
            data: hostel
        });
    } catch (error) {
        console.error("Error creating hostel:", error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : undefined
        });
    }
});*/

/*------------------------------------------------------------------------------------------------------------ */
// In your routes/owner.js
router.post("/uploderoom", upload.array('images', 5), async (req, res) => {
    const { owner, hostelName, area,address, gender, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy } = req.body;

    // Check if at least 2 images were uploaded
    if (!req.files || req.files.length < 2) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: At least 2 image files are required.'
        });
    }

    if (!owner || !hostelName || !area || !address|| !gender || !rooms || !sharing || !totalStudents || !price || !contact || !hotWater || !wifi || !ventilation || !drinkingWater || !vacancy) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: All fields are required.',
            missingFields: Object.entries({ owner, hostelName, area, gender, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy })
                .filter(([key, value]) => !value)
                .map(([key]) => key)
        });
    }

    try {
        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "hostels" }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        const hostel = await Hostel.create({
            owner,
            hostelName,
            area,
            address,
            gender,
            rooms,
            sharing,
            totalStudents,
            price,
            contact,
            hotWater,
            wifi,
            ventilation,
            drinkingWater,
            vacancy,
            imageUrls
        });

        res.status(201).json({
            status: 201,
            message: 'Hostel created successfully',
            data: hostel
        });
    } catch (error) {
        console.error("Error creating hostel:", error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : undefined
        });
    }
});

/*---------------------------------------------------------------------------------------------------------------*/


router.get("/myhostel", authmiddleware, async(req, res) => {
    try {
      const ownerId = req.headers.id;
      const hostels = await Hostel.find({owner: ownerId});
  
      if (!hostels.length) {
        return res.status(200).json({ message: 'No hostels found for this owner.' });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Hostels retrieved successfully.',
        data: hostels  // Changed from 'hostels' to 'data'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  });

  router.get("/hostel/:id", async (req, res) => {
    try {
      const hostelId = req.params.id;
      console.log("hostelid",hostelId);
      const hostel = await Hostel.findById(hostelId);
      if (!hostel) {
        return res.status(404).json({ status: 404, message: 'Hostel with this Id not present' });
      }
  
      res.status(200).json({ status: 200, data: hostel });
    } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  });
  

router.put("/update/:id", authmiddleware, async (req, res) => {
    try {
        const hostelId = req.params.id;
        let updatedData = req.body;

        // Log the incoming data
        console.log("Updated Data:", updatedData);

        // Map frontend fields to schema fields if needed
        updatedData = {
            area: updatedData.area,
            sharing: parseInt(updatedData.sharing, 10),
            totalStudents: parseInt(updatedData.totalStudents, 10),
            price: parseInt(updatedData.price, 10),
            contact: parseInt(updatedData.contact, 10),
            hotWater: updatedData.hotWater,
            wifi: updatedData.wifi,
            ventilation: updatedData.ventilation,
            drinkingWater: updatedData.drinkingWater,
            vacancy: updatedData.vacancy,
            hostelName: updatedData.name, // Map name to hostelName
            rooms: parseInt(updatedData.room, 10) // Assuming 'room' should be mapped to 'rooms'
        };

        // Log the converted data
        console.log("Converted Data:", updatedData);

        const hostel = await Hostel.findById(hostelId);

        if (!hostel) {
            return res.status(404).json({ status: 404, message: 'Hostel with this Id not present' });
        }

        const updatedHostel = await Hostel.findByIdAndUpdate(hostelId, updatedData, { new: true });

        // Log the updated hostel
        console.log("Updated Hostel:", updatedHostel);

        if (!updatedHostel) {
            return res.status(400).json({ status: 400, message: 'Failed to update hostel' });
        }

        res.status(200).json({
            status: 200,
            message: 'Hostel info updated successfully.',
            data: updatedHostel
        });
    } catch (error) {
        console.error("Error updating hostel:", error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});


module.exports = router;