// This class is a brain of the game and it s in charge of thought (logical) process.
class Game {
	constructor(place) {
		
		this.place = place; // string with div's id	where the grid will be created		
		this.player1 = undefined;
		this.player2 = undefined;
		this.board = undefined;
		this.currentColor = undefined;
		let that = this;

		// Makes the jsonflex Load work with Classes
		JSON._classes(Player, Bot);
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

		   	that.board.setCurrentColor(that.currentColor);

		   	$('#namePlayer1').text(that.player1.name); //display the names on the game board
		   	$('#namePlayer2').text(that.player2.name); //display the names on the game board

		   	// 3. Class Game has subscrition on the function of class Board onPlayerMove():
		   	that.board.onPlayerMove = function(row, col) {
			    // As soon as class Board reports to the class Game that the player has just put a coin
			    // check if there is a winner
			    if (that.checkForWinner(row, col)){
			    	that.board.setGameOver(); // - order to Board to stop the game if there is a winner
			    	let winner = that.currentColor == that.player1.color ? that.player1.name: that.player2.name;
			    	alert(winner + " has won!");
			    	return;
			    } 
			    that.currentColor = that.currentColor == that.player1.color? that.player2.color: that.player1.color;
			    that.board.setCurrentColor(that.currentColor);
			    let currentPlayer;
                currentPlayer = that.currentColor == that.player1.color? that.player1: that.player2;
                
                if (currentPlayer.type == "bot"){                	
                	currentPlayer.botMove();

				}
			}

		});

	} //constructor

	

	checkForWinner(row, col) {
		const that = this;

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
		    return that.currentColor;
		  } else {
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

