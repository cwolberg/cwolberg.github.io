$(document).ready(function () {

  var words = ['corgi', 'eurohound', 'newfoundland', 'labradore', 'beagle', 'pug'];
  var wins = 0;
  var word;
  var allowedGuesses;
  var trueGuesses;
  var falseGuesses;
  //var imgs = ['assets/images/corgi.jpg','assets/images/eurohound.jpg', 'assets/images/newfoundland.jpg'
//  ,'assets/images/labradore.jpg','assets/images/beagle.jpg','assets/images/pug.jpg'];

  
  var wordElement = document.getElementById('wordReveal');
  var letterCountElement = document.getElementById('guesses');
  var lettersGuessedElement = document.getElementById('guessed');

  function newGame() {
    word = words[Math.floor(Math.random() * words.length)];
    allowedGuesses = 12;
    falseGuesses = [];
    trueGuesses = [];
    document.getElementById('guessed').innerHTML = "";
    // new trueGuesses array with underscores
    for (var i = 0; i < word.length; i++) {
      trueGuesses.push('_');
    }
    wordElement.innerHTML = trueGuesses.join(' ');
    letterCountElement.innerHTML = allowedGuesses;
  }

  function updateGuesses(letter) {
    allowedGuesses--; // reduce guesses
    letterCountElement.innerHTML = allowedGuesses;

    if (word.indexOf(letter) === -1) { // letter is not in the word
      falseGuesses.push(letter); // updates letters guessed
      lettersGuessedElement.innerHTML = falseGuesses.join(', ');
    } else {
      //also updates letters guessed with trueLetters
      falseGuesses.push(letter); 
      lettersGuessedElement.innerHTML = falseGuesses.join(', ');
      // replaces underscore with the trueLetter
      for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          trueGuesses[i] = letter;
        }
      }

      wordElement.innerHTML = trueGuesses.join(' ');
    }
  }

  function validateWin() {
    if (trueGuesses.indexOf('_') === -1) {
      wins++;
      document.getElementById('wins').innerHTML = wins;
      alert('You Won!');
      resetGame();
    } else if (allowedGuesses === 0) {
      alert('You Lost!');
      resetGame();
    }
  }

  function resetGame() {
if(word==='pug'){
var img = document.createElement("img");
img.src = "assets/images/pug.jpg";
var src = document.getElementById("picture");
src.appendChild(img);
}
if(word==='eurohound'){
  var img = document.createElement("img");
  img.src = "assets/images/eurohound.jpg";
  var src = document.getElementById("picture");
  src.appendChild(img);
  }
  if(word==='labradore'){
    var img = document.createElement("img");
    img.src = "assets/images/labradore.jpg";
    var src = document.getElementById("picture");
    src.appendChild(img);
    }
    if(word==='beagle'){
      var img = document.createElement("img");
      img.src = "assets/images/beagle.jpg";
      var src = document.getElementById("picture");
      src.appendChild(img);
      }
      if(word==='newfoundland'){
        var img = document.createElement("img");
        img.src = "assets/images/newfoundland.jpg";
        var src = document.getElementById("picture");
        src.appendChild(img);
        }
        if(word==='corgi'){
          var img = document.createElement("img");
          img.src = "assets/images/corgi.jpg";
          var src = document.getElementById("picture");
          src.appendChild(img);
          }
    newGame();
  }

  document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    updateGuesses(letterGuessed);
    validateWin();
  };

  newGame();
/*
  if ($.inArray(imgs[0].toString(),  words) == -1) {
    var container = document.getElementById('picture');
  
      for (var i = 0, j = imgs.length; i < j; i++) {
          var img = document.createElement('img');
          img.src = imgs[i]; // img[i] refers to the current URL.
          container.appendChildChild(img);
      }
    return false;// if not exists
  }*/

});//close ready function

