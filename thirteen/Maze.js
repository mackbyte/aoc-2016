const Coordinate = require('./Coordinate').Coordinate;

class Maze {
    constructor(current, goal, modifier) {
        this.current = current;
        this.goal = goal;
        this.cells = [];
        this.modifier = modifier;
    }

    isCellEmpty(x, y) {
        if(x < 0 || y < 0) {return false}

        if(this.cells[x] && this.cells[x][y]) {
            return this.cells[x][y];
        }

        let num = x*x + 3*x + 2*x*y + y + y*y + this.modifier,
            bin = (num >>> 0).toString(2).split(''),
            ones = bin.reduce((count, char) => count += char === "1" ? 1 : 0, 0),
            isEmpty = ones % 2 === 0;

        if(!this.cells[x]) {
            this.cells[x] = [];
        }

        this.cells[x][y] = isEmpty;

        return isEmpty;
    }

    getMoves() {
        let moves = [
                {x: this.current.x-1, y: this.current.y},
                {x: this.current.x, y: this.current.y-1},
                {x: this.current.x+1, y: this.current.y},
                {x: this.current.x, y: this.current.y+1},
            ];

        return moves.filter(move => this.isCellEmpty(move.x, move.y)).map(move => new Coordinate(move.x, move.y));
    }

    isComplete() {
        return this.current.equal(this.goal);
    }

    print(solution = []) {
        let max = 0;
        this.cells.forEach((column, xIndx) => {
            column.forEach((cell, yIndx) => {
                max = Math.max(max, xIndx, yIndx);
            });
        });

        let header = '  ';
        for(let i = 0; i < max; i++) {
            header += i;
        }
        console.log(header);

        for(let y = 0; y < max; y++) {
            let row = `${y} `;
            for(let x = 0; x < max; x++) {
                if(this.cells[x] !== undefined && this.cells[x][y] !== undefined) {
                    let inSolution = solution.some(step => step.equal(new Coordinate(x, y)));
                    row += this.cells[x][y] ? inSolution ? '\x1b[32mO\x1b[0m' : '.' : '#';
                } else {
                    row += '?';
                }
            }
            console.log(row);
        }
    }
}

module.exports = {
    Maze
};