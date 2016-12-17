const Building = require('./Building').Building,
      Item = require('./Item').Item,
      Graph = require('./Graph').Graph;

class Simulation {
    constructor() {
        this.state = new Graph();
        this.queue = [];
    }

    initialise(commands) {
        const commandRegex = /(\w+)(?:-compatible)? (microchip|generator)/;
        let building = new Building();

        for(let i = 0; i < commands.length; i++) {
            let command = commands[i],
                match = commandRegex.exec(command);

            while(match) {
                building.addToFloor(i, new Item(match[2], match[1]));
                command = command.slice(match.index + match[0].length);
                match = commandRegex.exec(command);
            }
        }

        this.state.addSourceNode(0, building);
        this.queue.push(0);
        console.log(`Depth:\t1\tSize:\t${this.state.size()}\tElapsed:\t0s`);
    }

    process(num) {
        let node = this.state.getNode(num);
        let building = node.data;

        if(!building.finished()) {
            let moves = building.getMoves();
            // console.log(`Possible Moves: ${moves.length}`);
            moves.forEach(move => {
                let newBuilding = building.makeMove(move);
                let seen = false;
                Object.keys(this.state.nodes).forEach(step => {
                    let seenBuilding = this.state.getNode(step).data;
                    if(newBuilding.equal(seenBuilding)) {
                        // console.log('Buildings equal');
                        // console.log(newBuilding.print(building));
                        // console.log(seenBuilding.print());
                        // console.log(move);
                        // console.log(building.print());
                        seen = true;
                    }
                });
                // console.log(`Seen: ${seen}`);
                if(!seen) {
                    // console.log(`Add state ${num} -> ${this.state.size()}`);
                    // console.log(newBuilding.print(this.state.getNode(num).data));
                    let next = this.state.size();
                    // console.log(next);
                    this.state.addNode(next, newBuilding, [num]);
                    this.queue.push(next);
                }
            });
        } else {
            this.queue = [];
        }
    }

    solve() {
        let depth = 1,
            rowEnd = 1,
            start = new Date().getTime(),
            next;

        while(this.queue.length > 0) {
            next = this.queue.shift();
            this.process(next);
            if(next === rowEnd) {
                rowEnd = this.state.size();
                console.log(`Depth:\t${++depth}\tSize:\t${this.state.size()}\tElapsed:\t${(new Date() - start)/1000}s`);
            }
        }
        console.log(`Depth:\t${++depth}\tSize:\t${this.state.size()}\tElapsed:\t${(new Date() - start)/1000}s`);

        let solution = this.pathToOrigin(next).reverse();

        return {
            steps: solution.length-1,
            solution
        }
    }

    pathToOrigin(node) {
        if(node === 0) {return []}

        let link = this.state.getNode(node).links[0],
            path = [this.state.getNode(node).data];

        while (link !== 0) {
            path.push(this.state.getNode(link).data);
            link = this.state.getNode(link).links[0];
        }

        path.push(this.state.getNode(0).data);
        return path;
    }
}

module.exports = {
    Simulation
};