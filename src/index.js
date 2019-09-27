const phrasesURL = "http://localhost:3000/phrases"

document.addEventListener("DOMContentLoaded", {
  console.log("connected")
  // randomPhrase()
})

function getPhrases(url){
  randomPhrase
  fetch(phrasesURL)
  .then(r => r.json())
  .then(r => {return r})
}

function randomPhrase(all){
  randomPhrase()
}
