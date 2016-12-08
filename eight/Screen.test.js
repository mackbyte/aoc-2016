const Screen = require('./Screen').Screen,
    should = require('chai').should();

describe('Screen', () => {
    describe('constructor', () => {
        it('should create screen with all pixels off', () => {
            let screen = new Screen(2, 2);
            screen.pixels.should.deep.equal([
                [0, 0],
                [0, 0]
            ]);
        });

        it('should create screen off different sizes', () => {
            let screen = new Screen(8, 5);
            screen.pixels.should.deep.equal([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]);
        });
    });

    describe('rect', () => {
        it('should turn all pixels on in dimensions specified, from top left', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.pixels.should.deep.equal([
                [1,1,1,0,0,0,0],
                [1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]);
        });

        it('should leave pixels on that are already on', () => {
            let screen = new Screen(4, 4);
            screen.rect(2, 2);
            screen.pixels.should.deep.equal([
                [1,1,0,0],
                [1,1,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]);

            screen.rect(3, 3);
            screen.pixels.should.deep.equal([
                [1,1,1,0],
                [1,1,1,0],
                [1,1,1,0],
                [0,0,0,0]
            ]);
        });
    });

    describe('rotateColumn', () => {
        it('should rotate column by value', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.rotateColumn(1, 1);

            screen.pixels.should.deep.equal([
                [1,0,1,0,0,0,0],
                [1,1,1,0,0,0,0],
                [0,1,0,0,0,0,0]
            ]);
        });

        it('should rotate column by value larger than length', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.rotateColumn(1, 4);

            screen.pixels.should.deep.equal([
                [1,0,1,0,0,0,0],
                [1,1,1,0,0,0,0],
                [0,1,0,0,0,0,0]
            ]);
        });
    });

    describe('rotateRow', () => {
        it('should rotate row by value', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.rotateRow(0, 4);

            screen.pixels.should.deep.equal([
                [0,0,0,0,1,1,1],
                [1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]);
        });

        it('should rotate row by value larger than length', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.rotateRow(0, 11);

            screen.pixels.should.deep.equal([
                [0,0,0,0,1,1,1],
                [1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]);
        });
    });

    describe('rotate', () => {
        it('should rotate list by value', () => {
            let screen = new Screen(0, 0);
            screen.rotate([1,1,0,0], 2).should.deep.equal([0,0,1,1]);
        });

        it('should rotate list by value larger than list length', () => {
            let screen = new Screen(0, 0);
            screen.rotate([1,1,0,0], 7).should.deep.equal([1,0,0,1]);
        });
    });

    describe('process', () => {
        it('should parse rect command', () => {
            let screen = new Screen(7, 3);
            screen.process('rect 3x2');
            screen.pixels.should.deep.equal([
                [1,1,1,0,0,0,0],
                [1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]);
        });

        it('should parse rotate row command', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.process('rotate row y=0 by 4');

            screen.pixels.should.deep.equal([
                [0,0,0,0,1,1,1],
                [1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0]
            ]);
        });

        it('should parse rotate column command', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.process('rotate column x=1 by 1');

            screen.pixels.should.deep.equal([
                [1,0,1,0,0,0,0],
                [1,1,1,0,0,0,0],
                [0,1,0,0,0,0,0]
            ]);
        });

        it('should parse multiple commands', () => {
            let screen = new Screen(7, 3);
            screen.process('rect 3x2');
            screen.process('rotate column x=1 by 1');
            screen.process('rotate row y=0 by 4');
            screen.process('rotate column x=1 by 1');

            screen.pixels.should.deep.equal([
                [0,1,0,0,1,0,1],
                [1,0,1,0,0,0,0],
                [0,1,0,0,0,0,0]
            ]);
        });
    });

    describe('pixelsOn', () => {
        it('should count pixels that are on', () => {
            let screen = new Screen(7, 3);
            screen.rect(3, 2);
            screen.pixelsOn().should.equal(6);
        });
    });

    describe('print', () => {
        let screen = new Screen(7, 3);
        screen.process('rect 3x2');
        screen.process('rotate column x=1 by 1');
        screen.process('rotate row y=0 by 4');
        screen.process('rotate column x=1 by 1');

        screen.print().should.equal('.#..#.#\n#.#....\n.#.....')

    });
});