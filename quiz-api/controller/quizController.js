const quiz = require('../model/Quiz');

module.exports = {
  getQuiz: (req, res, next) => {
    // Quiz取得
    const quizApi = new quiz();
    console.log(quizApi.getQuiz())
    res.json({
      message:"Hello,world! from QuizController"
    });
  },
}
