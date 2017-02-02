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

(function () {
    'use strict';

    var game = {

        // Number of games played
        count: 0,

        // Number of points in current game
        points: 0,

        // Game settings
        settings: {
            answerTiemLimit: 30
        },

        // Init (bootstrap) the game
        init: function init() {
            var endpoint = 'dict-easy.json';

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
            game.points = 0;
            game.points = 1;
            //
            answers.innerHTML = '';

            updateStats();
            nextQuestion();
        }
    };

    var displayQuestion = function displayQuestion(q) {

        answerInput.value = '';
        answerInput.focus();

        definitionDesc.innerHTML = q.description;
        hintDesc.innerHTML = q.phrase;
    };

    // Select random questions from the questions object
    var nextQuestion = function nextQuestion() {

        var count = 0,
            result = null;

        for (var phrase in game.questions) {
            if (Math.random() < 1 / ++count) {
                result = phrase;
            }
        }

        game.current = {
            phrase: result,
            description: game.questions[result]
        };

        displayQuestion(game.current);
    };

    var updateStats = function updateStats() {
        ctrlPoints.innerHTML = game.points;
    };

    var logAnswer = function logAnswer(result, q) {

        if (result) {
            game.points++;
        }

        var li = document.createElement('li');
        li.classList.add(result ? 'good' : 'bad');
        li.appendChild(document.createTextNode(q.phrase + ': ' + q.description));
        answers.insertBefore(li, answers.childNodes[0]);

        updateStats();
    };

    var skipQuestion = function skipQuestion() {

        logAnswer(false, game.current);
        nextQuestion();
    };

    var checkAnswer = function checkAnswer() {

        if (answerInput.value.toLowerCase() === game.current.phrase.toLowerCase()) {
            logAnswer(true, game.current);
            nextQuestion();
        }
    };

    // Assign controls to js consts
    var answerInput = document.querySelector('.answer');
    var definitionDesc = document.querySelector('.definition');
    var hintDesc = document.querySelector('.hint');
    var answers = document.querySelector('.answers');
    var ctrlPoints = document.querySelector('.points');

    // Bind actions to controls
    document.querySelector('.control-newgame').onclick = function () {
        game.new();
        return false;
    };

    document.querySelector('.answer-form').onsubmit = function () {
        return false;
    };

    document.querySelector('.skip').onclick = function () {
        skipQuestion();
        return false;
    };

    answerInput.addEventListener('keyup', checkAnswer);

    // Init the game
    game.init();
})();
//# sourceMappingURL=all.js.map
