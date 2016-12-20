const Elves = require('./Elves').Elves,
      should = require('chai').should();

describe('Elves', () => {
    describe('constructor', () => {
        it('should create list of elves, each with 1 present', () => {
            let elves = new Elves(200);
            elves.list.length.should.equal(200);
        });
    });

    describe('solve', () => {
        it('should play the game until only 1 elf is left', () => {
            let elves = new Elves(5);
            elves.solve().should.equal(3);
        });

        it('should play the game until only 1 elf is left with more elves', () => {
            let elves = new Elves(7);
            elves.solve().should.equal(7);
        });

        it('should play the game until only 1 elf is left for larger number of elves', () => {
            let elves = new Elves(8);
            elves.solve().should.equal(1);
        });
    });

    describe('solve2', () => {
        it('should play the game with each elf stealing from the elf across from it', () => {
            let elves = new Elves(5, true);
            elves.solve2().should.equal(2);
        });
    });
});