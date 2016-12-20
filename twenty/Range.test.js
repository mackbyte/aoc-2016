const Range = require('./Range').Range,
      should = require('chai').should();

describe('Range', () => {
    describe('constructor', () => {
        it('should create range from two integers', () => {
            let range = new Range(5, 10);
            range.min.should.equal(5);
            range.max.should.equal(10);
        });

        it('should create range from two integers in any order', () => {
            let range = new Range(15, 3);
            range.min.should.equal(3);
            range.max.should.equal(15);
        });
    });

    describe('fromString', () => {
        it('should create range from string', () => {
            let range = Range.fromString('5-10');
            range.min.should.equal(5);
            range.max.should.equal(10);
        });

        it('should create range with min and max number in any order', () => {
            let range = Range.fromString('10-5');
            range.min.should.equal(5);
            range.max.should.equal(10);
        });
    });

    describe('inRange', () => {
        it('should be in range if between min and max', () => {
            let range = new Range(1, 10);
            range.inRange(5).should.equal(true);
        });

        it('should be in range if equal to min', () => {
            let range = new Range(1, 10);
            range.inRange(1).should.equal(true);
        });

        it('should be in range if equal to max', () => {
            let range = new Range(1, 10);
            range.inRange(10).should.equal(true);
        });

        it('should not be in range if less than min', () => {
            let range = new Range(1, 10);
            range.inRange(0).should.equal(false);
        });

        it('should not be in range if greater than min', () => {
            let range = new Range(1, 10);
            range.inRange(11).should.equal(false);
        });
    });
});