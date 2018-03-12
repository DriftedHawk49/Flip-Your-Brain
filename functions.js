// This Function Generates Random Number between 0 & 15
var randomNumberGenerator = function(){
	return Math.floor(Math.random()*16);
}

// Object Constructor
var tiles = function(clas,name,grid_pos,ID){
	this.name = name;
	this.class = clas;
	this.pos = grid_pos;
	this.ID = ID;
};

//
var assignment = function(val){
	this.val;
	this.appear;
};

// To assign The symbols to grid.
var assignTiles = function([]){

}