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
$("#rating_box")[0].innerHTML = good; // Setting the RAting to Good
time = start_timer(); // Starts the timer.
$(".tiles").on("click",function(){	// On click event for tiles.
	var nid = "#"+$(this)[0].firstChild.id;
	if($(nid).css("display")=="none"){ 		// Check if the click is done on hidden tile
		var id = "#"+$(this)[0].firstChild.id; // Notes the id of the item currently clicked on 
		id_arr.push(id);  // pushes the id in an array for later comparison
	if(unveiled==false){  // If this is first tile clicked,
	animate(this,"flip",400); // perform flipping animation
	prev_div = this; // store current this pointer ina variable for later use
	unveiled = true; // change unvieled to true saying that 1 tile is flipped
	check_found = false; // set check found to be false.
	setTimeout(function(){
		$(id).css("display","block"); // After Some delay , reveal the icon picture.
	},400);
	}
	else if(unveiled==true&&id_arr.length==2){  // If this is 2nd click in which we need to check for correct pair,
		if($("#"+$(this)[0].firstChild.id).css("display")=="none")moves++; // Update move variable
		$(".move-card")[0].innerText = "Moves : "+moves; // update moves in HTML
		unveiled = false; // make unveiled to false.
		var id_check = [id_arr[0] + "," + id_arr[1],id_arr[1] + "," + id_arr[0]]; // a 2 index array which stores ID in both orders to check with the corect order present, every icon is assigned 2 ids , in the form (for example) "#d0,#d4" , so for comparison it stored in both permutations.
		for( var x=0;x<tilesArray.length;x++){ // check withing the tilesArray using loop
			if(tilesArray[x].ID ==id_check[0]||tilesArray[x].ID ==id_check[1]){  // If both clicks contains same icons , 
				animate(this,"flip",400); // Animate flipping on 2nd tile too.
				$(id).css("display","block"); // Unveil the 2nd tile.
				check_found=true; // update check_found to true.
				end = end_game(); // Get status of end game 
				if(end==true){ // If game has ended , 
					time_log=$(".time-card")[0].innerText; // Store the time at which game ended.
					stop_timer(time);// Stop the timer.
					time_log = time_log.substr(6,11); // Extract useful time string from whole inner text.
					if(moves<20) rating = good; // Set Rating according to moves.
					else if(moves>20&&moves<35) rating = ok;
					else rating = worse;
					var entry = new leader_Board(attempt,rating,moves,time_log); // make a new entry in the databse using leaderboard constructor.
					game_stat.push(entry); // push it into the array for log.
					$(".leader").append(leaderboard_insert); // Append the the row to contain new data in leader board.
					enter_lead(attempt,rating,moves,time_log,attempt); // Fill leaderboard with new data.
					$(".r")[0].innerHTML = rating; // Update the present score.
					$(".m")[0].innerText = "Moves -> "+moves;
					$(".t")[0].innerText = "Time -> "+time_log;
					the_end(); // End the Game.
					attempt++; // Increment the attempt.(For Button restart, else junk)
				}
			}
		}
		if(check_found==false){ // If the tiles clicked don't match.
			animate(this,"shake",300); // Play shaking animation on wrong tile
			animate(prev_div,"unflip",400); // unflip the previous tile using prev_div pointer reserved.
			$(id_arr[0]).css("display","none"); // Hide both the tiles.
			$(id_arr[1]).css("display","none");
		}
	id_arr.length = 0; // Clear the id_arr so that new 2 elements can be compared.
}
 
if(moves>20&&moves<35){
	$("#rating_box")[0].innerHTML = ok; // updating the ingame rating.
}
 if(moves>35){
	$("#rating_box")[0].innerHTML = worse;
}
}
});
}

// Restart button on the top status bar
$("a.reset").on("click",function(){ // on click event for restart buttons
	stop_timer(time); // stop the timer.
	$(".tiles").off("click");//turns off any present click events on tiles
	load_game();// restarts game.
});

$(".start").on("click",load_game); // on click event for start button in the beginning of the game.
