const fs = require("fs"),
    RoomCodeReader = require('./RoomCodeReader').RoomCodeReader;

fs.readFile("four/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const roomCodes = data.split('\n'),
          reader = new RoomCodeReader(),
          rooms = reader.read(roomCodes),
          total = reader.total(rooms);

    console.log(total);
});