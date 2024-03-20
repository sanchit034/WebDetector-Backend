const router = require('express').Router();
const { createTeam, joinTeam, checkTeam } = require('../controllers/TeamController');
const { protectRoute } = require("../controllers/UserController");

router.use(protectRoute);
router.post("/createTeam", createTeam);
router.put("/joinTeam", joinTeam);
// router.get("/checkTeam", checkTeam); 

module.exports = router;
