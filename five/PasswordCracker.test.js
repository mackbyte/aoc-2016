const PasswordCracker = require('./PasswordCracker').PasswordCracker,
    should = require('chai').should();

describe('PasswordCracker', () => {
    describe('hash', () => {
        let cracker = new PasswordCracker();
        it('should create md5 hash', () => {
            cracker.hash('abc3231929').should.equal('00000155f8105dff7f56ee10fa9b9abd');
        });
    });

    describe('crack', () => {
        it('should return cracked password', () => {
            let cracker = new PasswordCracker('abc');
            cracker.crack().should.equal('18f47a30');
        }).timeout(30000);
    });
});