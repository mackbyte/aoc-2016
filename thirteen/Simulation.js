const Maze = require('./Maze').Maze,
      Graph = require('./Graph').Graph;

class Simulation {
    constructor(start, goal, modifier, maxSteps = 999) {
        this.maze = new Maze(start, goal, modifier);
        this.graph = new Graph();
        this.queue = [0];
        this.graph.addSourceNode(0, start, []);
        this.maxSteps = maxSteps;
    }

    solve() {
        let num = 0,
            step = 0;

        while(this.queue.length > 0) {
            num = this.queue.shift();
            this.maze.current = this.graph.getNode(num).data;
            let depth = this.pathToOrigin(num).length;

            if(!this.maze.isComplete() && depth < this.maxSteps+1) {
                let moves = this.maze.getMoves();
                moves.forEach(move => {
                    if(!Object.keys(this.graph.nodes).some(node => this.graph.getNode(node).data.equal(move)) && step < this.maxSteps) {
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
            unique: this.graph.size(),
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