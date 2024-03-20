const router = require('express').Router();
const {register,login,updateDetails} = require('../controllers/UserController')

router.post("/register",register);
router.post("/login",login);
router.put("/profile",updateDetails)

module.exports = router;


