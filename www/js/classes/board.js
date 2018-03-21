class Board {
	constructor(place, color1, color2) {
	  	this.ROWS = 6;
	    this.COLS = 7;
	    this.place = place;	
	    this.color1= color1;
	    this.color2= color2;    
	    this.createGrid();
	    this.setupEventListeners();
	    this.onPlayerMove = function(row, col) {}; ////////////////////////////////////////////
	    this.color = this.color1;  //current color
	    //this.currentColor; // ustanavlivajetsa gejmom
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

  	setupEventListeners() {

	    const that = this;


	    function markNext(col){
	       const $lastEmptyCell = that.findLastEmptyCell(col);
	       if ($lastEmptyCell != null){
	            $lastEmptyCell.addClass('next-' + that.color); 
	        }
	    }

	    const $board = $(this.place);

	    $board.on('mouseenter', '.col.empty', function(){
	    	if (that.isGameOver) return;
	        markNext($(this).data('col'));
	    });

	    $board.on('mouseleave', '.col', function(){
	        $('.col').removeClass('next-' + that.color);
	    });

	    $board.on('click', '.col.empty', function(){
	    	if (that.isGameOver) return;
	        const col = $(this).data('col');
	        const $lastEmptyCell = that.findLastEmptyCell(col);
	        $lastEmptyCell.removeClass('empty next-' + that.color);       
	        that.color = that.color == that.color1 ? that.color2 : that.color1;
	        $lastEmptyCell.addClass(that.color);
	        markNext(col);
	        that.onPlayerMove($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));///////////////////////////////////////////////////////////////
	    });

  	}

    getCellValue(i, j) {   // f-tsija, kotoraja nahodit i vozvraschaet div s zadannym rjadom i  i kolonkoj j
    	let $cell = $(`.col[data-row='${i}'][data-col='${j}']`);
    	
    	// Esli takoj jachejki ne suschestvujet - vernut null
    	if (i < 0 || j < 0
    		|| i > this.ROWS-1 || j > this.COLS - 1) return null;

		if ($cell.hasClass("empty")) return "empty";
    	return $cell.attr('class').split(' ')[1];
	}

	setGameOver(){
		this.isGameOver = true;
	}

	setColor(color){
		//this.currentColor = color;
	}

}