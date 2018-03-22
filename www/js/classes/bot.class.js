class Bot extends Player{

	constructor(name, type, color) {
		super(name, type, color);
		this.difficulty = 'easy';
		console.log('my name is:', this.name)
	}

	botMove() {
	//	board.findLastEmptyCell(col) 
	}
}
