$(document).ready(function () {

 //variables for tally
 var gemCount= 0; 
 var wins= 0;
 var losses = 0;
 //Appends wins and losses to ids
 $('#numWins').text(wins);
 $('#numLosses').text(losses);
// Sets a number between 19 - 120
var goal=Math.floor(Math.random()*101+19)
//Appends the number to the numberGoal id
$('#numberGoal').text(goal);
// Sets random numbers for each gem between 1 - 12
var gem1= Math.floor(Math.random()*11+1)
var gem2= Math.floor(Math.random()*11+1)
var gem3= Math.floor(Math.random()*11+1)
var gem4= Math.floor(Math.random()*11+1)
  
 //resets game while maintaining tally
function reset(){
      goal=Math.floor(Math.random()*101+19);//resets goal to random number 19-120
      $('#numberGoal').text(goal);//appends goal to numberGoal id
      gem1= Math.floor(Math.random()*11+1);//setting gem numbers 1-12
      gem2= Math.floor(Math.random()*11+1);
      gem3= Math.floor(Math.random()*11+1);
      gem4= Math.floor(Math.random()*11+1);//end gem setting
      gemCount= 0;//resets total gems collected by user
      $('#score').text(gemCount);//appends total to score id
      } 

//adds wins and appends to the numWins id
function youWon(){
alert("You won!");
  wins++; 
  $('#numWins').text(wins);
  reset();
}

//adds losses and appends to the numLosses id
function youLost(){
alert ("You lost!");
  losses++;
  $('#numLosses').text(losses);
  reset();
}

//===================Jewel click functions==============================
  $('#gemOne').on ('click', function(){//click gem one, run this function
    gemCount = gemCount + gem1;//update total with specific gem value
    $('#score').text(gemCount);//appends score to gemCount id
        if (gemCount == goal){//checks total with goal, if equal, you won
          youWon();//updates wins and appends to html
        }
        else if ( gemCount > goal){//if total exceeds goal, you lose
          youLost();//updates losses and appends to html
        }   
  })//end gemOne  

  $('#gemTwo').on ('click', function(){
    gemCount = gemCount + gem2;
    $('#score').text(gemCount); 
        if (gemCount == goal){
          youWon();
        }
        else if ( gemCount > goal){
          youLost();
        } 
  })//end gemTwo  

  $('#gemThree').on ('click', function(){
    gemCount = gemCount + gem3;
    $('#score').text(gemCount);
          if (gemCount == goal){
          youWon();
        }
        else if ( gemCount > goal){
          youLost();
        } 
  })//end gemThree  

  $('#gemFour').on ('click', function(){
    gemCount = gemCount + gem4;
    $('#score').text(gemCount); 
          if (gemCount == goal){
          youWon();
        }
        else if ( gemCount > goal){
          youLost();
        }
  })//end GemFour   
  //================End Jewel Click Functions========================
});//close ready function

