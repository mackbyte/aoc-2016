const Coordinate = require('./Coordinate').Coordinate,
      should = require('chai').should();

describe('Coordinate', () => {
    describe('add', () => {
        let coordinate;
        beforeEach(() => {
            coordinate = new Coordinate(0, 0);
        });

        it("should add coordinates", () => {
            let newCoord = coordinate.add(new Coordinate(5, 10));

            newCoord.x.should.equal(5);
            newCoord.y.should.equal(10);
        });
    });

    describe('equals', () => {
        it('should be equal if both coordinates have same values for x and y', () => {
            new Coordinate(3, 6).equals(new Coordinate(3, 6)).should.equal(true);
        });

        it('should not equal if coordinates do not have same values for x and y', () => {
            new Coordinate(9, 6).equals(new Coordinate(3, 6)).should.equal(false);
        });
    });
});