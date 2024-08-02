const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(401).send({ success: false, error: new Error("No token exists"), message: "No token exists" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.headers.id = decoded.userId || decoded.ownerId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ success: false, error: err, message: "Authentication failed" });
    }
}

module.exports = authmiddleware;
