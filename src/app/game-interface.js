'use strict';

// Assign ctrls to js consts
const playAnswerInput = document.querySelector('.answer');
const definitionDesc = document.querySelector('.definition');
const hintDesc = document.querySelector('.hint');
const answers = document.querySelector('.answers');
const statsPoints = document.querySelector('.points');
const statsQuestion = document.querySelector('.question');
const statsTimer = document.querySelector('.timer');

// Bind actions to ctrls
const ctrlNewGame = document.querySelector('.ctrl-newgame');
ctrlNewGame.onclick = () => {
    game.new();
    return false;
};

const ctrlStop = document.querySelector('.ctrl-stop');
ctrlStop.onclick = () => {
    game.new();
    return false;
};

const playAnswerForm = document.querySelector('.answer-form');
playAnswerForm.onsubmit = () => {
    return false;
};

const playSkip = document.querySelector('.skip');
playSkip.onclick = () => {
    game.skipQuestion();
    return false;
};

playAnswerInput.addEventListener('keyup', game.checkAnswer);
