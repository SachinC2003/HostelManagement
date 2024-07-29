const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ success: false, error: new Error("No token exists"), message: "No token exists" });
        }

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.headers.id = decoded.id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ success: false, error: err, message: "Authentication failed" });
    }
}

module.exports = authmiddleware;
