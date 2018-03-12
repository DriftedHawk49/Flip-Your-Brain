// File With main javascript actions
// Object Parameter Format -
// tiles(font-awesome class associated with tha symbol,name_of_symbol,grid_position,id_associated_with_that)
// var tilesArray = [tiles]
// console.log($(".grid")[0].attributes[0].nodeValue);

var tilesArray = [
new tiles(".fa-glass","glass"),
new tiles(".fa-road","road"),
new tiles(".fa-qrcode","qr-code"),
new tiles(".fa-gift","gift"),
new tiles(".fa-leaf","leaf"),
new tiles(".fa-bar-chart","bar-chart"),
new tiles(".fa-cogs","gears"),
new tiles(".fa-camera-retro","camera")
];


console.log(tilesArray);
