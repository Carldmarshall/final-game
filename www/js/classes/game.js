class Game {
	constructor(place) {
		
		this.place = place; // string with div's id	
		
		this.player1;
		this.player2; 
		this.board;
		let that = this;

		// Load the data from players.json file
		JSON._load('players.json').then(function(players) {  // subscription to the resulata of loading
			// when the data is download do this:
		   	that.player1 = players[0];
		   	that.player2 = players[1];
		  
			// Cozdanije borda vkljucheno v podpisku, inache on budet postrojen ran'she chem 
			//poluchenu dannyje ob igrokah (name, type och color) iz fajla json
		   	that.board = new Board(that.place, that.player1.color, that.player2.color);

		   	$('#namePlayer1').text(that.player1.name); //add the names on the game board
		   	$('#namePlayer2').text(that.player2.name); //add the names on the game board

		   	that.board.onPlayerMove = function(row, col) {
			    if (that.checkForWinner(row, col)){
			    	that.board.setGameOver();
			    	let winner = that.board.color == that.player1.color? that.player2.name: that.player1.name;
			    	alert(winner + " is a winner!");
			    	return;
			    }

			    
			}
		   	//game-function

		});

	} //constructor


	

	checkForWinner(row, col) {
		const that = this;

		// Proverjaet kolichestvo fishek aktivnogo igroka v zadannom napravlenii
		function checkDirection(direction) {
		  let total = 0;
		  let i = row + direction.i;
		  let j = col + direction.j;
		  let nextCellColor = that.board.getCellValue(i, j);

		  while (i >= 0 &&
		    i < that.board.ROWS && // ROW - eto kolichestvo rjadov = 6
		    j >= 0 &&
		    j < that.board.COLS && 
		    nextCellColor === that.board.color) {
			    total++;
			    i += direction.i;
			    j += direction.j;
			    nextCellColor = that.board.getCellValue(i, j);
			}
		  return total;
		}

		function checkWin(directionA, directionB) { //proverjajet est' li 4 v rjad v zadannyh napravlenijah
		  const total = 1 +
		    checkDirection(directionA) +
		    checkDirection(directionB);
		  if (total >= 4) {
		    return that.board.color;
		  } else {
		    return null;
		  }
		}

		function checkDiagonalBLtoTR() {  // pokazyvaet v kakom napravlenii proizvodit' proverku
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

