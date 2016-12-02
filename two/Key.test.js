const Key = require('./Key').Key,
    should = require('chai').should();

describe('Key', () => {
    describe('getNeighbour', () => {
        it('should return itself when it has no neighbour', () => {
            let key = new Key(5);

            key.getNeighbour('U').should.equal(5);
        });

        it('should return neighbour if specified', () => {
            let key = new Key(5);
            key.setNeighbours({U: 2});

            key.getNeighbour('U').should.equal(2);
        });

        it('should return neighbour if multiple neighbours are specified', () => {
            let key = new Key(5);
            key.setNeighbours({U: 2, D: 8, L: 4, R: 6});

            key.getNeighbour('U').should.equal(2);
            key.getNeighbour('D').should.equal(8);
            key.getNeighbour('L').should.equal(4);
            key.getNeighbour('R').should.equal(6);
        });

        it('should not need all neighbours to be specified', () => {
            let key = new Key(1);
            key.setNeighbours({D: 4, R: 2});

            key.getNeighbour('U').should.equal(1);
            key.getNeighbour('D').should.equal(4);
            key.getNeighbour('L').should.equal(1);
            key.getNeighbour('R').should.equal(2);
        });
    });
});