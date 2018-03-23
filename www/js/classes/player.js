// We need this class to creat the instances of the players,
// We can send and save this data (instances) by Json
// It seems that class Bot will be a part of class Player, but I'm not sure, we need to think about it.

class Player {

	constructor(name, type, color) {
	  	this.name = name;
	  	this.type = type;
	  	this.color = color;
	  	this.score = 0;  	
	}
   
}