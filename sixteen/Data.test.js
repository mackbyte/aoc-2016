const Data = require('./Data').Data,
      should = require('chai').should();

describe('Data', () => {
    describe('next', () => {
        it('should get next value from 1', () => {
            Data.next('1').should.equal('100')
        });

        it('should get next value from 0', () => {
            Data.next('0').should.equal('001')
        });

        it('should get next value from multiple 1s', () => {
            Data.next('11111').should.equal('11111000000')
        });

        it('should get next value from multiple 1s and 0s', () => {
            Data.next('111100001010').should.equal('1111000010100101011110000')
        });

        it('should get the next value from the test sample', () => {
            Data.next('10000').should.equal('10000011110');
        })
    });

    describe('fill', () => {
        it('should continue to generate data until size is met, with initial data', () => {
            Data.fill('10000', 20).should.equal('10000011110010000111110');
        });
    });

    describe('checksum', () => {
        it('should calculate checksum for data', () => {
            Data.checksum('110010110100', 12).should.equal('100');
        });
    });

    describe('solve', () => {
        it('should fill data until length and then calculate checksum for that length', () => {
            Data.solve('10000', 20).should.equal('01100');
        });
    });
});