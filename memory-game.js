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
 * 
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
  card.classList.remove("blank");
}

/** Flip a card face-down. */
function unFlipCard(array) {
  for (let card of array) {
    card.classList.add("blank");
  }
  chosenCards = [];
  console.log("chosenCards at unFlipCard:", chosenCards);
  debugger;
  return chosenCards;
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(evt) {
  // CHECK IF THERE ARE ALREADY 2 CHOSEN CARDS:
  if (chosenCards.length === 2) {
    alert("Sorry, only two cards can be selected at a time.");
  }

  // CARD is being flipped but not pushed to the array

  // CHECK IF THE CARD HAS ALREADY BEEN SELECTED:
  if (evt.target.classList.contains("blank") === false) {
    alert ("Sorry, this card has already been selected. Please choose another card.");
  } else if ((chosenCards.length < 2) && (evt.target.classList.contains("blank") === true)) {
    flipCard(evt.target);
    chosenCards.push(evt.target);
  }

  // WHEN TWO CARDS HAVE BEEN SELECTED, CHECK TO SEE IF THE CARDS ARE A MATCH.
  if (chosenCards.length === 2) {
    chosenCards = checkMatch(chosenCards);
    console.log("chosenCard at checkMatch:", chosenCards);
  }
  console.log("chosenCards at final Return:", chosenCards);
  return chosenCards;
}

function checkMatch (chosenCards) {
  if (chosenCards[0].classList.value !== chosenCards[1].classList.value) {
    setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, chosenCards);
    console.log("chosenCard after setTimeout function:", chosenCards);
  } else if (chosenCards[0].classList.value === chosenCards[1].classList.value) {
    chosenCards = [];
  }
  console.log("chosenCard at the end of checkMatch:", chosenCards);
  return chosenCards;
}


