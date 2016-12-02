const KeyInstructionReader = require('./KeyInstructionReader').KeyInstructionReader,
    should = require('chai').should();

describe('KeyInstructionReader', () => {
    describe('read', () => {
        let keyInstructionReader;
        beforeEach(() => {
            keyInstructionReader = new KeyInstructionReader();
        });

        it('should process instructions and return code', () => {
            let code = keyInstructionReader.read(['U']);
            code.should.deep.equal([2]);
        });

        it('should process multiple instructions and return code', () => {
            let code = keyInstructionReader.read(['ULL']);
            code.should.deep.equal([1]);
        });

        it('should start from number it ended on when processing new line', () => {
            let code = keyInstructionReader.read(['ULL', 'RRDDD']);
            code.should.deep.equal([1, 9]);
        });

        it('should process multiple lists of multiple instructions and return code', () => {
            let code = keyInstructionReader.read(['ULL', 'RRDDD', 'LURDL', 'UUUUD']);
            code.should.deep.equal([1, 9, 8, 5]);
        })
    });
});