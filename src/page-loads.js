



const LANDPAGE =
`<div class="landing">
<h1>Welcome to the most ultimate spelling game!</h1>

<div id="category-buttons" class="ui buttons category">
<button class = 'ui button category' id="starter">Any Category</button>

</div>


</div>`


// <div class="ui selection dropdown">
//   <input type="hidden" name="category">
//   <i class="dropdown icon"></i>
//   <div class="default text">Category</div>
//   <div class="menu">
//     <div class="item" data-value="all">All</div>
// </div>




const GAMEPAGE =
`<div class="ui grid">
  <!-- HEADING -->
        <div class="row">
          <div class="three wide column"></div>
            <div class="center aligned ten wide column"> <h1>Spelling Game</h1></div>
          <div class="three wide column"></div>
        </div>
</div>
    <div class="wrapper">
    <div class="box box1">
      <div id="phrase-container" class="box">
      </div>
    </div>
    <div id="alphabet-container" class="box box1">
    </div>
  <div class="box box3">
    <div class="ui fluid card">
      <div class="content">
          <div class="header">Phrase Category: </div>
          <div class="ui subheader" id="phrase-category">
          </div>
        </div>
        <div class="content">
          <h4 class="ui sub header">Stats</h4>
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">
                   <p id="total-plays"></p>
                   <p id="total-wins"></p>
                   <p id="additional-stats"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="extra content">
          <button class="ui button" id="restart"
          uk-tooltip="title: Stuck? Click here to start a new puzzle!">New Game</button>
        </div>
    </div>
  </div>
  <div class="progress-box box4">
    Wrong Guesses Left:
    <div class="ui indicating progress" data-value="8" data-total="8" id="example5">
      <div class="bar">
        <div class="progress"></div>
      </div>
    </div>
       <!-- Total Turns Taken: -->

       <div class="nested">Already Guessed:
       </div>
       <div class="nested guessed-letters"></div>

     <div class="turn-count nested">
    </div>

  </div>

  <div class="box box5">
    <div class="ui fluid card" id="insta-solve-card">
      <div class="content">
        <div class="header"><h3>InstaSolve!</h3></div>
        <div class="meta">Enter the phrase here to see if you're correct!</div>
        <div class="desrciption">
          <p>Correctly solve the puzzle in 1 turn to win!</p>
          <p>Careful! If you're wrong, you'll lose 2 turns.</p>
        </div>
      </div>

      <div class="content">
        <form id="insta-solve-form">
          <input type="text" id="insta-solve-input">
          <input type="submit" value="SOLVE!">
        </form>
      </div>
    </div>
  </div>
  </div>`
