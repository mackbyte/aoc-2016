const Room = require('./Room').Room,
    should = require('chai').should();

describe('Room', () => {
    describe('constructor', () => {
        it('should be created from encrypted string', () => {
            let room = new Room('aaaaa-bbb-z-y-x-123[abxyz]');

            room.name.should.equal('aaaaa-bbb-z-y-x');
            room.sectorId.should.equal(123);
            room.checksum.should.equal('abxyz')
        });

        it('should be created from encrypted string with different number of dashes', () => {
            let room = new Room('a-b-c-d-e-f-g-h-987[abcde]');

            room.name.should.equal('a-b-c-d-e-f-g-h');
            room.sectorId.should.equal(987);
            room.checksum.should.equal('abcde')
        });
    });

    describe('mostCommonCharacter', () => {
        it('should select most common character from string', () => {
            Room.mostCommonCharacter('aaaaabbbbcccdde').should.equal('a');
        });

        it('should select most common character from string regardless of order', () => {
            Room.mostCommonCharacter('edcbaedcbedcede').should.equal('e');
        });

        it('should select character by alphabetical order if equal', () => {
            Room.mostCommonCharacter('cccaaabbb').should.equal('a');
        });
    });

    describe('isReal', () => {
        it('should be real if name contains letters in frequency order according to checksum', () => {
            let room = new Room('aaaaa-bbb-z-y-x-123[abxyz]');

            room.isReal().should.equal(true);
        });

        it('should be real if name contains letters in frequency order according to checksum, ties sorted alphabetically', () => {
            let room = new Room('a-b-c-d-e-f-g-h-987[abcde]');

            room.isReal().should.equal(true);
        });

        it('should not be real if name contains letters not in frequency order according to checksum', () => {
            let room = new Room('totally-real-room-200[decoy]');

            room.isReal().should.equal(false);
        });
    });

    describe('shift', () => {
        it('should rotate letter through the alphabet by specified number', () => {
            Room.shift('a', 3).should.equal('d');
        });

        it('should wrap around to start of alphabet if shift amount is larger than 26', () => {
            Room.shift('z', 343).should.equal('e');
        });
    });

    describe('decrypt', () => {
        it('should decrypt name using sectorId as amount to shift', () => {
            let room = new Room('qzmt-zixmtkozy-ivhz-343[zimth]');

            room.decrypt().should.equal('very encrypted name')
        });
    });
});