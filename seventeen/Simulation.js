const Room = require('./Room').Room,
      Graph = require('./Graph').Graph;

class Simulation {
    constructor(passcode) {
        this.graph = new Graph();
        this.passcode = passcode;
        this.graph.addSourceNode(0, new Room(passcode));
        this.queue = [0];
    }

    solve() {
        let num;

        while(this.queue.length > 0) {
            num = this.queue.shift();
            let room = this.graph.getNode(num).data,
                moves = room.getMoves();

            if(!room.completed()) {
                moves.forEach(move => {
                    let newRoom = room.makeMove(move);
                    this.queue.push(this.graph.size());
                    this.graph.addNode(this.graph.size(), newRoom, [num]);
                });
            } else {
                break;
            }
        }

        return this.graph.getNode(num).data.path;
    }
}

module.exports = {
    Simulation
};