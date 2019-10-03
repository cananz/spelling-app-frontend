function alphabetContainer () {
  return document.getElementById('alphabet-container')
}

function phraseContainer() {
  return document.getElementById('phrase-container')
}

function newGameBtn() {
  return document.getElementById("restart")
}

function turnCountElement() {
  return document.querySelector('div.turn-count')
}

function wrongGuessCountElement() {
  return document.querySelector('div.wrong-turn-count')
}

function categoryBtns() {
  return document.querySelector('div#category-buttons')
}

function instaSolveForm() {
  return document.querySelector('form#insta-solve-form')
}

function instaSolveInput() {
  return document.querySelector('input#insta-solve-input')
}

function guessedLetters() {
  return document.querySelector('.nested.guessed-letters')
}

function currentCategory() {
  return document.getElementById('phrase-category')
}

function hiddenPhraseLetters() {
  return document.querySelectorAll('.letter-hidden')
}
