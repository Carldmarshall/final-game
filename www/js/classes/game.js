// This class is a brain of the game and it s in charge of thought (logical) process.
class Game {
	constructor(place) {
		
		this.place = place; // string with div's id	where the grid will be created		
		this.player1 = undefined;
		this.player2 = undefined;
		this.board = undefined;
		this.currentColor = undefined;
		this.currentPlayer;
		this.movesCount = 0;
		let that = this;

		// Makes the jsonflex Load work with Classes
		JSON._classes(Player, Bot, EasyBot, SmartBot);
		// Get the information about the players (load the data from 
		// players.json file):
		JSON._load('players.json').then(function(players) {  // subscription to the resulata of loading from Json-file:
			// when the data is download do this:
			
			// 1.
		   	that.player1 = players[0];
		   	that.player2 = players[1];

		    // 2. Give order to the class Board to create a greed 
			
		   	that.board = new Board(that.place);
			that.currentColor = that.player1.color;
			that.currentPlayer = that.player1;

		   	that.board.setCurrentColorAndType(that.player1.color, that.player1.type);

		   	$('#namePlayer1').text(that.player1.name); //display the names on the game board
		   	$('#namePlayer1').addClass('p1'); //// set the High-light on the current player on the board
		   	$('#namePlayer2').text(that.player2.name); //display the names on the game board

		   	if (that.currentPlayer.type == "bot"){  // If two players are bots              	
                	that.currentPlayer.botMove(that.board, that.player2.color); 
				}

				
		   	// 3. Class Game has subscrition on the function of class Board onPlayerMove():
		   	that.board.onPlayerMove = async function(row, col) {

		   		that.movesCount++;
		   		
				that.currentPlayer.score++;
                $("#player1Score").text(that.player1.score);
                $("#player2Score").text(that.player2.score); 


			    // As soon as class Board reports to the class Game that the player has just put a coin
			    // check if there is a winner
			    if (that.checkForWinner(row, col)){
			    	that.board.setGameOver(); // - order to Board to stop the game if there is a winner
			    	let winner = that.currentPlayer.name;
			    	setTimeout(async function(){		

				    	//Remove "Player1", "Player2" and bots from the High Score list
				    	if (that.currentPlayer.name != "Player 1" && 
				    		that.currentPlayer.name != "Player 2" &&
				    	    that.currentPlayer.type != "bot"){

					    	let highScoreList = await JSON._load('hiscore.json');

					    	highScoreList.push(that.currentPlayer);
					    	
					    	//Leave just the best result of the player in the High Score List
					    	for (let i = highScoreList.length - 1; i >= 0; i--){
					    		for (let j = i - 1; j >= 0; j--){
					    			if (highScoreList[i].name == highScoreList[j].name){
					    				if (highScoreList[i].score/1 <= highScoreList[j].score/1){
					    					highScoreList.splice(j, 1);
					    					i--;
					    				}
					    				else{
					    					highScoreList.splice(i, 1);
					    					break;
					    				}
					    			}
					    		}
					    	} //for Leave the best result

							highScoreList = highScoreList.sort(function(a,b){return a.score - b.score});
					    	highScoreList = highScoreList.slice(0, 4);

					    	JSON._save("hiscore.json", highScoreList);
					    } // Here comes a modal instead of an alert, see modal section in game.html
					    //if (that.player1.type == "human" && that.player2.type == "bot"){ // if you play against a bot and win display this message
			    		if (winner != "Mr.Robot" && winner != "Mr.Data" && that.player2.type == "bot"){	
			    			$('#exampleModalLongTitle').text("YOU WON!");
				    		$('#myModal .modal-body').html("Dear " + winner + ", you won against a bot. That's nice, but we want you to have more friends. Go outside and meet someone irl! YOLO! 😊");
				    		$('#myModal').modal();
			    		} else if ((winner == "Mr.Robot" || winner == "Mr.Data") && that.player1.type == "human"){  //unless both players are bots
					    	$('#exampleModalLongTitle').text("BOT WON"); 
					    	$('#myModal .modal-body').html("I am " + winner + '<br> and I am superior to puny humans.<br> I will rule all of mankind!');
					    	$('#myModal').modal();

			    		} else if (that.player1.type == "bot" && that.player2.type == "bot"){  //unless both players are bots
					    	$('#exampleModalLongTitle').text("BOT WARS"); 
					    	$('#myModal .modal-body').html(winner + ' has won,<br> and will rule over all other bots!');
					    	$('#myModal').modal();
					    } else {				// otherwise display this message. Another modal instead of an alert, see modal in game.html
					    	$('#exampleModalLongTitle').text("\xa0\xa0WINNER\xa0"); 
					    	$('#myModal .modal-body').html(winner + " has won! <br>You are the smartest human in the game.👍");
					    	$('#myModal').modal();
					    }	
					    	
			    	}, 200);
			    
			    	return;
			    } // if checkForWinner


			    // Check if it is a draw
			    if (that.movesCount == 42){
                	that.board.setGameOver();
                	$('#exampleModalLongTitle').text(" GAME OVER");
                	$('#myModal .modal-body').text(" It is a draw!");
				    $('#myModal').modal();
				    return;
                } 

                 
               	// Switch the players
			    that.currentColor = that.currentColor == that.player1.color? that.player2.color: that.player1.color;
                that.currentPlayer = that.currentColor == that.player1.color? that.player1: that.player2;

                // Notify the board that we switched the players
			    that.board.setCurrentColorAndType(that.currentColor, that.currentPlayer.type);

			    // Change the high-light of the current player on the board
			    if($('#namePlayer1').hasClass('p1')){
			    	$('#namePlayer1').removeClass('p1');
			    	$('#namePlayer2').addClass('p2');
			    } 

			    else if($('#namePlayer2').hasClass('p2')){
			    	$('#namePlayer2').removeClass('p2');
			    	$('#namePlayer1').addClass('p1');
			    }
			    
                if (that.currentPlayer.type == "bot"){     
                	let rivalColor = that.currentColor == that.player1.color? that.player2.color: that.player1.color;           	
                	that.currentPlayer.botMove(that.board, rivalColor);
				}
			}

		});

	} //constructor

	

	checkForWinner(row, col) {
		const that = this;
		let winningCellsCoordinats = [{row: row, col: col}]; 

		// Check the ammount of coins of the one color in the given direction:
		function checkDirection(direction) {
		  let total = 0;
		  let i = row + direction.i;
		  let j = col + direction.j;
		  let nextCellColor = that.board.getCellValue(i, j); 
		  
		  while (i >= 0 &&
		    i < that.board.ROWS && // ROW = 6
		    j >= 0 &&
		    j < that.board.COLS && 
		    nextCellColor === that.currentColor) {
				winningCellsCoordinats.push({row: i, col: j});

			    total++;
			    i += direction.i;
			    j += direction.j;
			    nextCellColor = that.board.getCellValue(i, j);
			    
		  }
		  return total;
		}

		function checkWin(directionA, directionB) { //check if there is 4 or more coins of the same color in a row and return color of the winner
		  const total = 1 +
		    checkDirection(directionA) +
		    checkDirection(directionB);
		  if (total >= 4) {
		  	that.board.highlight(winningCellsCoordinats);
		    return that.currentColor;
		  } else {
		  	winningCellsCoordinats = [{row: row, col: col}];
		    return null;
		  }
		}

		function checkDiagonalBLtoTR() {  // strait and the oposit directions from the given cell
		  return checkWin({i: 1, j: -1}, {i: -1, j: 1});
		}

		function checkDiagonalTLtoBR() {
		  return checkWin({i: 1, j: 1}, {i: -1, j: -1});
		}

		function checkVerticals() {
		  return checkWin({i: -1, j: 0}, {i: 1, j: 0});
		}

		function checkHorizontals() {
		  return checkWin({i: 0, j: -1}, {i: 0, j: 1});
		}


		return checkVerticals() || 
		  checkHorizontals() || 
		  checkDiagonalBLtoTR() ||
		  checkDiagonalTLtoBR();
	} //checkForWinner

	
}//class

