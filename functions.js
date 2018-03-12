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
	$(selector).attr("style","display: none");
	// console.log("hiding successful");
}
// To assign The symbols to grid.
// var assignTiles = function(tile_Object){
// 	var t = random_Number_Generator();
// 	if(arr.length==0){
// 		tile_Object.
// 		arr.push(new assignment(t));
// 	}
// 	else {	var x,found=0;
// 			for(x in arr){
// 				if(arr[x].val==t){
// 					if(arr[x].appear<2){			// What happens when number has occurred less then 2 times

// 					}
// 					else{							// What happens when number appears more than 2 times

// 					}
// 				}
// 			}
// 		}

// }

