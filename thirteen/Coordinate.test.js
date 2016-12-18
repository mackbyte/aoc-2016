const Coordinate = require('./Coordinate').Coordinate,
      should = require('chai').should();

describe('Coordinate', () => {
    describe('equal', () => {
        it('should be equal if x and y are equal', () => {
            let coord1 = new Coordinate(1, 1);
            let coord2 = new Coordinate(1, 1);
            coord1.equal(coord2).should.equal(true);
        });

        it('should not be equal if x is different', () => {
            let coord1 = new Coordinate(1, 1);
            let coord2 = new Coordinate(2, 1);
            coord1.equal(coord2).should.equal(false);
        });

        it('should not be equal if y is different', () => {
            let coord1 = new Coordinate(1, 1);
            let coord2 = new Coordinate(1, 2);
            coord1.equal(coord2).should.equal(false);
        });

        it('should not be equal if x and y is different', () => {
            let coord1 = new Coordinate(1, 1);
            let coord2 = new Coordinate(2, 2);
            coord1.equal(coord2).should.equal(false);
        });
    });
});