$(document).ready(function () {
  //instead of starting by hiding elements, 
  //rewrite to write to html to add these elements later after you choose character
  $('#eCharRow').hide();
  $('#dChar1').hide();
  $('#dChar2').hide();
  $('#dChar3').hide();
  $('#dChar4').hide();

  //var test= $('#eCharb1');

  // We can use jQuery to create a listener that listens for a click on all elements with the class myClass using:
  //$(".myClass").on("click", function() { ... })

  var yourCharacter;    // dynamic/global variable used to assign your character
  var enemyCharacter;   // dynamic/global variable used to assign enemy character
  var hpleft;           //used to assign hp and carry it
  var enemyhpleft;           //used to assign enemy hp and carry it
  var attack; //used to store new attack value
  var enemyAttack;

  //create constructor for characters and assign onclick to select

  function character(name,hp, attack,counter) {
    this.name=name;
    this.hp=hp;
    this.attack=attack;
    this.counter=counter;
  }
  //character objects being created
  var luke = new character("luke",100,20,10);
  var leia = new character("leia",50,10,5);
  var han = new character("han",50,10,5);
  var chewbacca = new character("chewbacca",50,10,5);
  
  function disableButton(btn){
		document.getElementById(btn.id).disabled = true;
    //alert("Button has been disabled.");
  }
  /*function disableEButton1(){
    //$('#eCharb2').prop('disabled', true);
    //$('#eCharb3').prop('disabled', true);
    //$('#eCharb4').prop('disabled', true);
    document.getElementById('eChar2b').disabled = true;
    document.getElementById('eChar3b').disabled = true;
    document.getElementById('eChar4b').disabled = true;
    //alert("disabled");
  }*/
  //SELECT YOUR CHARACTER
   $("#char1b").click(function(){
    yourCharacter=luke;
    $('#char2').hide();
    $('#char3').hide();
    $('#char4').hide();
    $('#eCharRow').show();
    $('#eChar1').hide();
    console.log(yourCharacter);
    disableButton(this);
  });

  $("#char2b").click(function(){
    yourCharacter=leia;
    $('#char1').hide();
    $('#char3').hide();
    $('#char4').hide();
    $('#eCharRow').show();
    $('#eChar2').hide();
    console.log(yourCharacter);
    disableButton(this);
  });

  $("#char3b").click(function(){
    yourCharacter=han;
    $('#char2').hide();
    $('#char1').hide();
    $('#char4').hide();
    $('#eCharRow').show();
    $('#eChar3').hide();
    console.log(yourCharacter);
    disableButton(this);
  });

  $("#char4b").click(function(){
    yourCharacter=chewbacca;
    $('#char1').hide();
    $('#char3').hide();
    $('#char2').hide();
    $('#eCharRow').show();
    $('#eChar4').hide();
    console.log(yourCharacter);
    disableButton(this);
  });
 //END SELECT YOUR CHARACTER
    
 //SELECT ENEMY CHARACTER
  $("#eChar1b").click(function(){
    enemyCharacter=luke;
    $('#eChar1').hide();
    $('#dChar1').show();
    if(yourCharacter != leia){document.getElementById('eChar2b').disabled = true;}
    if(yourCharacter != han){document.getElementById('eChar3b').disabled = true;}
    if(yourCharacter != chewbacca){document.getElementById('eChar4b').disabled = true;}
    console.log(enemyCharacter);
  });
  
  $("#eChar2b").click(function(){
    enemyCharacter=leia;
    $('#eChar2').hide();
    $('#dChar2').show();
    if(yourCharacter != luke){document.getElementById('eChar1b').disabled = true;}
    if(yourCharacter != han){document.getElementById('eChar3b').disabled = true;}
    if(yourCharacter != chewbacca){document.getElementById('eChar4b').disabled = true;}
    console.log(enemyCharacter);
  });

  $("#eChar3b").click(function(){
    enemyCharacter=han;
    $('#eChar3').hide();
    $('#dChar3').show();
    if(yourCharacter != luke){document.getElementById('eChar1b').disabled = true;}
    if(yourCharacter != leia){document.getElementById('eChar2b').disabled = true;}
    if(yourCharacter != chewbacca){document.getElementById('eChar4b').disabled = true;}
    console.log(enemyCharacter);
  });

  $("#eChar4b").click(function(){
    enemyCharacter=chewbacca;
    $('#eChar4').hide();
    $('#dChar4').show();
    if(yourCharacter != leia){document.getElementById('eChar2b').disabled = true;}
    if(yourCharacter != han){document.getElementById('eChar3b').disabled = true;}
    if(yourCharacter != luke){document.getElementById('eChar1b').disabled = true;}
    console.log(enemyCharacter);
  });
 //END SELECT ENEMY CHARACTER
   
 //Attack Logic
 $("#attack").click(function(){
   //if leia vs luke
  if(yourCharacter == leia && enemyCharacter == luke){
    /*
    leia.hp=hpleft;
    leia.attack=attack;
    luke.hp=enemyhpleft;
    luke.counter=enemyAttack;    
    hpleft=hpleft-enemyAttack;
    */
   var fhp = 50;
   var ehp=100;
   var fatt=10;
   var eatt=10;
   battle();
   function battle(){
    fhp-eatt==fhp;
    ehp-fatt==ehp;
   }
    $("#hpLeft").append(fhp);
    $("#enemyHpLeft").html(ehp);
    $("#battleLog").html("Leia attacks Luke for " +  + " damage<br>Luke counterattacks Leia for " + enemyAttack + " damage");
   
    //}while(hpleft>0 || enemyhpleft >0);
  }//end leia vs luke
 });
   

});//close ready function

