const router = require('express').Router();
const {setQuestion,updateQuestion} = require('../controllers/QuesController')

router.post("/queData",setQuestion);
router.put("/queData",updateQuestion);


module.exports = router;