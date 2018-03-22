class Bot extends Player{

	constructor(name, type, color) {
		super(name, type, color);
		// this.difficulty = 'easy';
		// console.log('my name is:', this.name)
	}

	botMove() {

		game.isWaitingForBot = true;
		setTimeout(function(){
			do{
				const randomNumber = Math.floor(Math.random() * (game.board.COLS-1));
				let $botEmptyCell = game.board.findLastEmptyCell(randomNumber);
	        	if ($botEmptyCell) {
					game.isWaitingForBot = false;
					$botEmptyCell.trigger('click');
					$botEmptyCell.trigger('mouseleave');
	            	break;
	            }
			}while(true)
		}, 2000);
	} 
}
