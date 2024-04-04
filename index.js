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

const requestCountsLogin = {};
const requestCountsFetchQuestion = {};
const requestCountsSubmitAnswer = {};
const requestCountsLeaderboard = {};

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cookieParser());

const limitRequestsLogin = (req, res, next) => {
    const { teamId } = req.headers.teamid;
    const now = Date.now();
    requestCountsLogin[teamId] = requestCountsLogin[teamId] || [];
    requestCountsLogin[teamId] = requestCountsLogin[teamId].filter(time => now - time < 20000);
    if (requestCountsLogin[teamId].length >= 5) {
        return res.status(429).json({ error: 'Too many requests from this team ID' });
    }
    requestCountsLogin[teamId].push(now);
    next();
};

const limitRequestsFetchQuestion = (req, res, next) => {
    const { teamId } = req.headers.teamid;
    const now = Date.now();
    requestCountsFetchQuestion[teamId] = requestCountsFetchQuestion[teamId] || [];
    requestCountsFetchQuestion[teamId] = requestCountsFetchQuestion[teamId].filter(time => now - time < 1000);
    if (requestCountsFetchQuestion[teamId].length >= 6) {
        return res.status(429).json({ error: 'Too many requests from this team ID' });
    }
    requestCountsFetchQuestion[teamId].push(now);
    next();
};

const limitRequestsSubmitAnswer = (req, res, next) => {
    const { teamId } = req.headers.teamid;
    const now = Date.now();
    requestCountsSubmitAnswer[teamId] = requestCountsSubmitAnswer[teamId] || [];
    requestCountsSubmitAnswer[teamId] = requestCountsSubmitAnswer[teamId].filter(time => now - time < 1000);
    if (requestCountsSubmitAnswer[teamId].length >= 5) {
        return res.status(429).json({ error: 'Too many requests from this team ID' });
    }
    requestCountsSubmitAnswer[teamId].push(now);
    next();
};

const limitRequestsLeaderboard = (req, res, next) => {
    const { teamId } = req.headers.teamid;
    const now = Date.now();
    requestCountsLeaderboard[teamId] = requestCountsLeaderboard[teamId] || [];
    requestCountsLeaderboard[teamId] = requestCountsLeaderboard[teamId].filter(time => now - time < 1000);
    if (requestCountsLeaderboard[teamId].length >= 2) {
        return res.status(429).json({ error: 'Too many requests from this team ID' });
    }
    requestCountsLeaderboard[teamId].push(now);
    next();
};

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/que", limitRequestsFetchQuestion, quesRoutes);
app.use("/api/dashboard", quizRoutes);
app.use("/api/teamdetails", teamRoutes);
app.use("/api/leaderboard", limitRequestsLeaderboard, leaderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log(error.message);
});

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
});
