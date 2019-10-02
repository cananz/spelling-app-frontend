const phraseContainer = document.getElementById('phrase-container')


function displayPhrase(ArrOfCharacters) {
  phraseContainer.innerHTML = ""

  ArrOfCharacters.forEach(letter => {

    let card = document.createElement('div')
    card.id = letter

      //letters
  if (alphabet.includes(card.id)) {
    // letterBlock.innerText = " "
    card.innerHTML =

    `<!-- LETTER CONTAINER STARTS -->
    <!-- CARD -->
    <div class="ui raised fluid card">
    <div class="content">
    <div class="ui disabled move reveal">
    <!-- blank tile -->
    <div class="visible content">
    <img src="./assets/placeholder-square.jpeg" class="ui tiny image">
    </div>
    <!-- hidden letter -->
    <div class="hidden content">
    <img src="./assets/i.png" class="ui tiny image">
    </div>
    </div>


    </div>
    </div>
    <!-- LETTER CONTAINER ENDS -->`

  } else { //non-letters
    card.innerHTML =
    `<!-- LETTER CONTAINER STARTS -->
    <!-- CARD -->
    <div class="ui raised fluid card">
    <div class="content">
    <!-- <img src="./assets/placeholder-square.jpeg" class="ui tiny image"> -->
    ${card.id}
    </div>
    </div>
    <!-- LETTER CONTAINER ENDS -->`
  }

  })
}









letterBlock.className = 'letter-hidden'
letterContainer.appendChild(letterBlock)
parentElement.appendChild(letterContainer)
