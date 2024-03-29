const router = require('express').Router();
const {getWinners} = require('../controllers/LeaderController');
const {protectRoute}=require("../controllers/UserController");

// router.use(protectRoute);
router.get("/winners",getWinners);

module.exports = router;