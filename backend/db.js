// backend/db.js
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/HostelRentalSystem");
mongoose.connect("mongodb+srv://abhishekujale799:NF5SPkYHK7F2R6Zb@cluster0.afahnsj.mongodb.net/HostelRentalSystem");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30

    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const ownerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    }
});

const Owner = mongoose.model('owner', ownerSchema);
const User = mongoose.model('user', userSchema);

module.exports = {
    User,
    Owner
};