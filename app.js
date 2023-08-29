const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("./db");
const cors = require("cors");
app.use(express.json());
app.use(cors());
// Define a Mongoose model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }
    // Create a new user document
    const user = new User({ name: name, email: email, password: password });

    // Save the user document to the database
    await user.save();

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
});

const corsOptions = {
  origin: "http://localhost:3000/register", // Replace with the actual origin of your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If your frontend sends cookies
  optionsSuccessStatus: 204, // No content response status for preflight requests
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
