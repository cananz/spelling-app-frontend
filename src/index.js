const phrasesURL = "http://localhost:3000/phrases"

const matchesURL = "http://localhost:3000/matches"

document.addEventListener("DOMContentLoaded", function() {
  getPhrase()
})

function getPhrase() {
fetch(phrasesURL)
  .then(response => response.json())
  .then(phraseArray => {
    postMatch(randomPhrase(phraseArray))
  })
  .catch(error => {
    return {message: "Phrase not captured"}
  })
}


function postMatch(randomPhrase) {
  fetch(matchesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      phrase_id: randomPhrase.id
    })
  })
  .then(resp => resp.json())
  .then(match => {
    console.log(match)
  })
}

function randomPhrase(phraseArray) {
  let randomIndex = Math.floor((Math.random() * (phraseArray.length - 1)))
  let randomPhrase = phraseArray[randomIndex]
  return randomPhrase
}
