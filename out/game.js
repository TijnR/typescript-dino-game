"use strict";
var CLASS_JUMPING = 'is--jumping';
var CLASS_SLIDING = 'is--sliding';
var CLASS_JUMP_BUFFER = 'buffer';
var ID_CHARACTER = 'character';
var ID_BLOCK = 'block';
var ID_SCORE = 'score';
var ID_HIGH_SCORE = 'hsc';
var character = document.getElementById(ID_CHARACTER);
var block = document.getElementById(ID_BLOCK);
var score = document.getElementById(ID_SCORE);
var high_score = document.getElementById(ID_HIGH_SCORE);
var gamePaused = true;
var gameScore = 0;
var highScore = localStorage.getItem('highscore');
high_score.innerHTML = highScore;
var counter;
var character_starter_position = character.getBoundingClientRect();
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        if (gamePaused) {
            startGame();
            startScoreCounter();
        }
        jump();
    }
};
document.addEventListener('touchstart', function () {
    if (gamePaused) {
        startGame();
        startScoreCounter();
    }
    jump();
});
var startGame = function () {
    gamePaused = !gamePaused;
    block.classList.add(CLASS_SLIDING);
};
var startScoreCounter = function () {
    counter = setInterval(function () {
        gameScore++;
        score.innerText = gameScore;
    }, 50);
};
var setHighScore = function () {
    highScore = gameScore;
    high_score.innerHTML = highScore;
    localStorage.setItem('highscore', highScore);
};
var jump = function () {
    if (!character.classList.contains(CLASS_JUMP_BUFFER)) {
        character.classList.add(CLASS_JUMPING);
        character.classList.add(CLASS_JUMP_BUFFER);
        setTimeout(function () {
            character.classList.remove(CLASS_JUMPING);
            character.classList.remove(CLASS_JUMP_BUFFER);
        }, 500);
    }
};
var checkDead = setInterval(function () {
    var isBlockUnderCharacter = (block.getBoundingClientRect().left >= character_starter_position.left &&
        block.getBoundingClientRect().left <= character_starter_position.right) ||
        (block.getBoundingClientRect().right <= character_starter_position.left &&
            block.getBoundingClientRect().right >= character_starter_position.right);
    var isCharacterJumpingHigh = character_starter_position.bottom -
        character.getBoundingClientRect().bottom >
        20;
    if (isBlockUnderCharacter && !isCharacterJumpingHigh) {
        gameOver();
    }
}, 10);
var gameOver = function () {
    clearInterval(counter);
    block.classList.remove(CLASS_SLIDING);
    gamePaused = !gamePaused;
    if (gameScore > highScore) {
        setHighScore();
    }
    gameScore = 0;
};
