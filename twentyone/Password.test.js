const Password = require('./Password').Password,
      should = require('chai').should();

describe('Password', () => {
    describe('constructor', () => {
        it('should create a password with provided string', () => {
            let password = new Password('abcde');
            password.string.should.equal('abcde');
        });
    });

    describe('swapPositions', () => {
        it('should swap characters at specified positions', () => {
            let password = new Password('abcde');
            password.swapPositions(4, 0);
            password.string.should.equal('ebcda');
        });
    });

    describe('swapLetters', () => {
        it('should swap letters anywhere in string', () => {
            let password = new Password('ebcda');
            password.swapLetters('d', 'b');
            password.string.should.equal('edcba');
        });
    });

    describe('reverse', () => {
        it('should reverse the characters between the indexes', () => {
            let password = new Password('edcba');
            password.reverse(0, 4);
            password.string.should.equal('abcde');
        });
    });

    describe('rotate', () => {
        it('should rotate letters left by value', () => {
            let password = new Password('abcd');
            password.rotate(-1);
            password.string.should.equal('dabc');
        });

        it('should rotate letters right by value when value is negative', () => {
            let password = new Password('abcd');
            password.rotate(2);
            password.string.should.equal('cdab');
        });
    });

    describe('rotateByLetter', () => {
        it('should rotate string right by index of letter plus 1', () => {
            let password = new Password('abdec');
            password.rotateByLetter('b');
            password.string.should.equal('ecabd');
        });

        it('should rotate string right by index of letter plus 2 if index is at least 4', () => {
            let password = new Password('ecabd');
            password.rotateByLetter('d');
            password.string.should.equal('decab');
        });
    });

    describe('move', () => {
        it('should move character at position one to position two', () => {
            let password = new Password('bcdea');
            password.move(1, 4);
            password.string.should.equal('bdeac');
        });

        it('should move character at position one to position two, when position to move to is less than the index', () => {
            let password = new Password('bdeac');
            password.move(3, 0);
            password.string.should.equal('abdec');
        });
    });

    describe('scramble', () => {
        it('should process list of commands to scramble the password', () => {
            let password = new Password('abcde');
            password.scramble([
                'swap position 4 with position 0',
                'swap letter d with letter b',
                'reverse positions 0 through 4',
                'rotate left 1 step',
                'move position 1 to position 4',
                'move position 3 to position 0',
                'rotate based on position of letter b',
                'rotate based on position of letter d'
            ]);
            password.string.should.equal('decab');
        });
    });
});