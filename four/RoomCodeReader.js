const Room = require('./Room').Room;

class RoomCodeReader {
    constructor() {}

    read(roomCodes) {
        return roomCodes.map(roomCode => new Room(roomCode))
    }

    realRooms(rooms) {
        return rooms.filter(room => room.isReal());
    }

    total(rooms) {
        return this.realRooms(rooms)
                    .map(realRoom => realRoom.sectorId)
                    .reduce((a, b) => a+b, 0);
    }
}

module.exports = {
    RoomCodeReader
};