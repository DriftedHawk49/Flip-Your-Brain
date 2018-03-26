// This Function Generates Random Number between 0 & 15
var random_Number_Generator = function(){
	return Math.floor(Math.random()*16);
}
// var arr = [];
// Object Constructor
var tiles = function(clas,name,ID){
	this.name = name;
	this.class = clas;
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
		$(id_Arr[i])[0].className = "gicons fas";
		$(id_Arr[i+1])[0].className = "gicons fas";
		$(id_Arr[i]).addClass(tile_Array[x].class);
		$(id_Arr[i+1]).addClass(tile_Array[x].class);
		tile_Array[x].ID = id_Arr[i]+","+id_Arr[i+1];
		i = i+2;
	}
}

var hide_Items = function(selector){  				// hide Items when provided with selector
	$(selector).css("display","none");
}

var show_items = function(selector){
	$(selector).css("display","block");
}

var start_game = function(){
	hide_Items(".initial");
	hide_Items("div.game-end");
	show_items("#game-box");
	show_items(".status-bar");
	hide_Items(".gicons");
	$(".bar-items")[0].innerText = "Time : 00:00";
	$(".bar-items")[1].innerText = "Moves : 0";
}
// For creating array to store data of player
var leader_Board = function(a,r,m,t){
	this.attempt = a;
	this.rating = r;
	this.moves = m;
	this.time = t;
};

// This function helps making a visible
// leader-board entry in the leaderboard.
// n is the parameter to be passed to contact
// which row. 0 is for heading. so n should
// always be greater than 0.
// at = attempt
// ra = rating
// mo = moves
// ti = time
var enter_lead = function(at,ra,mo,ti,n){
$("span#attempt")[n].innerText = at;
$("span#rating")[n].innerHTML = ra;
$("span#moves")[n].innerText = mo;
$("span#time")[n].innerText = ti;
};


var end_game = function(){
	var counter=0;
	for(i=0;i<16;i++){
		if($("#d"+i).css("display")=="block")counter++;
	}

	if(counter==16){
		return true;
	}
	else return false;
}

var the_end = function(){
	hide_Items(".status-bar");
	hide_Items("#game-box");
	show_items(".game-end");
	//Insert Functions ro upload data to Leaderboards.
}

var start_timer = function(){
var ss=00,mm=00;
var timer;
return timer = setInterval(function(){
	if(ss==59){
    	ss=00;
    	mm++;
    }
    else ss++;
    $(".time-card")[0].innerText = "Time : "+mm+":"+ss;
    // console.log(mm+":"+ss);
     }, 1000);
}

var stop_timer = function(t) {
    clearInterval(t);
}

var animate = function(id,animation,t){
	$(id).addClass(animation);
	setTimeout(function(){
		$(id).toggleClass(animation);
	},t);
}
