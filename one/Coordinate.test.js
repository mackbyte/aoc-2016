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

    describe('route', () => {
        it('should give each coordinate on route along + x axis', () => {
            let route = new Coordinate(3, 1).route(new Coordinate(8, 1));
            route.should.deep.equal([
                new Coordinate(4, 1),
                new Coordinate(5, 1),
                new Coordinate(6, 1),
                new Coordinate(7, 1),
                new Coordinate(8, 1)
            ]);
        });

        it('should give each coordinate on route along + y axis', () => {
            let route = new Coordinate(0, 0).route(new Coordinate(0, 5));
            route.should.deep.equal([
                new Coordinate(0, 1),
                new Coordinate(0, 2),
                new Coordinate(0, 3),
                new Coordinate(0, 4),
                new Coordinate(0, 5)
            ]);
        });

        it('should give each coordinate on route along - x axis', () => {
            let route = new Coordinate(0, 0).route(new Coordinate(-3, 0));
            route.should.deep.equal([
                new Coordinate(-1, 0),
                new Coordinate(-2, 0),
                new Coordinate(-3, 0),
            ]);
        });

        it('should give each coordinate on route along - y axis', () => {
            let route = new Coordinate(5, 10).route(new Coordinate(5, 5));
            route.should.deep.equal([
                new Coordinate(5, 9),
                new Coordinate(5, 8),
                new Coordinate(5, 7),
                new Coordinate(5, 6),
                new Coordinate(5, 5),
            ]);
        });
    });
});