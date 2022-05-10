'use strict';

// Selecting the elements that will be used often.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('curent--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

// Starting conditions for the game.
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  };
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Switches the CSS class based on whether it is there or not.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling the dice functionality.
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random dice roll.
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice.
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for a rolled 1
        if (dice !== 1) {
            // Add dice to current score.
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to the next player.
            switchPlayer()
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to the score of active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if the player's score is >= 100
        if (scores[activePlayer] >= 50) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player.
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init)