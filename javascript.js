// File With main javascript actions
// Object Parameter Format -
// tiles(font-awesome class associated with tha symbol,name_of_symbol,grid_position,id_associated_with_that)
// var tilesArray = [tiles]
// console.log($(".grid")[0].attributes[0].nodeValue);

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
assignTiles(tilesArray);
console.log(tilesArray);

hide_Items(".status-bar");
hide_Items("#game-box");
