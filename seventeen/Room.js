const crypto = require('crypto');

class Room {
    constructor(passcode) {
        this.x = 0;
        this.y = 0;
        this.passcode = passcode;
        this.path = "";
    }

    completed() {
        return this.x === 3 && this.y === 3;
    }

    makeMove(move) {
        let newRoom = new Room(this.passcode);
        newRoom.path = this.path;
        newRoom.x = this.x;
        newRoom.y = this.y;

        newRoom.path += move;
        if(move === 'U') {
            newRoom.y--;
        } else if(move === 'D') {
            newRoom.y++;
        } else if(move === 'L') {
            newRoom.x--;
        } else {
            newRoom.x++;
        }

        return newRoom;
    }

    getMoves() {
        let digest = crypto.createHash('md5')
                .update(this.passcode + this.path)
                .digest('hex'),
            dirs = digest.slice(0, 4);

        let moves = [];

        if(parseInt(`0x${dirs[0]}`) > 10 && this.y > 0) {moves.push('U')}

        if(parseInt(`0x${dirs[1]}`) > 10 && this.y < 3) {moves.push('D')}

        if(parseInt(`0x${dirs[2]}`) > 10 && this.x > 0) {moves.push('L')}

        if(parseInt(`0x${dirs[3]}`) > 10 && this.x < 3) {moves.push('R')}

        return moves;
    }
}

module.exports = {
    Room
};