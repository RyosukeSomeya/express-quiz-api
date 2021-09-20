const quiz = require('../model/Quiz');

module.exports = {
  getQuiz: (req, res, next) => {
    // Quiz取得
    const quizApi = new quiz();
    const quizData = quizApi.getQuiz();
    console.log('quizData: ',quizData)
    // if (quizData.error) {
    //   console.log('error')
    // } else {
    //   console.log(quizData)
    // }
    res.json({
      message: quizData
    });
  },
}
