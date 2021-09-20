const quiz = require('../model/Quiz');

module.exports = {
  getQuiz: (req, res, next) => {
    // Quiz取得
    const quizApi = new quiz();
    const quizData = quizApi.getQuiz();
    quizData.then((result) => {
      res.json({
        message: result
      });
    });
  },
}
