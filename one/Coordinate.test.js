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
});