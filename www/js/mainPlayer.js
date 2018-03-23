// Script for play.html. It saves the user's input (names, chois "human/bot") 
// and send this information to the class Game (see game.js)
JSON._classes(Player, Bot);

$(start);

console.log('hello');
let player1 = new Player("Player 1", "human", "black");
let player2 = new Player("Player 2", "human", "red");
  

function start(){


  $('#input1').on('change', function(){
  	player1.name = $('#input1').val();
  });

  $('#input2').on('change', function(){
  	player2.name = $('#input2').val();
  });

  $('#optionsRadios1').on('change', function(){
  	player2.type = 'human';
    $('#player1').show();
  	$('#player2').show();
  });

  $('#optionsRadios2').on('change', function(){
    player2 = new Bot("Mr.Robot", "bot", "red");
  	$('#player2').hide(200);
  });
 $('#optionsRadios3').on('change', function(){ // for when we have a better bot
    player2 = new Bot("Mr.Data", "bot", "red");
    $('#player2').hide(200);
  });

  $('#optionsRadios4').on('change', function(){ // for when we can let the bots play against each other
    player1 = new Bot("Mr.Robot", "bot", "black");
    player2 = new Bot("Mr.Data", "bot", "red");
    $('#player1').hide(200);
    $('#player2').hide(250);

  });

  $('#buttonSave').on('click', function(){

  	let players = [player1, player2];
	JSON._save('players.json', players);
  console.log('yao')

  });


};
