
let box = document.querySelector('div.box.box3')
let phraseCard = document.createElement('div')
phraseCard.className = "ui card"
phraseCard.innerHTML =
`<div class="content">
    <div class="header">Current Puzzle</div>
  </div>
  <div class="content">
    <h4 class="ui sub header">Stats</h4>
    <div class="ui small feed">
      <div class="event">
        <div class="content">
          <div class="summary">
             <p>This puzzle has been played ${7} times.</p>
             <p>This puzzle has been won 5 times.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="extra content">
    <button class="ui button">New Game</button>
  </div>`

box.appendChild(phraseCard)
