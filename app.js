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

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    // const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    
    if(!existingUser){
      return res.status(401).json({
        success: false,
        message: "User not registered! Please Register",
      });
    }
    if(password === existingUser.password){
     res.json({
     success: true,
      message: "Login success",
    });
  }
  else{
    res.status(500).json({
      success: false,
      message: "Invalid email/password",
    });
  }
  }catch(error){
    res.status(500).json({
      success: false,
      message: "User not registered Please register",
    });
  }

});

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If your frontend sends cookies
  optionsSuccessStatus: 204, // No content response status for preflight requests
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
