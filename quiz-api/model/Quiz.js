// Open Trivia APIにアクセスし、取得したデータを整形する
const request = require('request-promise');
const { response } = require('../app');
const options = {
  method: 'GET',
  json: true,
  url: "https://opentdb.com/api.php?amount=10",
}
module.exports = class Quiz {
  getQuiz() {
    return new Promise(function(resolve, reject) {
      request(options, (error, response, body) => {
        resolve(body);
      })
    });
  }
}

