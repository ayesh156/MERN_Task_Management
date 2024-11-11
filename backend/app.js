const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
app.use(cors());
app.use(express.json());
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);
// Localhost:1000/api/v1/sign-in

app.use("/", (req, res) => {
    res.send("Hello from backend side");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});