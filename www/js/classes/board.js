// Board is a stupid class :), which cannot analyse anything.
// It is in charge of desplaying the board to the users including creating a grid
// It executes orders from 
//    1) Users (t.ex. put the coin on the click - see setupEventListeners()),
//    2) Game class (t.ex. creat a grid or stop the game),
//    3) from class Bot (put the coin in this cell)
class Board {
	constructor(place) {
	  	this.ROWS = 6;
	    this.COLS = 7;
	    this.place = place;
	    this.isBot = false;

	    this.createGrid();
	    this.setupEventListeners();
	    

	    //Class board can inform another classes that player has put a coin on the board,
	    // that is necessary for class Game, which check the winner and give the order 
	    // to the bot that it is time to decide a cell to make a move:
	    this.onPlayerMove = function(row, col) {}; // - so class Game has a subscription to this function (look at game.js)
	    this.isGameOver = false;
	}

	createGrid() { 
	    const $board = $(this.place);
	    $board.empty(); //the Jquery function of element's cleaning
	    
	    for (let row = 0; row < this.ROWS; row++) {
	      const $row = $('<div>')
	        .addClass('row');
	      for (let col = 0; col < this.COLS; col++) {
	        const $col = $('<div>')
	          .addClass('col empty')
	          .attr('data-col', col)
	          .attr('data-row', row);
	        $row.append($col);
	      }
	      $board.append($row);
	    }
  	}


    findLastEmptyCell(col) {
        const cells = $(`.col[data-col='${col}']`)
        for (let i = cells.length - 1; i >= 0; i--){
            const $cell = $(cells[i]);
            if ($cell.hasClass('empty')) {
                return $cell;
            }	        
        }
    }

	markNext(col){
    	if (this.isBot) return;

    	const $lastEmptyCell = this.findLastEmptyCell(col);
    	if ($lastEmptyCell != null){
            $lastEmptyCell.addClass('next-' + this.color); 
        }
    }

  	setupEventListeners() {

	    const that = this;
	    
	    const $board = $(this.place);

	    $board.on('mouseenter', '.col.empty', function(){
	    	if (that.isBot) return; // "disable" events if bot
	    	if (that.isGameOver) return;
	        that.markNext($(this).data('col'));
	    });


	    $board.on('mouseleave', '.col', function(){
	        $('.col').removeClass('next-' + that.color);
	    });


	    $board.on('click', '.col.empty', function(){
	    	if (that.isBot) return; // "disable" events if bot
	    	if (that.isGameOver) return;

	        const col = $(this).data('col');
	        const $lastEmptyCell = that.findLastEmptyCell(col);
	        $lastEmptyCell.removeClass('empty next-' + that.color);
        	$lastEmptyCell.addClass(that.color);
	        that.onPlayerMove($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
	    	that.markNext(col);

	    });

  	}


  	
  	// Board can return the css-class of the div (with row i and col j): "red", "black" or "empty"
  	// This function is used by class Game when it's checking the winner
  	// I think that this function will e necessary for the bot when it's chosing the cell for its move
    getCellValue(i, j) {   
    	let $cell = $(`.col[data-row='${i}'][data-col='${j}']`);
    	
    	
    	if (i < 0 || j < 0
    		|| i > this.ROWS-1 || j > this.COLS - 1) return null;

		if ($cell.hasClass("empty")) return "empty";
    	return $cell.attr('class').split(' ')[1];
	}

	setGameOver(){      //- the Board stops the game, if the class Game orders.
		this.isGameOver = true;
	}

	setCurrentColorAndType(color, type){
		this.color = color;
		this.isBot = type == "bot"; // true or false
	}

	getLastEmptyRow(col){
		let $cell = this.findLastEmptyCell(col);
		if ($cell == null) return null;
		return $cell.data('row');
	}


	// This method is for the Bot, it puts a coin in the given column
	put(col){
		if (this.isGameOver) return;
		let $lastEmptyCell = this.findLastEmptyCell(col);
	    if ($lastEmptyCell) {
			$lastEmptyCell.removeClass('empty next-' + this.color);
        	$lastEmptyCell.addClass(this.color);
        	this.onPlayerMove($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
	    }
	}


	highlight(arrayOfCells){
    	for (let i= 0; i <arrayOfCells.length; i++){
    		let $cell = $(`.col[data-row='${arrayOfCells[i].row}'][data-col='${arrayOfCells[i].col}']`);
    		$cell.addClass('winner-highlight');	
    	}
    }
	
}

