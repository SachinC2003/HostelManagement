const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")
const express = require("express")
const { model } = require("mongoose")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startwith("Bearer ")) {
        return res.statu(403).json({
            message: "No token provided"
        })
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded.userId;
            next();
        }
        catch (err) {
            return res.status(403).json({

            })
        }
    }
}

module.exports = {
    verifyToken
}