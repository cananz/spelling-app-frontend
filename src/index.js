const phrasesURL = "http://localhost:3000/phrases"
const matchesURL = "http://localhost:3000/matches"
const phraseContainer = document.getElementById('phrase-container')



let currentPhrase
let matchID
let turnCount = 0
let wrongGuessCount = 8

document.addEventListener("DOMContentLoaded", function() {
  displayGameBoard()
  // debugger
  alphabetContainer.addEventListener('click', guessLetter)
})

function configObj(method, body) {
  return {
    method: method,
    headers:  {
      "Content-Type": "application/json",
      "Accepts": "application/json"},
      body: JSON.stringify(body)
    }
}


//event listeners





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

    // document.querySelector('.box5').lastElementChild.append(e.target.id)

    document.querySelector('div.turn-count').innerText = `total guesses: ${turnCount}`

  }
  setTimeout(checkEndStatus, 10)

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
  displayPhrase(toDisplay)
return currentPhrase
}

function displayGameBoard() {
  clearBoard()
  alphabetReset()
  // displayAlphabet()
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
  // document.querySelector('div.guessed-letters').innerText = ""
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



function displayPhrase(ArrOfCharacters) {
  // phraseContainer.innerHTML = ""

  ArrOfCharacters.forEach(charString => {
    // debugger

//link image for each charString HEREEEEEEE


    let tile = document.createElement('div')
    if (charString === " ") {
      tile.id = 'tile-space'
      tile.className = "ui segment tile"
    } else if (alphabet.includes(charString.toUpperCase())) {
      tile.id = charString
      tile.className = "ui piled segment tile"
      tile.innerText = charString
    } else {
      tile.id = 'tile-punctuation'
      tile.className = 'ui segment'
      tile.innerText = charString
    }





    // card.innerHTML =
    //   `<div class="content">
    //
    //     <div class="side">${letter}</div>
    //   </div>`


    // card.innerText = letter
      //letters
    // letterBlock.innerText = " "
    // card.outerHTML =




    // `<h2 class="ui header">
    // ${letter}
    // </h2>`
    // `<div class="ui move down reveal">
    //   <div class='visible content'>
    //     <div class='header'> ? </div>
    //   </div>
    //   <div class='hidden content'>
    //     <div class='header'>${card.id}</div>
    //   </div>`




  phraseContainer.appendChild(tile)
  })
}
