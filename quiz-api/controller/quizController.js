const e = require('express');
const quiz = require('../model/Quiz');

module.exports = {
  getQuiz: (req, res) => {
    // Quiz取得
    const quizApi = new quiz();
    const quizApiData = quizApi.getQuiz();
    quizApiData.then((response) => {
      res.json(response);
    });
  },
}

