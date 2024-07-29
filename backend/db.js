// backend/db.js
require('dotenv').config();

const mongoose = require('mongoose');
// require('dotenv').config();

require('dotenv').config();
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log("connected to MongoDB");
  });

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, required: true, trim: true, maxLength: 50 },
    role: {type : String, enum: ["user", "owner"]},
    gender :{type : String, enum :["male", "female", "other"]}
});

const ownerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, trim: true, maxLength: 50 },
    role: {type : String, enum: ["user", "owner"]},
    gender :{type : String, enum :["male", "female", "other"]}
});


const hostelSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    hostelName: { type: String, required: true },
    area: { type: String, enum: ["main-gate", "bharati", "st-colony", "ujalaewadi", "around-college"], required: true },
    rooms: { type: Number, required: true },
    sharing: { type: Number, required: true },
    totalStudents: { type: Number, required: true },
    price: { type: Number, required: true },
    contact:{type:Number, required:true},
    hotWater: { type: String, enum: ["yes", "no"], required: true },
    wifi: { type: String, enum: ["yes", "no"], required: true },
    ventilation: { type: String, enum: ["yes", "no"], required: true },
    drinkingWater: { type: String, enum: ["yes", "no"], required: true },
    vacancy : {type:String, enum:["fill", "vacunt"], required: true}
});

const Owner = mongoose.model('owner', ownerSchema);
const User = mongoose.model('user', userSchema);
const Hostel = mongoose.model('hostel', hostelSchema);

module.exports = {
    User,
    Owner,
    Hostel
};