"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let chosenCards = [];
let chooseMoreCards = true;

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 * Create a loop that creates a div for every color
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */


function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div");
    card.classList.add(color);
    card.classList.add("blank");
    gameBoard.appendChild(card);
    card.addEventListener("click", handleCardClick);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.classList.remove("blank");
}

/** Flip a card face-down. */

function unFlipCard(chosenCards) {
  // ... you need to write this ...
  for (let card of chosenCards) {
    card.classList.add("blank");
  }
  return chosenCards;
}

/** Handle clicking on a card: this could be first-card or second-card. */


function handleCardClick(evt) {
  // ... you need to write this ...
  if (chosenCards[0] === undefined) {
    chosenCards[0] = evt.target;
  } else if (chosenCards[1] === undefined) {
    chosenCards[1] = evt.target;
    chooseMoreCards = false;
    // debugger;
  } else {
    debugger;
    alert("Sorry, only two cards can be selected at a time");
    return undefined;
  }

  // debugger; chosenCards[0] !== undefined && chosenCards[1] !== undefined
  // if (chosenCards.length === 2) {
  //   lockedBoard = true;
  // }

  // debugger; (chosenCards[0] !== undefined || chosenCards[1] !== undefined) && 
  // debugger;
  if ((chosenCards.length <= 2) && (evt.target.classList.contains("blank"))){
    flipCard(evt.target);
  } else {
    alert("Sorry, this card has already been selected. Please choose another card.")
  }
  
  // debugger; 
  if (chosenCards.length === 2) {
    chosenCards = checkMatch(chosenCards);
    chosenCards = reset(chosenCards);
    chooseMoreCards = true;
  }
 
  return chosenCards;
}

function checkMatch (chosenCards) {
  if (chosenCards[0].classList.value !== chosenCards[1].classList.value) {
    setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, chosenCards);
    return chosenCards;
  } 
  return chosenCards;
}

function reset (chosenCards) {
  chosenCards = [];
  return chosenCards;
}

