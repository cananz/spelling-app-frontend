function gameLost() {
  // alert("You won!")
  // alert that you won
  sendLoss()
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

//will need a new attribute for Match won/lost field on Match obj

function configObj(method, body) {
    return {
    method: method,
    headers:  {
      "Content-Type": "application/json",
      "Accepts": "application/json"},
    body: JSON.stringify(body)
    }
}

function sendLoss() {

  fetch(matchesURL + '/' + matchID, configObj('PATCH', {turns: turnCount}))
}
