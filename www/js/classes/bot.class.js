class Bot extends Player{

	constructor(name, type, color) {
		super(name, type, color);
		// this.difficulty = 'easy';
		// console.log('my name is:', this.name)
	}

	botMove(board) {
		setTimeout(function(){
			do{
				const randomNumber = Math.floor(Math.random() * (board.COLS-1));
				if (board.existsEmpty(randomNumber)) {
					board.put(randomNumber);
					break;
				}
			}while(true)
		}, 900);
	} 
}
