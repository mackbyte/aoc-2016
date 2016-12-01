const fs = require("fs"),
      Navigator = require('./Navigator').Navigator;

fs.readFile("one/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const instructions = data.split(", ");
    const navigator = new Navigator(false);

    navigator.navigate(instructions);

    console.log("Blocks away: " + navigator.getCoordinates().distanceFromOrigin());
});