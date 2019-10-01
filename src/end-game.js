

function checkEndStatus() {
  if (document.querySelectorAll('span.letter-hidden').length === 0) {
    gameWon()
  }
  // debugger
  if (wrongGuessCount === 0){
    gameLost()
  }
}


function gameWon() {
  // alert("You won!")
  // alert that you won
  sendMatchEnd(true)

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
      if (!result.value) {
        displayGameBoard()
        Swal.fire({
        position: 'top-end',
        title: '<i>Thanks for playing! Come back soon!</i>',
        showConfirmButton: false,
        timer: 1500
      })
    }
    })


}



function gameLost() {
  // alert("You won!")
  // alert that you won
  sendMatchEnd(false)
  Swal.fire({
    title: `<strong>You ran out of incorrect guesses!</strong>`,
    type: 'error',
    imageUrl: 'https://media1.tenor.com/images/c374c51f3cda56583cf23bac6f9a0230/tenor.gif',
      imageHeight: 200,

    showCloseButton: true,
    focusConfirm: false,

    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Try Again!',
    confirmButtonAriaLabel: 'Try Again!',
  })
  .then((result) => {
    if (result.value) {
      displayGameBoard()}
    if (!result.value) {
      displayGameBoard()
      Swal.fire({
      position: 'top-end',
      title: '<i>Thanks for playing! Come back soon!</i>',
      showConfirmButton: false,
      timer: 1500
      })
    }
    })


}


function sendMatchEnd(wonValue) {

  fetch(matchesURL + '/' + matchID, configObj('PATCH', {turns: turnCount, 'won?': wonValue}))
}
