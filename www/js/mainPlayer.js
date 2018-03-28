// Script for play.html. It saves the user's input (names, chois "human/bot") 
// and send this information to the class Game (see game.js)

$(start);


function start() {
  $('#startsFirst').hide();

  $('#optionsRadios1').on('change', function(){ // human vs human
    $('#player1').show(200);
  	$('#player2').show(200);
    $('#startsFirst').hide(200);
  });

  $('#optionsRadios2').on('change', function(){ // human vs bot - easy
    $('#player1').show(200);    
  	$('#player2').hide(200);
    $('#startsFirst').show(200);
  });

  $('#optionsRadios3').on('change', function(){ //human vs bot - hard
    $('#player1').show(200);  
    $('#player2').hide(200);
    $('#startsFirst').show(200);
  });

  $('#optionsRadios4').on('change', function(){ // bot vs bot - both hard
    $('#player1').hide(200);
    $('#player2').hide(200);
    $('#startsFirst').hide(200);
  });



  $('#buttonSave').on('click', function(){

    let input1 = $('#input1').val();
    if (input1 == "") input1 = "Player 1";

    let input2 = $('#input2').val();
    if (input2 == "") input2 = "Player 2";


    let p1;
    let p2;


    // Player vs player
    if ($('#optionsRadios1').prop("checked")){
      p1 = new Player(input1, "human", "black");
      p2 = new Player(input2, "human", "red");
    }


    // Player vs Easy bot
    else if ($('#optionsRadios2').prop("checked")) {

      if ($('#optionsRadios21').prop("checked")) {
        p1 = new Player(input1, "human", "black");
        p2 = new EasyBot("Mr Robot", "bot", "red");
      }

      if ($('#optionsRadios22').prop("checked")) {
        p1 = new EasyBot("Mr Robot", "bot", "black");
        p2 = new Player(input1, "human", "red");
      }
    }


    // Player vs Hard bot
    else if ($('#optionsRadios3').prop("checked")) {

      if ($('#optionsRadios21').prop("checked")) {
        p1 = new Player(input1, "human", "black");
        p2 = new SmartBot("Mr Data", "bot", "red");
      }

      if ($('#optionsRadios22').prop("checked")) {
        p1 = new SmartBot("Mr Data", "bot", "black");
        p2 = new Player(input1, "human", "red");
      }
    }


    // Bot vs Bot
    else {
      p1 = new SmartBot("Mr Robot", "bot", "black");
      p2 = new SmartBot("Mr Data", "bot", "red");
    }

    
    JSON._classes(Player, Bot, EasyBot, SmartBot);
    JSON._save('players.json', [p1, p2]);

  });


}