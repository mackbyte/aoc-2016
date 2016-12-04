const Room = require('./Room').Room;

class RoomCodeReader {
    constructor() {}

    read(roomCodes) {
        return roomCodes.map(roomCode => new Room(roomCode))
    }

    total(rooms) {
        return rooms.filter(room => room.isReal())
                    .map(realRoom => realRoom.sectorId)
                    .reduce((a, b) => a+b, 0);
    }
}

module.exports = {
    RoomCodeReader
};