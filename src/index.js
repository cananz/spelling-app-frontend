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
  getCategories()


  getStart().addEventListener("click", startBtnHandler)}


function startBtnHandler(e) {

    if (e.target.id === 'starter') {
      category = 'all'
    } else {
      category = e.target.innerText
    }
    loadGamePage(category)
  }


function loadGamePage(category) {
  BODY.innerHTML = GAMEPAGE;
  displayGameBoard(category)
  alphabetContainer().addEventListener('click', eventHandler)
  giveUp().addEventListener('click', restartMatch)
  document.addEventListener('keydown', eventHandler)
  document.querySelector('form#insta-solve-form').addEventListener('submit', instaSolve)
}

function eventHandler(e) {
  if (e.type === 'click' && e.target.nodeName === 'BUTTON') {
    let guess = e.target.id
    let matches = phraseContainer().querySelectorAll(`#${guess}`)
    guessLetter(guess, matches)
  }

  if (e.type === 'keydown' && alphabet.includes(e.key.toUpperCase()) && document.activeElement != document.querySelector('input#insta-solve-input')) {
    let guess = e.key.toUpperCase()
    let matches = phraseContainer().querySelectorAll(`#${guess}`)
    let index = alphabet.indexOf(guess)
    alphabet.splice(index,1)
    guessLetter(guess, matches)
  }

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
      document.querySelector('div#category-buttons').appendChild(catBtn)
    })
  })
}



function guessLetter(guess, matches){//debugger

  alphabetContainer().querySelector('button#' + guess).style.setProperty('visibility', 'hidden')

  if (matches.length === 0) { //check if guess is wrong
    document.querySelector('div.guessed-letters').append(guess)
    wrongGuess()
  } else { //if correct guess, make matching phrase tiles visible
    matches.forEach(letterTile => correctGuess(letterTile))
  }
  turnCount += 1

  document.querySelector('div.turn-count').innerText = `total guesses: ${turnCount}`

  setTimeout(checkEndStatus, 10)
  }
//matches is every phrase character that matches the letter guessed


    // debugger



function wrongGuess() {
    wrongGuessCount -= 1
    // document.querySelector('progress.uk-progress').value = wrongGuessCount
    document.querySelector('div.wrong-turn-count').innerText = `wrong guesses remaining: ${wrongGuessCount}`
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
  document.querySelector('div.turn-count').innerText = `total guesses: ${turnCount}`
  document.querySelector('div.wrong-turn-count').innerText = `wrong guesses remaining: ${wrongGuessCount}`
  document.querySelector('div.guessed-letters').innerText = ""
  document.getElementById('phrase-category').innerText = ""
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
