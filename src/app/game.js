'use strict';

const game = {

    // Number of games played
    count: 0,

    // Game settings
    settings: {
        answerTiemLimit: 30
    },

    currentGame: {
        // Number of points in current game
        points: 0,
        question: 0
    },

    currentQuestion: {
        timeLeft: 0
    },

    timer: null,


    // Init (bootstrap) the game
    init: function () {
        const endpoint = 'dict-easy.json';

        fetch(endpoint)
            .then(data => data.json())
            .then(data => {
                game.questions = data;
                // hide loading
            });
    },

    // Start a new game
    new: function () {

        game.count++;
        game.currentGame = {
            points: 0,
            question: 0
        };

        answers.innerHTML = '';
        game.updateStats();
        game.nextQuestion();
    },

    // Check if entered answer is correct
    checkAnswer: function () {

        if (playAnswerInput.value.toLowerCase() === game.currentQuestion.phrase.toLowerCase()) {
            game.logAnswer(true, game.currentQuestion);
            game.nextQuestion();
        }
    },

    // Display a question
    displayQuestion: function (q) {

        playAnswerInput.value = '';
        playAnswerInput.focus();

        definitionDesc.innerHTML = q.description;
        hintDesc.innerHTML = q.phrase;
    },

    // Select random questions from the questions object
    nextQuestion: function () {

        let count = 0,
            result = null;

        for (let phrase in game.questions) {
            if (Math.random() < 1 / ++count) {
                result = phrase;
            }
        }

        game.currentQuestion = {
            phrase: result,
            description: game.questions[result],
            timeLeft: game.settings.answerTiemLimit
        };

        game.currentGame.question++;

        game.updateStats();
        game.displayQuestion(game.currentQuestion);
    },

    updateStats: function () {

        statsQuestion.innerHTML = game.currentGame.question;
        statsPoints.innerHTML = game.currentGame.points;
        statsTimer.innerHTML = game.currentQuestion.timeLeft;

    },

    // Log asnwer in the answer list
    logAnswer: function (result, q) {

        if (result) {
            game.currentGame.points++;
        }

        const li = document.createElement('li');
        li.classList.add(result ? 'good' : 'bad');
        li.appendChild(document.createTextNode(`${q.phrase}: ${q.description}`));
        answers.insertBefore(li, answers.childNodes[0]);

        game.updateStats();
    },

    // Log wrong answer and start next question
    skipQuestion: function () {

        game.logAnswer(false, game.currentQuestion);
        game.nextQuestion();
    }
};
