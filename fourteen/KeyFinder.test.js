const KeyFinder = require('./KeyFinder').KeyFinder,
      should = require('chai').should();

describe('KeyFinder', () => {
    describe('constructor', () => {
        it('should create key finder with input and current iteration of 0', () => {
            let finder = new KeyFinder('abc');
            finder.input.should.equal('abc');
            finder.current.should.equal(-1);
        });
    });

    describe('find', () => {
        it('should return 22728 for sample', () => {
            let finder = new KeyFinder('abc');
            finder.find().should.equal(22728);
        }).timeout(30000);
    });
});