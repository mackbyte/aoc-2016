const Maze = require('./Maze').Maze,
      Graph = require('./Graph').Graph;

class Simulation {
    constructor(start, goal, modifier) {
        this.maze = new Maze(start, goal, modifier);
        this.graph = new Graph();
        this.queue = [0];
        this.graph.addSourceNode(0, start, []);
    }

    solve() {
        let num;
        while(this.queue.length > 0) {
            num = this.queue.shift();
            this.maze.current = this.graph.getNode(num).data;

            if(!this.maze.isComplete()) {
                let moves = this.maze.getMoves();
                moves.forEach(move => {
                    if(!Object.keys(this.graph.nodes).some(node => this.graph.getNode(node).data.equal(move))) {
                        let next = this.graph.size();
                        this.queue.push(next);
                        this.graph.addNode(next, move, [num]);
                    }
                });
            } else {
                break;
            }
        }

        let solution = this.pathToOrigin(num).reverse();
        return {
            steps: solution.length-1,
            solution
        };
    }

    pathToOrigin(node) {
        if(node === 0) {return []}

        let link = this.graph.getNode(node).links[0],
            path = [this.graph.getNode(node).data];

        while (link !== 0) {
            path.push(this.graph.getNode(link).data);
            link = this.graph.getNode(link).links[0];
        }

        path.push(this.graph.getNode(0).data);
        return path;
    }

    print() {
        this.maze.print();
    }
}

module.exports = {
    Simulation
};