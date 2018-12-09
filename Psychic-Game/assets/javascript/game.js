$(document).ready(function () {

  //GLOBAL VARIABLES
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var wins = 0;
  var losses = 0;
  var guessesLeft = 12;
  var guessesSoFar = 0;
  var usedArray = [];
  $("#winsCount").text(wins);
  $("#lossesCount").text(losses);
  $("#guessesLeftCount").text(guessesLeft);
  $("#guessesSoFarCount").text(guessesSoFar);
  //END GLOBAL VARIABLES

  ranLetter = letters[Math.floor(Math.random() * letters.length)];
  //console.log(ranLetter);

  function jsGuess() {
    ranLetter = letters[Math.floor(Math.random() * letters.length)];
    //console.log(ranLetter);
  }

  document.onkeyup = function (event) {
    //through onkey event, key is recorded as guess
    var guess = event.key;
    //If your guess/guess matches the psychic's guess, win added, and guessesLeft/guessesSoFar restarts.
    if (guess === ranLetter) {
      wins++;
      guessesLeft = 13;
      usedArray = [];
      alert("you won!");
      document.getElementById('guessesSoFarCount').innerHTML = "";
      document.getElementById('winsCount').innerHTML = wins;
      document.getElementById('guessesLeftCount').innerHTML = guessesLeft;
    }
    //If your guess does not match the psychic's guess, guessLeft is reduced
    jsGuess();
    if (guess !== ranLetter) {
      guessesLeft--;
      document.getElementById('guessesLeftCount').innerHTML = guessesLeft;
      usedArray.push(guess);
      document.getElementById('guessesSoFarCount').innerHTML = usedArray;
    }
    //If the guessesLeft equals 0, loss is added and the points restart.
    if (guessesLeft === 0) {
      losses++;
      usedArray = []
      guessesLeft = 12;
      document.getElementById('lossesCount').innerHTML = losses;
      document.getElementById('guessesLeftCount').innerHTML = "12";
      document.getElementById('guessesSoFarCount').innerHTML = "";
    }
    //OUTPUT TO HTML
    document.getElementById('winsCount').innerHTML = wins;
    document.getElementById('lossesCount').innerHTML = losses;
    document.getElementById('guessesLeftCount').innerHTML = guessesLeft;
  }//close onkey


});//close ready function