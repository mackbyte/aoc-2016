const ItemPair = require('./ItemPair').ItemPair,
      should = require('chai').should();

describe('ItemPair', () => {
    describe('constructor', () => {
        it('create item pair with a left and right number', () => {
            let pair = new ItemPair(5, 10);
            pair.left.should.equal(5);
            pair.right.should.equal(10);
        });
    });

    describe('equal', () => {
        it('should be equal if left and right are the same', () => {
            let pair1 = new ItemPair(5, 10);
            let pair2 = new ItemPair(5, 10);

            pair1.equal(pair2).should.equal(true);
        });

        it('should be equal if reversed left and right are the same', () => {
            let pair1 = new ItemPair(5, 10);
            let pair2 = new ItemPair(10, 5);

            pair1.equal(pair2).should.equal(true);
        });

        it('should not be equal if left and right are not the same', () => {
            let pair1 = new ItemPair(3, 6);
            let pair2 = new ItemPair(3, 7);

            pair1.equal(pair2).should.equal(false);
        });

        it('should not be equal if reversed left and right are not the same', () => {
            let pair1 = new ItemPair(1, 2);
            let pair2 = new ItemPair(2, 0);

            pair1.equal(pair2).should.equal(false);
        });
    });
});