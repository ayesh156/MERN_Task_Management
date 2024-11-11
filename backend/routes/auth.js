// Importing the `jsonwebtoken` library to verify JWT tokens
const jwt = require("jsonwebtoken");

// Middleware function to authenticate the token in the request
const authenticateToken = (req, res, next) => {
    // Extracting the 'authorization' header from the request
    const AuthHeader = req.headers["authorization"];

    // Splitting the 'authorization' header to get the token part after 'Bearer'
    const token = AuthHeader && AuthHeader.split(" ")[1];

    // If no token is found, send a 401 (Unauthorized) response with an error message
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    // Verifying the JWT token using the secret key 'TTA' and checking for errors
    jwt.verify(token, "TTA", (err, user) => {
        // If there's an error in verification (e.g., token is invalid or expired), return a 401 status with the error
        if (err) {
            return res.status(401).json(err);
        }

        // If token is valid, attach the decoded user data to the request object (req.user)
        req.user = user;

        // Pass control to the next middleware or route handler
        next();
    });
};

// Export the middleware function to be used in other parts of the application
module.exports = { authenticateToken };
