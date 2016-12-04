const fs = require("fs"),
    RoomCodeReader = require('./RoomCodeReader').RoomCodeReader;

fs.readFile("four/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const roomCodes = data.split('\n'),
        reader = new RoomCodeReader(),
        rooms = reader.read(roomCodes),
        realRooms = reader.realRooms(rooms);

    realRooms.forEach((room) => {
        console.log(`${room.decrypt()} ${room.sectorId}`)
    });
});