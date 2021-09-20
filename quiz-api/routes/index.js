const express = require('express');
const router = express.Router();
const qiuzController = require('../controller/QuizController')


/* GET home page. */
router.get('/', qiuzController.getQuiz);

module.exports = router;
