const Maze = require('./Maze').Maze,
      Coordinate = require('./Coordinate').Coordinate,
      should = require('chai').should();

describe('Maze', () => {
    describe('constructor', () => {
        it('should create maze with current position and goal position and empty cells', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(5, 5), 1234);
            maze.current.should.deep.equal(new Coordinate(0, 0));
            maze.goal.should.deep.equal(new Coordinate(5, 5));
            maze.cells.should.deep.equal([]);
            maze.modifier.should.equal(1234);
        });
    });

    describe('getMoves', () => {
        it('should get all possible moves from current location', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(5, 5), 10);
            maze.getMoves().should.have.deep.members([
                new Coordinate(0, 1),
            ]);
        });

        it('should get all possible moves from current location in middle of maze', () => {
            let maze = new Maze(new Coordinate(3, 2), new Coordinate(5, 5), 10);
            maze.getMoves().should.have.deep.members([
                new Coordinate(2, 2),
                new Coordinate(3, 1),
                new Coordinate(4, 2),
                new Coordinate(3, 3)
            ]);
        });
    });

    describe('isCellEmpty', () => {
//           0123456789
//         0 .#.####.##
//         1 ..#..#...#
//         2 #....##...
//         3 ###.#.###.
//         4 .##..#..#.
//         5 ..##....#.
//         6 #...##.###

        it('should return true if cell is empty', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(5, 5), 10);
            maze.isCellEmpty(0, 0).should.equal(true);
            maze.isCellEmpty(0, 1).should.equal(true);
            maze.isCellEmpty(6, 4).should.equal(true);
            maze.isCellEmpty(9, 5).should.equal(true);
        });

        it('should return false if cell is a wall', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(5, 5), 10);
            maze.isCellEmpty(1, 0).should.equal(false);
            maze.isCellEmpty(5, 1).should.equal(false);
            maze.isCellEmpty(1, 4).should.equal(false);
            maze.isCellEmpty(7, 6).should.equal(false);
        });
    });

    describe('isComplete', () => {
        it('should be complete if current position equals goal position', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(0, 0), 10);
            maze.isComplete().should.equal(true);
        });

        it('should not be complete if current position does not equal goal position', () => {
            let maze = new Maze(new Coordinate(0, 0), new Coordinate(7, 0), 10);
            maze.isComplete().should.equal(false);
        });
    });
});