$(document).ready(function () {

  //event listeners
  $("#timeLeft").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessCheck);

})

var trivia = {
  //trivia object properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentQuestion: 0,
  timer: 10,
  timerOn: false,
  timerId: '',
  //questions and answers
  questions: {
    q1: 'How many fighters does an Imperial-class Star Destroyer carry?',
    q2: 'Which company is a major producer of Star Destroyers?',
    q3: 'What is a "Base-Delta-Zero" order?',
    q4: 'How many star destroyers were there at the height of the Empire?',
    q5: "What was the name of the super star destroyer buried on Coruscant to be used as an escape ship for the Emperor?",
    q6: 'Who sold Victory Star Destroyers to the Empire in large quantites?',
  },
  options: {
    q1: ['72', '24', '96', '60'],
    q2: ['Sygor Startech Industries', 'Curich Engineering', 'Koensayr Manufacturing', 'Kuat Drive Yards'],
    q3: ['Emergency powers for planetary martial law', 'Complete surface destruction of a planetary target', 'Immediate withdrawal of all forces from a planet', 'Fire at will'],
    q4: ['1 million', '25,000', '100,000', '5,000'],
    q5: ['Vengeance', 'Reaper', 'Lusankya', 'Iron Fist'],
    q6: ['Black Sun', 'Smugglers Alliance', 'Hutt Cartel', 'Corporate Sector Authority'],
  },
  answers: {
    q1: '72',
    q2: 'Kuat Drive Yards',
    q3: 'Complete surface destruction of a planetary target',
    q4: '25,000',
    q5: 'Lusankya',
    q6: 'Corporate Sector Authority',
  },

  //method to initialize game
  startGame: function () {
    //restarts game results
    trivia.currentQuestion = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    //show game section
    $('#game').show();

    //empty last results
    $('#actionSection').html('');

    //show timer
    $('#timer').text(trivia.timer);

    //remove start button
    $('#start').hide();

    $('#timeLeft').show();

    //ask first question
    trivia.nextQuestion();

  },
  //method to loop through and display questions and options 
  nextQuestion: function () {

    //set timer to 10 seconds each question
    trivia.timer = 10;

    $('#timer').text(trivia.timer);

    //to prevent timer from breaking
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    //gets all the questions, then shows the current question
    var question = Object.values(trivia.questions)[trivia.currentQuestion];
    $('#question').text(question);

    //creates array of all the question options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentQuestion];

    //appends the question options to the html
    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option">' + key + '</button>'));
    })

  },
  //method to decrement counter and count unanswered if timer runs out
  timerRunning: function () {
    //if timer still has time left and there are still questions left to ask, show timer and decrement
    if (trivia.timer > -1 && trivia.currentQuestion < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;

    }
    //when the time has run out, increment unanswered, clear timer, and wait 3 seconds while showing a message
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#actionSection').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentQuestion] + '</h3>');

    }
    //if all the questions done, end game and show results
    else if (trivia.currentQuestion === Object.keys(trivia.questions).length) {
      //hides game section
      $('#game').hide();

      //appends results of game (correct, incorrect, unanswered) to the html
      if (trivia.correct === 6) {
        $('#actionSection')
        .html('<h3>You beat the game! All answers correct!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>' +
          '<p>May The Force Be With You!</p>');
      } else {
        $('#actionSection')
          .html('<h3>Thanks for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unaswered: ' + trivia.unanswered + '</p>' +
            '<p>May The Force Be With You!</p>');
      }




      //shows start button to begin a new game
      $('#start').show();
    }

  },
  //method to evaluate the option clicked
  guessCheck: function () {

    //prevents clicking after answering
    $('.option').attr("disabled", true);


    //timer ID for gameResult setTimeout
    var resultId;

    //the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentQuestion];

    //if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {

      //turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#actionSection').html('<h3>Correct!</h3>');
    }
    //else the user picked the wrong option, increment incorrect
    else {

      //turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#actionSection').html('<h3>Incorrect, the answer was: ' + currentAnswer + '</h3>');
    }

  },
  //method to remove previous question results and options
  guessResult: function () {

    //increment to next question set
    trivia.currentQuestion++;

    //remove the options and results
    $('.option').remove();
    $('#actionSection h3').remove();

    //begin next question
    trivia.nextQuestion();

  }

}






/*$(document).ready(function () {



  //'start game' button to change/add html elements and start timer
  //time limit timer once the user clicks, ends game

  //jquery to change html elements stored in arrays...
  //...based on logic of clicking through game (advanced version?)

  //validation to allow only one guess per question - boolean

  //game ends when 'done' button clicked or timer runs out
  //page reveals correct and incorrect guesses at end

  //demo - https://youtu.be/fBIj8YsA9dk

  //need variables to account for correct and incorrect guesses (ex.below logic.js)

});//close ready function
*/
