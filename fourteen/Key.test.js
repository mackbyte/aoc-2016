const Key = require('./Key').Key,
      should = require('chai').should();

describe('Key', () => {
    describe('constructor', () => {
        it('should create key with input', () => {
            let key = new Key('abc');
            key.input.should.equal('abc');
        });
    });

    describe('hash', () => {
        it('should create hash from input', () => {
            let key = new Key('abc18');
            key.hash().should.equal('0034e0923cc38887a57bd7b1d4f953df');
        });
    });

    describe('potential', () => {
        it('should return potential key with characters that are repeated 3 times', () => {
            let key = new Key('abc18');
            key.potential().should.deep.equal({
                three: '888',
                five: null
            });
        });

        it('should return potential key with characters that are repeated 3 times', () => {
            let key = new Key('abc39');
            key.potential().should.deep.equal({
                three: 'eee',
                five: null
            });
        });

        it('should return potential key with characters that are repeated 5 times', () => {
            let key = new Key('abc816');
            key.potential().should.deep.equal({
                three: 'eee',
                five: 'eeeee'
            });
        });

        it('should return nothing if not found either', () => {
            let key = new Key('abc1');
            should.not.exist(key.potential());
        });
    });
});