const API_URL = 'http://127.0.0.1:3000/api/v1/quiz/';

class Quiz {
    constructor(container) {
        this.container = container;
        this.quizLists = null;
        this.current = 0;
        this.correct = 0;
    }

    startQuiz() {
        const templateConfig = {
            headingText: 'ようこそ',
            message: '以下のボタンをクリック',
            btn: '開始',
        }
        const section = this._createTemplate(templateConfig);
        section.children[2].addEventListener('click', () => {
            this._getQuiz();
        });
        this.container.appendChild(section);
    }

    _resetQuiz() {
        this.current = 0;
        this.correct = 0;
        this._clearContent()
        this.startQuiz();
    }

    _correctCount() {
        // 回答処理
        this.correct++;
        this.current++;

        if (this.current < 10) {
            this._setQuiz(this.quizLists);
        } else if (this.current === 10) {
            this._showResult();
        }
    }

    _incorrectCount() {
        this.current++;
        if (this.current < 10) {
            this._setQuiz(this.quizLists);
        } else if (this.current === 10) {
            this._showResult();
        }
    }
    // 内部処理
    _getQuiz() {
        this._clearContent();
        const templateConfig = {
            isLoad: true,
            headingText: '取得中',
            message: '少々お待ち下さい...',
        }
        const section = this._createTemplate(templateConfig);
        this.container.appendChild(section);
        // クイズ取得
        fetch(API_URL, {
            mode: 'cors',
            // credentials: 'same-origin'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.quizLists = data;
            this._setQuiz(this.quizLists);
        }).catch(error => {
            console.error(error)
            alert('クイズの取得に失敗しました。');
        })
    }

    _setQuiz(quizLists) {
        this._clearContent();
        const section = this._createQuizTemplate(quizLists);
        this.container.appendChild(section);
    }

    _showResult() {
        this._clearContent();

        const templateConfig = {
            isResult: true,
            headingText: 'あなたの正答数は',
            message: '再度チャレンジしたい場合は以下をクリック！！',
            btn: 'ホームへ戻る',
        }
        const section = this._createTemplate(templateConfig);
        section.children[2].addEventListener('click', () => {
            this._resetQuiz()
        });
        this.container.appendChild(section);
    }

    _createTemplate(config) {
        const content = document.createElement('section');
        const heading = document.createElement('h1');
        const message = document.createElement('p');
        let btn;

        if (config.isResult) {
            heading.innerText = config.headingText + this.correct + 'です。';
        } else {
            heading.innerText = config.headingText;
        }

        message.innerText = config.message;
        message.classList.add('message');

        if (!config.isLoad) {
            btn = document.createElement('button');
            btn.innerText = config.btn;
        }

        content.appendChild(heading);
        content.appendChild(message);

        if (!config.isLoad) {
            content.appendChild(btn);
        }

        return content;
    }

    _createQuizTemplate(quizLists) {
        // 問題を一つセットする
        const content = document.createElement('section');
        const heading = document.createElement('h1');
        const questionInfo = document.createElement('div');
        const questionCategory = document.createElement('p');
        const questionDifficulty = document.createElement('p');
        const question = document.createElement('p');
        const answerBtnWrap = document.createElement('div');
        const correctBtn = document.createElement('button');
        let answerBtns = [];

        heading.innerText = `問題${this.current + 1}`;
        questionCategory.innerText = quizLists[this.current].category;
        questionDifficulty.innerText = quizLists[this.current].difficulty;
        question.innerText = quizLists[this.current].question;

        // 正答を配列に入れる
        correctBtn.innerText = quizLists[this.current].correct_answer;
        correctBtn.addEventListener('click', () => {
            this._correctCount();
        })

        const correctBtnWrap = document.createElement('p');
        correctBtnWrap.appendChild(correctBtn);
        answerBtns.push(correctBtnWrap);

        // 誤答を配列に入れる
        quizLists[this.current].incorrect_answers.forEach(item => {
            const incorrectBtn = document.createElement('button');
            const incorrectBtnWrap = document.createElement('p');
            incorrectBtn.innerText = item;
            incorrectBtn.addEventListener('click', () => {
                this._incorrectCount();
            })
            incorrectBtnWrap.appendChild(incorrectBtn);
            answerBtns.push(incorrectBtnWrap);
        });

        // 配列をランダムに並び替え
        for (let i = answerBtns.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answerBtns[i], answerBtns[j]] = [answerBtns[j], answerBtns[i]];
        }
        // ボタンをdivにセット
        answerBtns.forEach(btn => {
            answerBtnWrap.appendChild(btn);
        });

        // 問題ページ作成
        content.appendChild(heading);
        questionInfo.appendChild(questionCategory);
        questionInfo.appendChild(questionDifficulty);
        content.appendChild(questionInfo);
        content.appendChild(question);
        content.appendChild(answerBtnWrap);
        content.classList.add('is-active');
        content.setAttribute('id', 'question');

        return content;
    }

    _clearContent() {
        this.container.innerHTML = '';
    }
}

// initialize
const container = document.getElementById('container');
const quiz = new Quiz(container);
quiz.startQuiz();
