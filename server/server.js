// IMPORT PACKAGES
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoute = require('./routes/authRoutes')
const linkRoutes = require('./routes/linkRoutes')
const protect = require('./middleware/authMiddleware')
require("dotenv").config(); // Load environment variables from .env file

// CONNECTING TO MONGODB
connectDB();

// ACTIVATING MAIN APP FOR REQUESTING ROUTES
app.use(express.json());

// MAIN ROUTE
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// ROUTES
app.use('/api', authRoute)
app.use("/api/links",protect, linkRoutes);

// CREATE SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
