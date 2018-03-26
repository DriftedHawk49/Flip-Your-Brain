// Definitions of some global variables , mostly objects or long strings.
var good = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
var ok = "<i class=\"fas fa-star\"></i><i class=\"fas fa-star\"></i>";
var worse = "<i class=\"fas fa-star\"></i>";
var attempt = 1;
var game_stat = [];
var leaderboard_insert = "<span id = \"attempt\" class =\"titles\"></span><span id = \"rating\" class =\"titles\"></span><span id = \"moves\" class =\"titles\"></span><span id = \"time\" class =\"titles\"></span><br>";

var load_game = function(){

// Array that contains the 8 icons used in the game.
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
var end = false; //variable initiaed with false , which will contain the return value of end_game
var time;  // contains the setInterval type object
var moves =0; // The moves counter
var id_arr = []; // Array that will containt he arrays of to currently under focus tiles.
var rating; // Variable responsible for assigning the rating according to moves.
var unveiled = false; // This variable tells about the state of the tile , hidden or shown
var check_found = false; // Variable used in finding whether a match for them
var time_log; // This variable logs the time of the game after completion
var prev_div; // Stores the previous div for use in animation at later stage.

assignTiles(tilesArray); // Function accepts the tiles array & assigns it the tile icon.

start_game();
$("#rating_box")[0].innerHTML = good;
time = start_timer(); // Starts the timer.

$(".tiles").on("click",function(){
	var nid = "#"+$(this)[0].firstChild.id;
	if($(nid).css("display")=="none"){
		var id = "#"+$(this)[0].firstChild.id;
		id_arr.push(id);

		if(id_arr.length==2){
		if($("#"+$(this)[0].firstChild.id).css("display")=="none")moves++;
		$(".move-card")[0].innerText = "Moves : "+moves;
		}

	if(unveiled==false){
	animate(this,"flip",400);
	prev_div = this;
	unveiled = true;
	check_found = false;
	setTimeout(function(){
		$(id).css("display","block");
	},400);
	}
	else if(unveiled==true&&id_arr.length==2){
	unveiled = false;
	var id_check = [id_arr[0] + "," + id_arr[1],id_arr[1] + "," + id_arr[0]]
	for( var x=0;x<tilesArray.length;x++){
		if(tilesArray[x].ID ==id_check[0]||tilesArray[x].ID ==id_check[1]){
			animate(this,"flip",400);
			$(id).css("display","block");
			check_found=true;
			end = end_game();
			if(end==true){
				time_log=$(".time-card")[0].innerText;
				stop_timer(time);
				time_log = time_log.substr(6,11);
				console.log(time_log);
				if(moves<20) rating = good;
				else if(moves>20&&moves<35) rating = ok;
				else rating = worse;
				var entry = new leader_Board(attempt,rating,moves,time_log);
				game_stat.push(entry);
				$(".leader").append(leaderboard_insert);
				enter_lead(attempt,rating,moves,time_log,attempt);
				$(".r")[0].innerHTML = rating;
				$(".m")[0].innerText = "Moves -> "+moves;
				$(".t")[0].innerText = "Time -> "+time_log;
				the_end();
				attempt++;

			}
		}
	}
	if(check_found==false){
		animate(this,"shake",300);
		animate(prev_div,"unflip",400);
		$(id_arr[0]).css("display","none");
		$(id_arr[1]).css("display","none");
	}
 id_arr.length = 0;


if(moves>20&&moves<35){
	$("#rating_box")[0].innerHTML = ok;
}
 if(moves>35){
	$("#rating_box")[0].innerHTML = worse;
}
};


// Restart button on the top status bar
$("a.reset").on("click",function(){
	stop_timer(time);
	$(".tiles").off("click");//turns off any present click events on tiles
	load_game();// restarts game.
});


}

$(".start").on("click",load_game);
