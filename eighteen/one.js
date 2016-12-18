const fs = require("fs"),
      Room = require('./Room').Room;

fs.readFile("eighteen/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const room = new Room(data);

    room.generate(40);

    console.log(`Safe tiles: ${room.safeTiles()}`);
});