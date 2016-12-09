const Decompressor = require('./Decompressor').Decompressor,
      should = require('chai').should();

describe('Decompressor', () => {
    describe('nextMarker', () => {
        it('should return next marker', () => {
            let decompressor = new Decompressor();
            decompressor.nextMarker('A(1x5)BC').should.deep.equal({marker: '(1x5)', index: 1, charIdx: 1, count: 5});
        });

        it('should return null if no next marker present', () => {
            let decompressor = new Decompressor();
            should.not.exist(decompressor.nextMarker('NOMARKER'));
        });
    });

    describe('decompressSegment', () => {
        it('should return string as is if no marker present and idx to continue from', () => {
            let decompressor = new Decompressor('ADVENT');
            decompressor.decompressSegment('ADVENT').should.deep.equal({message: 'ADVENT', idx: 6});
        });

        it('should decompress next segment according to next marker', () => {
            let decompressor = new Decompressor('(1x5)B');
            decompressor.decompressSegment('(1x5)B').should.deep.equal({message: 'BBBBB', idx: 6});
        });

        it('should return empty string if segment is empty', () => {
            let decompressor = new Decompressor('(1x5)B');
            decompressor.decompressSegment('').should.deep.equal({message: '', idx: 1});
        });
    });

    describe('decompress', () => {
        it('should decompress message with single marker', () => {
            let decompressor = new Decompressor('A(1x5)BC');
            decompressor.decompress().should.equal('ABBBBBC');
        });

        it('should decompress message with marker count larger than 1', () => {
            let decompressor = new Decompressor('(3x3)XYZ');
            decompressor.decompress().should.equal('XYZXYZXYZ');
        });

        it('should decompress message with multiple markers', () => {
            let decompressor = new Decompressor('(6x1)(1x3)A');
            decompressor.decompress().should.equal('(1x3)A');
        });

        it('should decompress message with multiple markers of different lengths', () => {
            let decompressor = new Decompressor('X(8x2)(3x3)ABCY');
            decompressor.decompress().should.equal('X(3x3)ABC(3x3)ABCY');
        });

        it('should decompress message with multiple markers of different lengths and trailing no marker string', () => {
            let decompressor = new Decompressor('X(8x2)(3x3)ABCYZZZZ');
            decompressor.decompress().should.equal('X(3x3)ABC(3x3)ABCYZZZZ');
        });
    });
});
