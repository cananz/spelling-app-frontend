const phrasesURL = "http://localhost:3000/phrases"
const matchesURL = "http://localhost:3000/matches"
const BODY = document.querySelector('body')

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let currentPhrase;
let matchID;
let turnCount = 0;
let wrongGuessCount = 8;
let phraseMatches;

//event listeners
document.addEventListener("DOMContentLoaded", function() {
  loadLandingPage()
})

function loadLandingPage() {
  BODY.innerHTML = LANDPAGE;
//get list of categories from server
  getCategories()
//category buttons to start game
  categoryBtns().addEventListener("click", startBtnHandler)
}


function startBtnHandler(e) {
  //load a game based on what category is selected
  if (e.target.id === 'starter') { //starter = all categories
    category = 'all'
  } else {
    category = e.target.innerText
  }
  loadGamePage(category)
}


function loadGamePage(category) {
//landing page --> game play page content
  BODY.innerHTML = GAMEPAGE;

    displayGameBoard(category)
    //listener for alphabet buttons
    alphabetContainer().addEventListener('click', eventHandler)
    //listener for newGame button
    newGameBtn().addEventListener('click', restartMatch)
    //listener for alphabet keyboard btns
    document.addEventListener('keydown', eventHandler)
    //listener for instaSolve Form
    instaSolveForm().addEventListener('submit', instaSolve)
}

function eventHandler(e) { //handler for alphabet btns and keys
// event handler for alphabet buttons
  if (e.type === 'click' && e.target.nodeName === 'BUTTON') {
    let guess = e.target.id
    let matches = phraseContainer().querySelectorAll(`#${guess}`)
    guessLetter(guess, matches)
  }
// event handler for pressing on keys, unless typing in InstaSolve Form
  if (e.type === 'keydown'
    && alphabet.includes(e.key.toUpperCase())
    && document.activeElement != instaSolveInput()) {

    let guess = e.key.toUpperCase()
    let matches = phraseContainer().querySelectorAll(`#${guess}`)
    let index = alphabet.indexOf(guess)

    alphabet.splice(index,1)
    guessLetter(guess, matches)
  }
}

function guessLetter(guess, matches){

  alphabetContainer().querySelector('button#' + guess).style.setProperty('visibility', 'hidden')

  if (matches.length === 0) { //check if guess is wrong
    guessLetters().append(guess)
    wrongGuess()
  } else { //if correct guess, make matching phrase tiles visible
    matches.forEach(letterTile => correctGuess(letterTile))
  }
  turnCount += 1

  turnCountElement().innerText = `total guesses: ${turnCount}`

  setTimeout(checkEndStatus, 10)
  }

function wrongGuess() {
    wrongGuessCount -= 1
    //decrements progress bar
    $('#example5')
      .progress('decrement')
    ;
}


function correctGuess(letter) {
  letter.className = 'letter-visible'
}

function configObj(method, body) {
    return {
    method: method,
    headers:  {
      "Content-Type": "application/json",
      "Accepts": "application/json"},
    body: JSON.stringify(body)
    }
}



function getPhraseByCategory(category){
  fetch(phrasesURL, configObj('POST', {body: {category_name: category}}))
    .then(response => response.json())
    .then(phraseObjArray => {
      postMatch(randomPhrase(phraseObjArray))
    })
}


function getPhrase() {
fetch(phrasesURL)
  .then(response => response.json())
  .then(phraseObjArray => {
    postMatch(randomPhrase(phraseObjArray))
  })
  .catch(error => {
    return {message: "Phrase not captured"}
  })
}


function postMatch(phrase) {
  fetch(matchesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      phrase_id: phrase.id
    })
  })
  .then(resp => resp.json())
  .then(matchAndMatches => {
    let match = JSON.parse(matchAndMatches["match"])
    phraseMatches = JSON.parse(matchAndMatches["matches"])
    matchID = match.id
    phraseStats(currentPhrase)
    console.log(match)
  })
}

function randomPhrase(phraseObjArray) {
  let randomIndex = Math.floor((Math.random() * (phraseObjArray.length - 1)))
  currentPhrase = phraseObjArray[randomIndex]
  toDisplay = currentPhrase.content.toUpperCase().split("")
  displayPhrase(toDisplay, 'span', phraseContainer())
return currentPhrase
}
// function randomPhrase(phraseObjArray) {
//   let randomIndex = 0 //Math.floor((Math.random() * (phraseObjArray.length - 1)))
//   currentPhrase = phraseObjArray[randomIndex]
//   toDisplay = currentPhrase.content.toUpperCase().split("")
//   displayPhrase(toDisplay, 'span', phraseContainer())
// return currentPhrase
// }

function displayGameBoard(category) {
  clearBoard()
  displayAlphabet()
  getPhraseByCategory(category)
  // Resets progress bar
  $('#example5')
  .progress({
    label: 'ratio',
    text: {
      ratio: '{value} of {total}'
    }
  })
;
}

function clearBoard() {
  turnCount = 0
  wrongGuessCount = 8
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  turnCountElement().innerText = `total guesses: ${turnCount}`
  guessedLetters().innerText = ""
  currentCategory().innerText = ""
}

function displayAlphabet() {
  alphabetContainer().innerHTML = ""
  alphabet.forEach(letter => {

    letterBlock = document.createElement('button')

      letterBlock.innerText = letter
      letterBlock.setAttribute('id', letter)
      letterBlock.className = 'letter-block'

    alphabetContainer().appendChild(letterBlock)
  })

}


function displayPhrase(Arr, element, parentElement) {
phraseContainer().innerHTML = ""
document.getElementById('phrase-category').innerText = currentPhrase.category
  Arr.forEach(letter => {
    letterContainer = document.createElement('span')
    letterContainer.className = 'letter-container'
    symbolContainer = document.createElement('span')
    symbolContainer.className = 'symbol-container'


    letterBlock = document.createElement('span')

      letterBlock.innerText = letter
      letterBlock.setAttribute('id', letter)

      // debugger
  if (alphabet.includes(letterBlock.id)) {
    // letterBlock.innerText = " "
    letterBlock.className = 'letter-hidden'
    letterContainer.appendChild(letterBlock)
    parentElement.appendChild(letterContainer)


  } else {
    letterBlock.className = 'letter-visible'
    symbolContainer.appendChild(letterBlock)
    parentElement.appendChild(symbolContainer)

  }

  })
}

function phraseStats(phrase) {
  let totalPlay = 0;
  let totalWin = 0;
  let avgTurns = 0;
  let winPercent = 0;
  let playedTimes = document.getElementById("total-plays")
  let winTimes = document.getElementById("total-wins")
  let additional = document.getElementById("additional-stats")

  let phraseWins = phraseMatches.filter((play) => {
    return (play["won?"] === true)
  })
  totalPlay = phraseMatches.length
  playedTimes.innerText = `This puzzle has been played ${totalPlay} times.`
  totalWin = phraseWins.length
  winTimes.innerText = `This puzzle has been won ${totalWin} times.`


  if (phraseWins.length > 10){
    let totalTurns = phraseWins.reduce((accum, currentVal) => {
      return accum += currentVal.turns
    }, 0);
    avgTurns = (totalTurns/totalWin).toFixed(2)
    winPercent = Math.floor(totalWin/totalPlay*100)
    additional.innerHTML = `Win Percentage: ${winPercent}% <br> Avg Turns: ${avgTurns}`
  }
  else {
    additional.innerText = "This puzzle needs more plays for additional stats to be available."
  }
}

function restartMatch() {
  fetch(matchesURL + '/' + matchID, configObj('DELETE', {}))
  .then(resp => resp.json())
  .then(test => {
    displayGameBoard("all")
  })
}

function getCategories() {
  fetch(phrasesURL + '/categories')
  .then(r => r.json())
  .then(categoriesArray => {
    categoriesArray.forEach(category => {
      catBtn = document.createElement('button')
      catBtn.className = 'ui button'
      catBtn.innerText = category
      catBtn.id = category.split(' ')[0]
      categoryBtns().appendChild(catBtn)
    })
  })
}
