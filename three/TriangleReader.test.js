const TriangleReader = require('./TriangleReader').TriangleReader,
    should = require('chai').should();

describe('TriangleReader', () => {
    describe('read', () => {
        const reader = new TriangleReader();

        it('should turn list into array of numbers', () => {
            reader.read('1 2 3\n1 2 3\n').should.deep.equal([1, 2, 3, 1, 2, 3]);
        });

        it('should turn list into array of numbers with large numbers', () => {
            reader.read('100 21 3212\n1231 12 323\n').should.deep.equal([100, 21, 3212, 1231, 12, 323]);
        });

        it('should turn list into array of numbers ignoring spaces', () => {
            reader.read('   1  2   3    \n 1    2     3    \n').should.deep.equal([1, 2, 3, 1, 2, 3]);
        });

        it('should turn list into array of numbers ignoring spaces and with large numbers', () => {
            reader.read('   134  2   2323    \n 1893    27435     233    \n').should.deep.equal([134, 2, 2323, 1893, 27435, 233]);
        });
    });

    describe('triangles', () => {
        const reader = new TriangleReader();

        it('should create triangle using every third number in the array', () => {
            let triangles = reader.triangles([1,4,7,2,5,8,3,6,9]);
            triangles[0].dimensions.should.deep.equal([1, 2, 3]);
            triangles[1].dimensions.should.deep.equal([4, 5, 6]);
            triangles[2].dimensions.should.deep.equal([7, 8, 9]);
        });

        it('should create triangle using every third number in the array for multiple triangles', () => {
            let triangles = reader.triangles([1,4,7,2,5,8,3,6,9,10,13,16,11,14,17,12,15,18]);
            triangles[0].dimensions.should.deep.equal([1, 2, 3]);
            triangles[1].dimensions.should.deep.equal([10, 11, 12]);
            triangles[2].dimensions.should.deep.equal([4, 5, 6]);
            triangles[3].dimensions.should.deep.equal([13, 14, 15]);
            triangles[4].dimensions.should.deep.equal([7, 8, 9]);
            triangles[5].dimensions.should.deep.equal([16, 17, 18]);
        });
    });
});