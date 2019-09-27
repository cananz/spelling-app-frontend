const phrasesURL = "http://localhost:3000/phrases"

const matchesURL = "http://localhost:3000/matches"
const alphabetContainer = document.getElementById('alphabet-container')
const phraseContainer = document.getElementById('phrase-container')
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let currentPhrase

document.addEventListener("DOMContentLoaded", function() {
  display(alphabet, 'button', alphabetContainer)
  getPhrase()
  // debugger
})


//event listeners
alphabetContainer.addEventListener('click', guessLetter)

function guessLetter(e){//debugger
  if (e.target.nodeName === "BUTTON") {
    let matches = document.querySelectorAll(`span#${e.target.id}`)
    matches.forEach(letter => letter.style.color = 'red')
    // debugger
    console.log(e.target.dataset.id)
  }
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
    console.log(match)
  })
}

function randomPhrase(phraseObjArray) {
  let randomIndex = Math.floor((Math.random() * (phraseObjArray.length - 1)))
  currentPhrase = phraseObjArray[randomIndex]
  // debugger
  toDisplay = currentPhrase.content.toUpperCase().split("")
  display(toDisplay, 'span', phraseContainer)
return currentPhrase
}





function display(Arr, element, parentElement) {
  Arr.forEach(letter => {

    letterBlock = document.createElement(element)

      letterBlock.innerText = letter
      letterBlock.setAttribute('id', letter)
      letterBlock.className = 'letter-block'

    parentElement.appendChild(letterBlock)
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
