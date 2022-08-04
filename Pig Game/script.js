'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, player, currentScore, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  player = 0;
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;
  currentScore = 0;
  player = player === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${player}`).textContent = currentScore;
      // current0El.textContent = currentScore; //MUDAR DEPOIS
    } else {
      switchPlayer();
    }
  }
});

//Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[player] += currentScore;
    document.getElementById(`score--${player}`).textContent = scores[player];

    if (scores[player] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//New game functionality
btnNew.addEventListener('click', init);
