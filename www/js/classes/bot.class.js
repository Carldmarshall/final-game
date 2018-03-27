class Bot extends Player{

	constructor(name, type, color) {
		super(name, type, color);
		
		// this.difficulty = 'easy';
		// console.log('my name is:', this.name)
	}

	botRandomMove(board) {
		setTimeout(function(){
			do{
				const randomNumber = Math.floor(Math.random() * (board.COLS));
				if (board.getLastEmptyRow(randomNumber)) {
					board.put(randomNumber);
					break;
				}
			}while(true)
		}, 900);
	} //botMove


	smartBotMove(board, rivalColor){
	    let that = this;

		setTimeout(function(){

			//1. Put the 4th bot's coin:
			for (let col = 0; col < board.COLS; col++){ // checking of the all last empty cells
				let row = board.getLastEmptyRow(col);
				if (row == null) continue;
				let maxLength = that.countMaxLength(board, row, col, that.color);
				if (maxLength >= 4){
					board.put(col);
					return;
				}
			}


			//2. Prevent 4 coins of the rival
			for (let col = 0; col < board.COLS; col++){
				let row = board.getLastEmptyRow(col);
				if (row == null) continue;
				let maxLength = that.countMaxLength(board, row, col, rivalColor);
				if (maxLength >= 4){
					board.put(col);
					return;
				}
			}


			//3. Prevent 3 coins of the rival if they are perspektiv (it's possible to build 4 in a row):
			for (let col = 0; col < board.COLS; col++){
				let row = board.getLastEmptyRow(col);
				if (row == null) continue;
				// max count of the rival cells
				let maxLengthRivalCells = that.countMaxLength(board, row, col, rivalColor);
				if (maxLengthRivalCells >= 3){
					// Check first if it is possible for the rival to put the coin on top of the 
					// last bot's coin och bulid 4 in a row:					
					if (row > 0) {
						let nextRivalMove = that.countMaxLength(board, row-1, col, rivalColor);
						if (nextRivalMove >= 4) continue;
					}

					board.put(col);
					return;
				}
			}

					
			//4. Put the 3d bot's coin if there is perspective to build 4 in a row:
			for (let col = 0; col < board.COLS; col++){
				let row = board.getLastEmptyRow(col);
				if (row == null) continue;

				let maxLengthBotCells = that.countMaxLength(board, row, col, that.color);
				if (maxLengthBotCells >= 3){
					// Check first if it is possible for the rival to put the coin on top of the 
					// last bot's coin och bulid 4 in a row:					
					if (row > 0) {
						let nextRivalMove = that.countMaxLength(board, row-1, col, rivalColor);
						if (nextRivalMove >= 4) continue;
					}
					
					board.put(col);
					return
				}
			}

						
			//5. Put the 2d bot's coin if there is perspective to build 4 in a row:
			for (let col = 0; col < board.COLS; col++){
				let row = board.getLastEmptyRow(col);
				if (row == null) continue;
				// max count of the  bot's cells
				let maxLengthBotCells = that.countMaxLength(board, row, col, that.color);
				if (maxLengthBotCells >= 2){
					// Check first if it is possible for the rival to put the coin on top of the 
					// last bot's coin och bulid 4 in a row:					
					if (row > 0) {
						let nextRivalMove = that.countMaxLength(board, row-1, col, rivalColor);
						if (nextRivalMove >= 4) continue;
					}
					board.put(col);
					return
				}
			}


			//6. Put the bot's coin into the random cell:
			let lastEmptyColumn;

			for (let i = 0; i < 40; i++) {
				let col = Math.floor(Math.random() * (board.COLS));
				let row = board.getLastEmptyRow(col);
				if (row != null) {
					lastEmptyColumn = col;

					// Check first if it is possible for the rival to put the coin on top of the 
					// last bot's coin och bulid 4 in a row:					
					if (row > 0) {
						let nextRivalMove = that.countMaxLength(board, row-1, col, rivalColor);
						if (nextRivalMove >= 4) continue;
					}
					board.put(col);
					return;
				}
			}

			board.put(lastEmptyColumn);
			

		}, 900); //setTimeout
	}//smartBotMove


	// Returns the max length of the cells in a row, provided it's perspective
	countMaxLength(board, row, col, color){

		function checkDirection(direction) {

			// 1. How many already in a row?
			let totalInRow = 0;
		    
		    let r = row + direction.i;
		    let c = col + direction.j;
		    let nextCellColor = board.getCellValue(r, c); 
    
			while (r >= 0 &&
				    r < board.ROWS && // ROW = 6
				    c >= 0 &&
				    c < board.COLS && 
				    nextCellColor === color) {
				totalInRow++;
			    r += direction.i;
			    c += direction.j;
			    nextCellColor = board.getCellValue(r, c);			    
		    }

		    // 2. What is the perspective? (color + empty)
			let totalPerspective = 0;

			r = row + direction.i;
		    c = col + direction.j;
		    nextCellColor = board.getCellValue(r, c); 
    
			while (r >= 0 &&
				    r < board.ROWS && // ROW = 6
				    c >= 0 &&
				    c < board.COLS && 
				    (nextCellColor === color || nextCellColor == "empty")) {
			    totalPerspective++;
			    r += direction.i;
			    c += direction.j;
			    nextCellColor = board.getCellValue(r, c);			    
		    }

		    return {totalInRow: totalInRow, totalPerspective: totalPerspective};
		} //checkDirection


		//
		function checkCountOfCellsInRow(directionA, directionB) { //check if there is 4 or more coins of the same color in a row and return color of the winner
		    let dirA = checkDirection(directionA);
		    let dirB = checkDirection(directionB);

		    if ((dirA.totalPerspective + 1 + dirB.totalPerspective) >= 4)
		    	return dirA.totalInRow + 1 + dirB.totalInRow;

			return 0;
		}

		function checkDiagonalBLtoTR() {  // strait and the oposit directions from the given cell
		  return checkCountOfCellsInRow({i: 1, j: -1}, {i: -1, j: 1});
		}

		function checkDiagonalTLtoBR() {
		  return checkCountOfCellsInRow({i: 1, j: 1}, {i: -1, j: -1});
		}

		function checkVerticals() {
		  return checkCountOfCellsInRow({i: -1, j: 0}, {i: 1, j: 0});
		}

		function checkHorizontals() {
		  return checkCountOfCellsInRow({i: 0, j: -1}, {i: 0, j: 1});
		}

		let maxLengthVertical = checkVerticals(); 
        let maxLengthHorizontal = checkHorizontals(); 
		let maxLengthDiagonalBLtoTR = checkDiagonalBLtoTR();
		let maxLengthDiagonalTLtoBR = checkDiagonalTLtoBR();

		return Math.max(maxLengthVertical,
						maxLengthHorizontal,
						maxLengthDiagonalBLtoTR,
						maxLengthDiagonalTLtoBR);
		
	}//countMaxLength

} // class Bot