const Ranges = require('./Ranges').Ranges,
      Range  = require('./Range').Range,
      should = require('chai').should();

describe('Ranges', () => {
    describe('constructor', () => {
        it('should create list of ranges strings', () => {
            let ranges = new Ranges([
                '10-15',
                '0-10',
                '20-100',
            ]);

            ranges.list.should.have.deep.members([
                new Range(10, 15),
                new Range(0, 10),
                new Range(20, 100)
            ]);
        });
    });

    describe('sort', () => {
        it('should sort range list based on minimum', () => {
            let ranges = new Ranges([
                '10-15',
                '0-10',
                '20-100',
            ]);

            ranges.sort().should.deep.equal([
                new Range(0, 10),
                new Range(10, 15),
                new Range(20, 100)
            ]);
        });
    });

    describe('merge', () => {
        it('should merge ranges that overlap', () => {
            let ranges = new Ranges([
                '10-15',
                '0-10',
                '20-100',
            ]);

            ranges.merge().should.deep.equal([
                new Range(0, 15),
                new Range(20, 100)
            ]);
        });

        it('should merge several ranges that overlap', () => {
            let ranges = new Ranges([
                '8-15',
                '71-90',
                '91-100',
                '14-34',
                '95-98',
                '0-10',
                '35-70',
                '58-70',
                '36-50',
            ]);

            ranges.merge().should.deep.equal([
                new Range(0, 34),
                new Range(35, 70),
                new Range(71, 90),
                new Range(91, 100)
            ]);
        });
    });

    describe('find', () => {
        it('should find the smallest number thats not in a range', () => {
            let ranges = new Ranges([
                '5-8',
                '0-2',
                '4-7'
            ]);

            ranges.find().should.equal(3);
        });
    });

    describe('count', () => {
        it('should find all possible ips that are not in any range', () => {
            let ranges = new Ranges([
                '5-8',
                '0-2',
                '4-7'
            ]);

            ranges.count(9).should.equal(2);
        });
    });
});