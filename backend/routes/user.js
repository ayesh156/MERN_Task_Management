// Import necessary modules
const router = require("express").Router();  // Initialize the Express router
const User = require("../models/User");      // Import the User model
const bcrypt  = require("bcryptjs");         // Import bcryptjs for password hashing
const jwt = require("jsonwebtoken");         // Import jsonwebtoken for token generation

// SIGN IN API to register a new user
router.post("/sign-in", async (req, res) => {
    try{
        // Destructure username and email from the request body
        const { username, email } = req.body;

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username: username });

        // Check if the email already exists in the database
        const existingEmail = await User.findOne({ email: email });

        // Return error if username is already taken
        if (existingUser) {
            return res.status(400).json({ message: "Username already exist" });
        }
        // Return error if the username is too short
        else if (username.length < 4) {
            return res.status(400).json({ message: "Username should have least 4 characters" });
        }

        // Return error if email is already taken
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist" });
        }

        // Hash the password before saving
        const hashPass = await bcrypt.hash(req.body.password, 12);

        // Create a new user object
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });

        // Save the new user in the database
        await newUser.save();

        // Send a success response
        return res.status(200).json({ message: "Signup successfully" });
    } catch(error) {
        // Catch any errors and send a response
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// LOGIN API for existing users
router.post("/log-in", async (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Find the user by username in the database
    const existingUser = await User.findOne({ username: username });

    // If user doesn't exist, return an error
    if (!existingUser) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {
            // If passwords match, generate a JWT token with user details
            const authClaims = [{ name: username }, { jti: jwt.sign({}, "TTA") }];
            const token = jwt.sign({ authClaims }, "TTA", { expiresIn: "2d" });

            // Send the response with user ID and the generated token
            res.status(200).json({ id: existingUser._id, token: token });
        } else {
            // If passwords do not match, return an error
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    })
})

module.exports = router;  // Export the router to use it in other files
