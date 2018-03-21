// Script for play.html. It saves the user's input (names, chois "human/bot") 
// and send this information to the class Game (see game.js)

$(start);

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
  	$('#player2').show();
  });

  $('#optionsRadios2').on('change', function(){
  	player2.type = 'bot';
  	player2.name ='Mr. Robot';
  	$('#player2').hide();
  });


  $('#buttonSave').on('click', function(){

  	let players = [player1, player2];
	JSON._save('players.json', players);

  });


};