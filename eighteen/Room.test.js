const Room = require('./Room').Room,
    should = require('chai').should();

describe('Room', () => {
    describe('constructor', () => {
        it('should create initial row from string', () => {
            let room = new Room('..^^.');
            room.rows[0].should.deep.equal([
                true, true, false, false, true
            ]);
        });
    });

    describe('nextRow', () => {
        it('should create next row from previous row', () => {
            let room = new Room('..^^.');
            room.nextRow().should.deep.equal([
                true, false, false, false, false
            ]);
        });
    });

    describe('generate', () => {
        it('should generate number of rows specified', () => {
            let room = new Room('.^^.^.^^^^');
            room.generate(10);
            room.rows.should.deep.equal([
                [true,  false, false, true,  false, true,  false, false, false, false],
                [false, false, false, true,  true,  true,  false, true,  true,  false],
                [false, true,  false, false, true,  false, true,  false, false, true ],
                [true,  true,  false, false, true,  true,  true,  false, false, false],
                [true,  false, false, false, false, true,  false, false, true,  false],
                [false, false, true,  true,  false, true,  false, false, true,  true ],
                [false, false, false, false, true,  true,  false, false, false, true ],
                [false, true,  true,  false, false, false, false, true,  false, false],
                [true,  false, false, false, true,  true,  false, true,  false, false],
                [false, false, true,  false, false, false, true,  true,  false, false]
            ])
        });
    });

    describe('safeTiles', () => {
        it('should return number of safe tiles in room', () => {
            let room = new Room('.^^.^.^^^^');
            room.generate(10);
            room.safeTiles().should.equal(38);
        });
    });
});