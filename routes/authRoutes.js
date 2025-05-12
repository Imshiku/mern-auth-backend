const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authControllers");
const {registeringUser,loginUser} = require("../middleware/authMiddleware")

// Sample route
router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

// Register
router.post("/register", registerUser);

// 🔐 Login
router.post("/login", loginUser);


module.exports = router;
