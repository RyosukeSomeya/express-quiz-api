// Open Trivia APIにアクセスし、取得したデータを整形する
const request = require('request-promise');
const options = {
  method: 'GET',
  json: true,
  url: "https://opentdb.com/api.php?amount=10",
}
module.exports = class Quiz {
  getQuiz() {
    return 'API取得結果'
  }
}

