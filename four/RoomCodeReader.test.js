const RoomCodeReader = require('./RoomCodeReader').RoomCodeReader,
    should = require('chai').should();

describe('RoomCodeReader', () => {
    let reader = new RoomCodeReader();

    describe('read', () => {
        it('should be created from encrypted string', () => {
            let rooms = reader.read([
                'aaaaa-bbb-z-y-x-123[abxyz]',
                'a-b-c-d-e-f-g-h-987[abcde]',
                'not-a-real-room-404[oarel]',
                'totally-real-room-200[decoy]'
            ]);

            rooms.length.should.equal(4);

            rooms.should.deep.equal([
                {name: 'aaaaa-bbb-z-y-x', sectorId: 123, checksum: 'abxyz'},
                {name: 'a-b-c-d-e-f-g-h', sectorId: 987, checksum: 'abcde'},
                {name: 'not-a-real-room', sectorId: 404, checksum: 'oarel'},
                {name: 'totally-real-room', sectorId: 200, checksum: 'decoy'},
            ]);

            rooms[0].isReal().should.equal(true);
            rooms[1].isReal().should.equal(true);
            rooms[2].isReal().should.equal(true);
            rooms[3].isReal().should.equal(false);
        });
    });

    describe('total', () => {
        it('should total up the sector codes of the real rooms', () => {
            let rooms = reader.read([
                'aaaaa-bbb-z-y-x-123[abxyz]',
                'a-b-c-d-e-f-g-h-987[abcde]',
                'not-a-real-room-404[oarel]',
                'totally-real-room-200[decoy]'
            ]);

            let total = reader.total(rooms);

            total.should.equal(1514);
        });
    });
});