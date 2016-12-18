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
            key.createHash().should.equal('0034e0923cc38887a57bd7b1d4f953df');
        });
    });

    describe('createStretchedHash', () => {
        it('should create hash from input', () => {
            let key = new Key('abc22551');
            key.createStretchedHash().should.equal('2df6e9378c3c53abed6d3508b6285fff');
        });
    });

    describe('match', () => {
        it('should return potential key with characters that are repeated 3 times', () => {
            let key = new Key('abc18');
            let match = key.match();
            match[1].should.deep.equal('8');
        });

        it('should return potential key with characters that are repeated 3 times at end of the string', () => {
            let key = new Key('abc22551', true);
            let match = key.match();
            match[1].should.deep.equal('f');
        });

        it('should return potential key with characters that are repeated 3 times', () => {
            let key = new Key('abc39');
            let match = key.match();
            match[1].should.deep.equal('e');
        });

        it('should return potential key with characters that are repeated 5 times', () => {
            let key = new Key('abc816');
            let match = key.match();
            match[1].should.deep.equal('e');
        });

        it('should return nothing if not found either', () => {
            let key = new Key('abc1');
            let match = key.match();
            should.not.exist(match);
        });
    });
});