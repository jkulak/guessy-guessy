'use strict';

const game = {
    // number of games played
    count: 0,
    points: 0,
    questions: {},
    current: {},

    settings: {
        answerTiemLimit: 30
    },

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
