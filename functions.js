// This Function Generates Random Number between 0 & 15
var random_Number_Generator = function(){
	return Math.floor(Math.random()*16);
}
var arr = [];
// Object Constructor
var tiles = function(clas,name,grid_pos,ID){
	this.name = name;
	this.class = clas;
	this.pos = grid_pos;
	this.ID = ID;
};

var presence_Count = function(ar,numb){
	var count=false;
	for(var i=0;i<ar.length;i++){
		if(ar[i]===("#d"+numb)){
			count = true;
			break;
		}
	}
	return count;
}

var grid_Position = function(id_Name,grid_Pos){
	this.id_Name = id_Name;
	this.grid_Pos = grid_Pos;
};

var id_Return = function(num) {			// Returns ID on receiving number input -- Probably Obsolete--
	return ("#d"+num);
}


var random_Array_Generator = function(){  // generate an array of random numbers from 0-15
	var id_Array = [];
	while(id_Array.length!=16){
		var t = random_Number_Generator();
		var bool_val = presence_Count(id_Array,t);
		if(bool_val==false){
			id_Array.push("#d"+t);
		}
	}
	return id_Array;
}

var assignTiles = function(tile_Array){
	var id_Arr = random_Array_Generator();
	// console.log(id_Arr);
	var x,i=0;
	for(x in tile_Array){
		console.log($(id_Arr[i]).addClass(tile_Array[x].class));
		$(id_Arr[i+1]).addClass(tile_Array[x].class);
		tile_Array[x].ID = id_Arr[i]+","+id_Arr[i+1];
		i = i+2;
	}
}

var hide_Items = function(selector){  				// hide Items when provided with selector
	$(selector).css("display","none");
	// console.log("hiding successful");
}

//Make help hover using css. make the help content hover when hovered over that.
// make a function that will trigger START button to begin the game.
// function to trigger a click function on every tile to make a match.
// make a function that will register clicks , updates the score-board.


