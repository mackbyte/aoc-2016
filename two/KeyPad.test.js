const KeyPad = require('./KeyPad').KeyPad,
    should = require('chai').should();

describe('KeyPad', () => {
    describe('getKey', () => {
        it('should return itself when it has no neighbour', () => {
            let keyPad = new KeyPad();
            keyPad.getKey(7).number.should.equal(7);
        });
    });
});