const Navigator = require('./Navigator').Navigator,
    should = require('chai').should();

describe('Navigator', () => {
    describe('navigate', () => {
        let navigator;
        beforeEach(() => {
           navigator = new Navigator(false);
        });

        it('should default coords 0,0', () => {
            navigator.getCoordinates().x.should.equal(0);
            navigator.getCoordinates().y.should.equal(0);
        });

        it('should be 2,3 after right twice and left 3 times - 5 blocks away', () => {
            navigator.navigate(['R2', 'L3']);
            navigator.getCoordinates().x.should.equal(2);
            navigator.getCoordinates().y.should.equal(3);
            navigator.getCoordinates().distanceFromOrigin().should.equal(5);
        });

        it('should be 0,-2 after right twice 3 times - 2 blocks away', () => {
            navigator.navigate(['R2', 'R2', 'R2']);
            navigator.getCoordinates().x.should.equal(0);
            navigator.getCoordinates().y.should.equal(-2);
            navigator.getCoordinates().distanceFromOrigin().should.equal(2);
        });

        it('should be 10,2 after R5 L5 R5 R3 - 12 blocks away', () => {
            navigator.navigate(['R5', 'L5', 'R5', 'R3']);
            navigator.getCoordinates().x.should.equal(10);
            navigator.getCoordinates().y.should.equal(2);
            navigator.getCoordinates().distanceFromOrigin().should.equal(12);
        });

        it('should be able to move with multi digit numbers', () => {
            navigator.navigate(['R50', 'L100']);
            navigator.getCoordinates().x.should.equal(50);
            navigator.getCoordinates().y.should.equal(100);
            navigator.getCoordinates().distanceFromOrigin().should.equal(150);
        })
    });

    describe('navigate - dont revisit', () => {
        let navigator;
        beforeEach(() => {
            navigator = new Navigator(true);
        });

        it("should finish when visiting previously visited coordinate", () => {
            navigator.navigate(['R8', 'R4', 'R4', 'R8']);
            navigator.getCoordinates().x.should.equal(4);
            navigator.getCoordinates().y.should.equal(0);
            navigator.getCoordinates().distanceFromOrigin().should.equal(4);
        });

        it("should finish when visiting previously visited coordinate - including origin", () => {
            navigator.navigate(['R4', 'R4', 'R4', 'R8']);
            navigator.getCoordinates().x.should.equal(0);
            navigator.getCoordinates().y.should.equal(0);
            navigator.getCoordinates().distanceFromOrigin().should.equal(0);
        });
    });
});