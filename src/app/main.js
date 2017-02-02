(function () {
    'use strict';

    const game = {

        // Number of games played
        count: 0,

        // Number of points in current game
        points: 0,

        // Game settings
        settings: {
            answerTiemLimit: 30
        },

        // Init (bootstrap) the game
        init: () => {
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
            this.count++;
            this.points = 0;

            answers.innerHTML = '';

            updateStats();
            nextQuestion();
        },
    };

    const displayQuestion = q => {

        answerInput.value = '';
        answerInput.focus();

        definitionDesc.innerHTML = q.description;
        hintDesc.innerHTML = q.phrase;
    };

    // Select random questions from the questions object
    const nextQuestion = () => {

        let count = 0,
            result = null;

        for (let phrase in game.questions) {
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

    const updateStats = () => {
        ctrlPoints.innerHTML = game.points;
    };

    const logAnswer = (result, q) => {

        if (result) {
            game.points++;
        }

        const li = document.createElement('li');
        li.classList.add(result ? 'good' : 'bad');
        li.appendChild(document.createTextNode(`${q.phrase}: ${q.description}`));
        answers.insertBefore(li, answers.childNodes[0]);

        updateStats();
    };

    const skipQuestion = () => {

        logAnswer(false, game.current);
        nextQuestion();
    };

    const checkAnswer = () => {

        if (answerInput.value.toLowerCase() === game.current.phrase.toLowerCase()) {
            logAnswer(true, game.current);
            nextQuestion();
        }
    };

    // Assign controls to js consts
    const answerInput = document.querySelector('.answer');
    const definitionDesc = document.querySelector('.definition');
    const hintDesc = document.querySelector('.hint');
    const answers = document.querySelector('.answers');
    const ctrlPoints = document.querySelector('.points');

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
