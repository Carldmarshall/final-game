class EasyBot extends Bot{

	constructor(name, type, color) {
		//super(name, type, color, botMove(board, rivalColor));
		super(name, type, color);
		
	}

	botMove(board, rivalColor) {
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
}