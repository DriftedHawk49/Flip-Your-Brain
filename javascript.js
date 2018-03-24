// File With main javascript actions
// Object Parameter Format -
// tiles(font-awesome class associated with tha symbol,name_of_symbol,id_associated_with_that)
// var tilesArray = [tiles]
// console.log($(".grid")[0].attributes[0].nodeValue);



//Function that will initiate the game. Currently not fully developed.
// After Complete development, shift this to functions.js
var good = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
var ok = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
var worse = "<i class=\"fas fa-star\"></i>";
var attempt = 1;
var game_stat = [];
var leaderboard_insert = "<span id = \"attempt\" class =\"titles\"></span><span id = \"rating\" class =\"titles\"></span><span id = \"moves\" class =\"titles\"></span><span id = \"time\" class =\"titles\"></span><br>";

// $("a.again").on("click",function(){
// 	attempt++;
// });


var load_game = function(){

var tilesArray = [
new tiles("fa-ambulance","ambulance"),
new tiles("fa-anchor","anchor"),
new tiles("fa-assistive-listening-systems","Assistive Listening Systems"),
new tiles("fa-bug","bug"),
new tiles("fa-bicycle","bicycle"),
new tiles("fa-battery-three-quarters","battery"),
new tiles("fa-asterisk","asterisk"),
new tiles("fa-balance-scale","scale")
];
var end = false;
var time;  // For the notion of game completion.
var moves =0;
var id_arr = [];
var rating;
var unveiled = false;
var check_found = false;
var time_log;

assignTiles(tilesArray);

// console.log(tilesArray);
// hide_Items(".status-bar");
// hide_Items("#game-box");

// $(".start").on("click",start_game);




start_game();
$("#rating_box")[0].innerHTML = good;
time = start_timer();
//tile click event
$(".tiles").on("click",function(){
	var nid = "#"+$(this)[0].firstChild.id;
	// console.log($(nid).css("display"));
if($(nid).css("display")=="none"){
// {  console.log("Real click");
// if($("#"+$(this)[0].firstChild.id).css("display")=="none")moves++;
// $(".move-card")[0].innerText = "Moves : "+moves;   // Updates Moves on the score card

var id = "#"+$(this)[0].firstChild.id;

id_arr.push(id);
// console.log(id_arr.length);
 // Better Move strategy
if(id_arr.length==2){
	if($("#"+$(this)[0].firstChild.id).css("display")=="none")moves++;
	$(".move-card")[0].innerText = "Moves : "+moves;
}

if(unveiled==false){
	unveiled = true;
	check_found = false;
	$(id).css("display","block");
}
else if(unveiled==true&&id_arr.length==2){
	unveiled = false;
	var id_check = [id_arr[0] + "," + id_arr[1],id_arr[1] + "," + id_arr[0]];
	// console.log("Entered else if Ting");
	for( var x=0;x<tilesArray.length;x++){
		if(tilesArray[x].ID ==id_check[0]||tilesArray[x].ID ==id_check[1]){
			$(id).css("display","block");
			check_found=true;
			end = end_game();
			console.log(end);
			if(end==true){
				time_log=$(".time-card")[0].innerText;
				console.log(time_log);
				stop_timer(time);
				time_log = time_log.substr(6,11);
				console.log(time_log);
				if(moves<20) rating = good;
				else if(moves>20&&moves<35) rating = ok;
				else rating = worse;
				var entry = new leader_Board(attempt,rating,moves,time_log);
				game_stat.push(entry);
				$(".leader").append(leaderboard_insert);
				console.log("attempt : "+attempt);
				enter_lead(attempt,rating,moves,time_log,attempt);
				$(".r")[0].innerHTML = rating;
				$(".m")[0].innerText = "Moves -> "+moves;
				$(".t")[0].innerText = "Time -> "+time_log;
				the_end();
				attempt++;

			}
			// Insert the mechanism that is to be reapeted again and again to check whether game is complete.

			// console.log("check found");
		}
	}
	if(check_found==false){
		$(id_arr[0]).css("display","none");
		$(id_arr[1]).css("display","none");
	}
 id_arr.length = 0;

 // insert if condition that if the game is complete , all the stuff regarding leaderboard & other stuff should show up.
}//else-if brace
}//if brace for real click


if(moves>20&&moves<35){
	$("#rating_box")[0].innerHTML = ok;
}
 if(moves>35){
	$("#rating_box")[0].innerHTML = worse;
}


});


// Restart button on the top status bar
$("a.reset").on("click",function(){
	console.log("restart initiated");
	stop_timer(time);
	$(".tiles").off("click");//turns off any present click events on tiles
	load_game();// restarts game.
});


}

$(".start").on("click",load_game);
