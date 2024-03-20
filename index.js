const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/UserRoutes');
const quesRoutes = require('./routes/QuesRoutes');
const quizRoutes = require('./routes/QuizRoutes');
const teamRoutes = require('./routes/TeamRoutes');
const leaderRoutes = require('./routes/LeaderRoutes'); 

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/que", quesRoutes);
app.use("/api/dashboard", quizRoutes);
app.use("/api/teamdetails", teamRoutes);
app.use("/api/leaderboard", leaderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log(error.message);
});

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
});
