const Triangle = require('./Triangle').Triangle,
    should = require('chai').should();

describe('Triangle', () => {
    describe('isValid', () => {
        it('should be valid if last side is greater than sum of first two', () => {
            let triangle = new Triangle([5, 10, 14]);

            triangle.isValid().should.equal(true);
        });

        it('should be valid if any side is greater than sum of the other two', () => {
            let triangle = new Triangle([14, 10, 5]);

            triangle.isValid().should.equal(true);
        });

        it('should be valid if two sides are equal', () => {
            let triangle = new Triangle([14, 14, 10]);

            triangle.isValid().should.equal(true);
        });

        it('should be not be valid if no side is greater than sum of the other two', () => {
            let triangle = new Triangle([5, 16, 10]);

            triangle.isValid().should.equal(false);
        });

        it('should be invalid if all sides are equal (in this example)', () => {
            let triangle = new Triangle([6, 6, 6]);

            triangle.isValid().should.equal(false);
        });

        it('should handle large numbers', () => {
            let triangle = new Triangle([424, 797, 125]);

            triangle.isValid().should.equal(false);
        });
    });
});