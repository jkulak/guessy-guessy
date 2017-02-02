'use strict';

const game = {

    // Number of games played
    count: 0,

    // Game settings
    settings: {
        answerTiemLimit: 10
    },

    // Current game data
    currentGame: {
        // Number of points in current game
        points: 0,
        question: 0
    },

    // Current question data
    currentQuestion: {
        timeLeft: 0
    },

    // File with a dictionary
    questonsFile: 'dict-easy.json',

    // Interval timer handler
    timer: null,

    // Enable debugging
    debug: false,

    // Init (bootstrap) the game
    init: function () {
        const endpoint = game.questonsFile;

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
        game.enableControls();
        game.nextQuestion();
    },

    // Stop current game
    stop: function () {

        clearInterval(this.timer);
        game.disableControls();
    },

    // Run every second, the game engine
    iterate: function () {

        game.currentQuestion.timeLeft--;
        game.updateStats();
        game.revealHint();
        if (game.currentQuestion.timeLeft < 1) {
            game.logAnswer(false);
            game.nextQuestion();
        }
    },

    // Slowly reveal a hint
    revealHint: function () {

        const answer = game.currentQuestion.phrase;
        const len = Math.floor(answer.length / game.settings.answerTiemLimit * (game.settings.answerTiemLimit - game.currentQuestion.timeLeft));
        const stars = new Array(answer.length + 1).join("*");

        // playAnswerInput.placeholder = answer.substr(0, len);
        playAnswerInput.placeholder = answer.substr(0, len) + stars.slice(len);
    },

    // Calculate points logic
    addPoints: function () {
        game.currentGame.points += game.currentQuestion.timeLeft;
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

        clearInterval(game.timer);
        game.timer = setInterval(game.iterate, 1000);

        game.currentGame.question++;

        game.updateStats();
        game.displayQuestion();
    },

    // Log wrong answer and start next question
    skipQuestion: function () {

        game.logAnswer(false);
        game.nextQuestion();
    },

    // Check if entered answer is correct
    checkAnswer: function () {

        if (playAnswerInput.value.toLowerCase() === game.currentQuestion.phrase.toLowerCase()) {
            game.logAnswer(true);
            game.nextQuestion();
        }
    },

    // Display a question
    displayQuestion: function () {

        playAnswerInput.placeholder = '';
        playAnswerInput.value = '';
        playAnswerInput.focus();

        definitionDesc.innerHTML = game.currentQuestion.description;
        if (game.debug) {
            hintDesc.innerHTML = game.currentQuestion.phrase;
        }

    },

    // Update stats panel (time, question, points)
    updateStats: function () {

        statsQuestion.innerHTML = game.currentGame.question;
        statsPoints.innerHTML = game.currentGame.points;
        statsTimer.innerHTML = game.currentQuestion.timeLeft;
    },

    // Log asnwer in the answer list
    logAnswer: function (result) {

        if (result) {
            game.addPoints();
        }

        const li = document.createElement('li');
        li.classList.add(result ? 'good' : 'bad');
        // li.appendChild(document.createTextNode(`${game.currentQuestion.phrase}`));
        li.innerHTML = `<strong>${game.currentQuestion.phrase}</strong><br />- ${game.currentQuestion.description}`;
        answers.insertBefore(li, answers.childNodes[0]);

        game.updateStats();
    },

    // Enable controls when the game starts
    enableControls: function () {

    },

    // Disable controls when not in the game
    disableControls: function () {

    }
};
