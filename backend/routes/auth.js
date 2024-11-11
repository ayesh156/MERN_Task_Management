const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const AuthHeader = req.headers["authorization"];
    const token = AuthHeader && AuthHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "TTA", (err, user) => {
        if (err) {
            return res.status(401).json(err);
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
