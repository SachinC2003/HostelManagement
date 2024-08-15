const express = require("express")
const zod = require("zod")
const router = express.Router()
const bcrypt = require('bcrypt');
const { User, Owner, Hostel, Feedback} = require("../db")
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
        const token = jwt.sign({ ownerId }, process.env.JWT_SECRET, { expiresIn: '10h' });

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

        const token = jwt.sign({ userId: findOwner._id, role: findOwner.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ token, userId: findOwner._id, role: findOwner.role, gender: findOwner.gender });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/feedback', async (req, res) => {
    try {
      const { rating } = req.body;
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
  
      const feedback = await Feedback.findOne({});
      if (feedback) {
        const totalRatings = feedback.totalRatings + 1;
        const averageRating = ((feedback.averageRating * feedback.totalRatings) + rating) / totalRatings;
  
        feedback.averageRating = averageRating;
        feedback.totalRatings = totalRatings;
        await feedback.save();
  
        return res.status(200).json({ message: 'Feedback updated successfully' });
      } else {
        // If no feedback document exists, create one
        const newFeedback = new Feedback({
          averageRating: rating,
          totalRatings: 1
        });
        await newFeedback.save();
        return res.status(200).json({ message: 'Feedback created successfully' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

// In your routes/owner.js
router.post("/uploderoom", authmiddleware, upload.array('images', 5), async (req, res) => {
    const {hostelName, area, address, gender, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy } = req.body;
    const ownerId = req.headers.id;
    
    // Check if at least 2 images were uploaded
    if (!req.files || req.files.length < 2) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: At least 2 image files are required.'
        });
    }

    // Only keep the first 2 images
    const filesToUpload = req.files.slice(0, 2);

    if (!ownerId || !hostelName || !area || !address || !gender || !rooms || !sharing || !totalStudents || !price || !contact || !hotWater || !wifi || !ventilation || !drinkingWater || !vacancy) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: All fields are required.',
            missingFields: Object.entries({ownerId, hostelName, area, gender, rooms, sharing, totalStudents, price, contact, hotWater, wifi, ventilation, drinkingWater, vacancy })
                .filter(([key, value]) => !value)
                .map(([key]) => key)
        });
    }

    try {
        // Upload images to Cloudinary
        const uploadPromises = filesToUpload.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "hostels" }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        const hostel = await Hostel.create({
            owner: ownerId,
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
  

  router.put("/update/:id", authmiddleware, upload.array('images'), async (req, res) => {
    try {
        const hostelId = req.params.id;
        console.log("Updating hostel with ID:", hostelId);

        console.log("req.body:", req.body);
        console.log("req.files:", req.files);

        let formData;
        try {
            formData = req.body.formData ? JSON.parse(req.body.formData) : req.body;
        } catch (error) {
            console.error("Error parsing formData:", error);
            formData = req.body;
        }

        console.log("Parsed formData:", formData);

        const files = req.files || [];
        
        // Upload new images to Cloudinary
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "hostels" }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            });
        });

        const newImageUrls = await Promise.all(uploadPromises);
        console.log("New image URLs:", newImageUrls);

        // Combine existing and new image URLs
        const existingImageUrls = Array.isArray(formData.imageUrls) ? formData.imageUrls : 
                                  (formData.imageUrls ? formData.imageUrls.split(',') : []);
        const imageUrls = [...existingImageUrls, ...newImageUrls].slice(0, 5); // Limit to 5 images

        let updatedData = {...formData, imageUrls};

        console.log("Incoming Data:", updatedData);

        // Ensure all required fields are present
        const requiredFields = ['area', 'sharing', 'totalStudents', 'price', 'contact', 'hotWater', 'wifi', 'ventilation', 'drinkingWater', 'vacancy', 'hostelName', 'rooms'];
        const missingFields = requiredFields.filter(field => updatedData[field] === undefined);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                status: 400, 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Convert and validate numeric fields
        const numericFields = ['sharing', 'totalStudents', 'price', 'contact', 'rooms'];
        numericFields.forEach(field => {
            const value = parseInt(updatedData[field], 10);
            if (isNaN(value)) {
                throw new Error(`Invalid value for ${field}: ${updatedData[field]}`);
            }
            updatedData[field] = value;
        });

        // Map frontend fields to schema fields
        updatedData = {
            area: updatedData.area,
            sharing: updatedData.sharing,
            totalStudents: updatedData.totalStudents,
            price: updatedData.price,
            contact: updatedData.contact,
            hotWater: updatedData.hotWater,
            wifi: updatedData.wifi,
            ventilation: updatedData.ventilation,
            drinkingWater: updatedData.drinkingWater,
            vacancy: updatedData.vacancy,
            hostelName: updatedData.hostelName,
            rooms: updatedData.rooms,
            gender: updatedData.gender,
            address: updatedData.address,
            imageUrls: updatedData.imageUrls
        };

        console.log("Processed Data:", updatedData);

        const hostel = await Hostel.findById(hostelId);

        if (!hostel) {
            return res.status(404).json({ status: 404, message: 'Hostel with this Id not present' });
        }

        const updatedHostel = await Hostel.findByIdAndUpdate(hostelId, updatedData, { new: true, runValidators: true });

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
        res.status(400).json({
            status: 400,
            message: 'Bad Request',
            error: error.message
        });
    }
});


module.exports = router;