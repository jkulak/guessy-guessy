'use strict';

var game = {

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
    init: function init() {
        var endpoint = game.questonsFile;

        fetch(endpoint).then(function (data) {
            return data.json();
        }).then(function (data) {
            game.questions = data;
            // hide loading
        });
    },

    // Start a new game
    new: function _new() {

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
    stop: function stop() {

        clearInterval(this.timer);
        game.disableControls();
    },

    // Run every second, the game engine
    iterate: function iterate() {

        game.currentQuestion.timeLeft--;
        game.updateStats();
        game.revealHint();
        if (game.currentQuestion.timeLeft < 1) {
            game.logAnswer(false);
            game.nextQuestion();
        }
    },

    // Slowly reveal a hint
    revealHint: function revealHint() {

        var answer = game.currentQuestion.phrase;
        var len = Math.floor(answer.length / game.settings.answerTiemLimit * (game.settings.answerTiemLimit - game.currentQuestion.timeLeft));
        var stars = new Array(answer.length + 1).join("*");

        // playAnswerInput.placeholder = answer.substr(0, len);
        playAnswerInput.placeholder = answer.substr(0, len) + stars.slice(len);
    },

    // Calculate points logic
    addPoints: function addPoints() {
        game.currentGame.points += game.currentQuestion.timeLeft;
    },

    // Select random questions from the questions object
    nextQuestion: function nextQuestion() {

        var count = 0,
            result = null;

        for (var phrase in game.questions) {
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
    skipQuestion: function skipQuestion() {

        game.logAnswer(false);
        game.nextQuestion();
    },

    // Check if entered answer is correct
    checkAnswer: function checkAnswer() {

        if (playAnswerInput.value.toLowerCase() === game.currentQuestion.phrase.toLowerCase()) {
            game.logAnswer(true);
            game.nextQuestion();
        }
    },

    // Display a question
    displayQuestion: function displayQuestion() {

        playAnswerInput.placeholder = '';
        playAnswerInput.value = '';
        playAnswerInput.focus();

        definitionDesc.innerHTML = game.currentQuestion.description;
        if (game.debug) {
            hintDesc.innerHTML = game.currentQuestion.phrase;
        }
    },

    // Update stats panel (time, question, points)
    updateStats: function updateStats() {

        statsQuestion.innerHTML = game.currentGame.question;
        statsPoints.innerHTML = game.currentGame.points;
        statsTimer.innerHTML = game.currentQuestion.timeLeft;
    },

    // Log asnwer in the answer list
    logAnswer: function logAnswer(result) {

        if (result) {
            game.addPoints();
        }

        var li = document.createElement('li');
        li.classList.add(result ? 'good' : 'bad');
        // li.appendChild(document.createTextNode(`${game.currentQuestion.phrase}`));
        li.innerHTML = '<strong>' + game.currentQuestion.phrase + '</strong><br />- ' + game.currentQuestion.description;
        answers.insertBefore(li, answers.childNodes[0]);

        game.updateStats();
    },

    // Enable controls when the game starts
    enableControls: function enableControls() {},

    // Disable controls when not in the game
    disableControls: function disableControls() {}
};
'use strict';

// Assign ctrls to js consts

var playAnswerInput = document.querySelector('.answer');
var definitionDesc = document.querySelector('.definition');
var hintDesc = document.querySelector('.hint');
var answers = document.querySelector('.answers');
var statsPoints = document.querySelector('.points');
var statsQuestion = document.querySelector('.question');
var statsTimer = document.querySelector('.timer');

// Bind actions to ctrls
var ctrlNewGame = document.querySelector('.ctrl-newgame');
ctrlNewGame.onclick = function () {
    game.new();
    return false;
};

var ctrlStop = document.querySelector('.ctrl-stop');
ctrlStop.onclick = function () {
    game.stop();
    return false;
};

var playAnswerForm = document.querySelector('.answer-form');
playAnswerForm.onsubmit = function () {
    return false;
};

var playSkip = document.querySelector('.skip');
playSkip.onclick = function () {
    game.skipQuestion();
    return false;
};

playAnswerInput.addEventListener('keyup', game.checkAnswer);
'use strict';

(function (b, o, i, l, e, r) {
    b.GoogleAnalyticsObject = l;
    b[l] || (b[l] = function () {
        (b[l].q = b[l].q || []).push(arguments);
    });
    b[l].l = +new Date();
    e = o.createElement(i);
    r = o.getElementsByTagName(i)[0];
    e.src = '//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e, r);
})(window, document, 'script', 'ga');
ga('create', 'UA-88988916-2', 'auto');
ga('send', 'pageview');
'use strict';

// Init the game

game.init();
//# sourceMappingURL=all.js.map
