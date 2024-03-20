const router = require('express').Router();

const {fetchQuestion,checkAnswerAndFetchNext}=require('../controllers/QuizController');
const {protectRoute}=require("../controllers/UserController");

router.use(protectRoute);
router.get("/contest/:set",fetchQuestion);
router.put("/contest/:set",checkAnswerAndFetchNext);
module.exports=router;