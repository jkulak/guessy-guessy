"use strict";var game={count:0,settings:{answerTiemLimit:10},currentGame:{points:0,question:0},currentQuestion:{timeLeft:0},questonsFile:"dict-easy.json",timer:null,debug:!1,init:function(){var e=game.questonsFile;fetch(e).then(function(e){return e.json()}).then(function(e){game.questions=e})},new:function(){game.count++,game.currentGame={points:0,question:0},answers.innerHTML="",game.updateStats(),game.enableControls(),game.nextQuestion()},stop:function(){clearInterval(this.timer),game.disableControls()},iterate:function(){game.currentQuestion.timeLeft--,game.updateStats(),game.revealHint(),game.currentQuestion.timeLeft<1&&(game.logAnswer(!1),game.nextQuestion())},revealHint:function(){var e=game.currentQuestion.phrase,t=Math.floor(e.length/game.settings.answerTiemLimit*(game.settings.answerTiemLimit-game.currentQuestion.timeLeft)),n=new Array(e.length+1).join("*");playAnswerInput.placeholder=e.substr(0,t)+n.slice(t)},addPoints:function(){game.currentGame.points+=game.currentQuestion.timeLeft},nextQuestion:function(){var e=0,t=null;for(var n in game.questions)Math.random()<1/++e&&(t=n);game.currentQuestion={phrase:t,description:game.questions[t],timeLeft:game.settings.answerTiemLimit},clearInterval(game.timer),game.timer=setInterval(game.iterate,1e3),game.currentGame.question++,game.updateStats(),game.displayQuestion()},skipQuestion:function(){game.logAnswer(!1),game.nextQuestion()},checkAnswer:function(){playAnswerInput.value.toLowerCase()===game.currentQuestion.phrase.toLowerCase()&&(game.logAnswer(!0),game.nextQuestion())},displayQuestion:function(){playAnswerInput.placeholder="",playAnswerInput.value="",playAnswerInput.focus(),definitionDesc.innerHTML=game.currentQuestion.description,game.debug&&(hintDesc.innerHTML=game.currentQuestion.phrase)},updateStats:function(){statsQuestion.innerHTML=game.currentGame.question,statsPoints.innerHTML=game.currentGame.points,statsTimer.innerHTML=game.currentQuestion.timeLeft},logAnswer:function(e){e&&game.addPoints();var t=document.createElement("li");t.classList.add(e?"good":"bad"),t.innerHTML="<strong>"+game.currentQuestion.phrase+"</strong><br />- "+game.currentQuestion.description,answers.insertBefore(t,answers.childNodes[0]),game.updateStats()},enableControls:function(){},disableControls:function(){}},playAnswerInput=document.querySelector(".answer"),definitionDesc=document.querySelector(".definition"),hintDesc=document.querySelector(".hint"),answers=document.querySelector(".answers"),statsPoints=document.querySelector(".points"),statsQuestion=document.querySelector(".question"),statsTimer=document.querySelector(".timer"),ctrlNewGame=document.querySelector(".ctrl-newgame");ctrlNewGame.onclick=function(){return game.new(),!1};var ctrlStop=document.querySelector(".ctrl-stop");ctrlStop.onclick=function(){return game.stop(),!1};var playAnswerForm=document.querySelector(".answer-form");playAnswerForm.onsubmit=function(){return!1};var playSkip=document.querySelector(".skip");playSkip.onclick=function(){return game.skipQuestion(),!1},playAnswerInput.addEventListener("keyup",game.checkAnswer),function(e,t,n,r,s,a){e.GoogleAnalyticsObject=r,e[r]||(e[r]=function(){(e[r].q=e[r].q||[]).push(arguments)}),e[r].l=+new Date,s=t.createElement(n),a=t.getElementsByTagName(n)[0],s.src="//www.google-analytics.com/analytics.js",a.parentNode.insertBefore(s,a)}(window,document,"script","ga"),ga("create","UA-88988916-2","auto"),ga("send","pageview"),game.init();
//# sourceMappingURL=all.js.map
