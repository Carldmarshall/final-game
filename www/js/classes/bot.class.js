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
					$botEmptyCell.trigger('mouseleave');	
					$botEmptyCell.trigger('click');
	            	break;
	            }
			}while(true)
		}, 900);
	} 
}

/* Dennis board codefunction click randomColumn...
	1. make a random Number */

	let botChoice = Math.floor(Math.random());
//	2. make a random column click
	$('.col' + botChoice).first().click();


/*function tryUntilValidClick
1. let isDone = false;
2. while (isDone == false){
	doThaClick
	if(playerTurnChanged{
	isDone = true;
	})
}

function simulateBotTURN
	set Timeout(function(){
	tryUntilValidClick;

	},2000);

	if(gameISOver){
	
	}

	makeTurn(){
	if (currentPlayer.isBot){
		simulateBotTurn();
	}
	if(gameIsOver){
	quit
	};
	}*/