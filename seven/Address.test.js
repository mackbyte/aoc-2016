const Address = require('./Address').Address,
    should = require('chai').should();

describe('Address', () => {
    describe('supportsTLS', () => {
        it('should return true if address has repeated chars', () => {
            let address = new Address('abba[mnop]qrst');
            address.supportsTLS().should.equal(true);
        });

        it('should return false if address has repeated chars inside square brackets', () => {
            let address = new Address('abcd[bddb]xyyx');
            address.supportsTLS().should.equal(false);
        });

        it('should return false if address has only 1 repeated char', () => {
            let address = new Address('aaaa[qwer]tyui');
            address.supportsTLS().should.equal(false);
        });

        it('should return true if address has repeated chars anywhere in the address string', () => {
            let address = new Address('ioxxoj[asdfgh]zxcvbn');
            address.supportsTLS().should.equal(true);
        });

        it('should return false if address has repeated chars inside any square bracket', () => {
            let address = new Address('asfafabcdafadf[agsrgsg]xyyxadfaefr[abba]srgsgsfg');
            address.supportsTLS().should.equal(false);
        });
    });

    describe('extractParts', () => {
        it('should return object of 2 arrays of strings, inside and outside brackets', () => {
            let address = new Address('dkodbaotlfdaphwzbcc[ldzeemqiovyqjgs]qxibabdusgaistkru[usglloxgycyynmp]aaocvclsocababbzxeg[liaacgfxytuqudp]jvvqsypuoduyhvraak');
            address.extractParts().should.deep.equal({
                inside: [
                    'ldzeemqiovyqjgs',
                    'usglloxgycyynmp',
                    'liaacgfxytuqudp'
                ],
                outside: [
                    'dkodbaotlfdaphwzbcc',
                    'qxibabdusgaistkru',
                    'aaocvclsocababbzxeg',
                    'jvvqsypuoduyhvraak'
                ]
            });
        });
    });

    describe('hasRepeat', () => {
        it('should return true if 2 chars repeat in reverse order', () => {
            let address = new Address();
            address.hasRepeat('spgubtabbavnbuybn').should.equal(true);
        });
    });
});