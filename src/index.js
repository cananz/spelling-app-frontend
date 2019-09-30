const phrasesURL = "http://localhost:3000/phrases"
const matchesURL = "http://localhost:3000/matches"


const alphabetContainer = document.getElementById('alphabet-container')
const phraseContainer = document.getElementById('phrase-container')
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let currentPhrase
let matchID
let turnCount = 0
let wrongGuessCount = 8

//event listeners
document.addEventListener("DOMContentLoaded", function() {
  displayGameBoard()
  // debugger
  alphabetContainer.addEventListener('click', guessLetter)
})





function guessLetter(e){//debugger

  if (e.target.nodeName === "BUTTON") {

    let matches = document.querySelectorAll(`span#${e.target.id}`)
    if (matches.length === 0) {
      wrongGuessCount -= 1
      // document.querySelector('progress.uk-progress').value = wrongGuessCount
      document.querySelector('div.wrong-turn-count').innerText = `wrong guesses remaining: ${wrongGuessCount}`
      //decrements progress bar
      $('#example5')
        .progress('decrement')
      ;
    }
    matches.forEach(letter => letter.className = 'letter-visible')
    // debugger
    turnCount += 1
    console.log(`turn count: ${turnCount}`)

    e.target.style.setProperty('visibility', 'hidden')
    document.querySelector('.box5').lastElementChild.append(e.target.id)
    document.querySelector('div.turn-count').innerText = `total guesses: ${turnCount}`

  }
  setTimeout(checkWinStatus, 10)

}

function checkWinStatus() {
  if (document.querySelectorAll('span.letter-hidden').length === 0) {
    gameWon()
  }
}

function gameWon() {
  // alert("You won!")
  // alert that you won
  sendTurnCount()
  Swal.fire({
    title: `<strong>You solved the puzzle in ${turnCount} moves!</strong>`,
    type: 'success',
    imageUrl: 'https://media.giphy.com/media/2gtoSIzdrSMFO/giphy.gif',
      imageHeight: 200,

    showCloseButton: true,
    focusConfirm: false,

    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Play Again!',
    confirmButtonAriaLabel: 'Play Again!',
  })
  .then((result) => {
    if (result.value) {
      displayGameBoard()
      console.log(turnCount)}
    })


}
  // Try me!
  // Swal.fire({
  //   title: 'Congrats',
  //   imageAlt: 'Win'
  // })

  // give stats
  // send post request to matches
  // ask to play again


function configObj(method, body) {
    return {
    method: method,
    headers:  {
      "Content-Type": "application/json",
      "Accepts": "application/json"},
    body: JSON.stringify(body)
    }
}

function sendTurnCount() {

  fetch(matchesURL + '/' + matchID, configObj('PATCH', {turns: turnCount}))
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
  .then(match => {
    matchID = match.id
    console.log(match)
  })
}

function randomPhrase(phraseObjArray) {
  let randomIndex = Math.floor((Math.random() * (phraseObjArray.length - 1)))
  currentPhrase = phraseObjArray[randomIndex]
  // debugger
  toDisplay = currentPhrase.content.toUpperCase().split("")
  displayPhrase(toDisplay, 'span', phraseContainer)
return currentPhrase
}


function displayGameBoard() {
  clearBoard()

  displayAlphabet()
  getPhrase()
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

  document.querySelector('div.turn-count').innerText = `total guesses: ${turnCount}`
  document.querySelector('div.wrong-turn-count').innerText = `wrong guesses remaining: ${wrongGuessCount}`
  document.querySelector('div.guessed-letters').innerText = ""

}

function displayAlphabet() {
  alphabetContainer.innerHTML = ""
  alphabet.forEach(letter => {

    letterBlock = document.createElement('button')

      letterBlock.innerText = letter
      letterBlock.setAttribute('id', letter)
      letterBlock.className = 'letter-block'

    alphabetContainer.appendChild(letterBlock)
  })

}


function displayPhrase(Arr, element, parentElement) {
phraseContainer.innerHTML = ""

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

// function displayAlphabet(alphaArr) {
//   const alphabetContainer = document.getElementById('alphabet-container')
//   const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
//   alphaArr.map(letter => {
//     span = document.createElement('button')
//     span.innerText = letter
//     alphabetContainer.appendChild(span)
//   })
// }
