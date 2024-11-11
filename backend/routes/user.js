const router = require("express").Router();
const User = require("../models/User");
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGN IN APIs
router.post("/sign-in", async (req, res) => {
   try{
       const { username } = req.body;
       const { email } = req.body;
       const existingUser = await User.findOne({ username: username });
       const existingEmail = await User.findOne({ email:email });

       if (existingUser) {
           return res.status(400).json({message: "Username already exist"});
       } else if ( username.length < 4 ) {
           return res.status(400).json({message: "Username should have least 4 characters"});
       }

       if (existingEmail) {
           return res.status(400).json({message: "Email already exist"});
       }

       const hashPass = await bcrypt.hash(req.body.password, 12);
       const newUser = new User({
           username: req.body.username,
           email: req.body.email,
           password: hashPass,
       });
       await newUser.save();
       return res.status(200).json({message: "Signup successfully"});
   }catch(error){
       console.log(error);
       res.status(400).json({ message: "Internal Server Error" });
   }
});

// LOGIN APIs
router.post("/log-in", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "Invalid Credentials" });
    }
    bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {
            const authClaims = [{ name: username }, {jti: jwt.sign({}, "TTA")}];
            const token = jwt.sign({authClaims}, "TTA",{expiresIn: "2d"});
            res.status(200).json({ id: existingUser._id, token: token });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    })
})

module.exports = router;