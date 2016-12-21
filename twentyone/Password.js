const positionRegex = /swap position (\d+) with position (\d+)/,
      letterRegex = /swap letter (\w+) with letter (\w+)/,
      reverseRegex = /reverse positions (\d+) through (\d+)/,
      rotateRegex = /rotate (right|left) (\d+) steps?/,
      rotateLetterRegex = /rotate based on position of letter (\w+)/,
      moveRegex = /move position (\d+) to position (\d+)/;

class Password {
    constructor(string) {
        this.string = string;
    }

    swapPositions(one, two) {
        this.string = this.string
            .split('')
            .map((char, index) => {
                if(index === one) {
                    return this.string[two];
                } else if(index === two) {
                    return this.string[one];
                }
                return char;
            })
            .join('');
    }

    swapLetters(one, two) {
        this.string = this.string
            .split('')
            .map(char => {
                if(char === one) {
                    return two;
                } else if(char === two) {
                    return one;
                }
                return char;
            })
            .join('');
    }

    reverse(from, to) {
        this.string = this.string.slice(0, from) + this.string.slice(from, to+1).split('').reverse().join('') + this.string.slice(to+1);
    }

    rotate(val) {
        this.string = this.string.slice(val % this.string.length) + this.string.slice(0, val % this.string.length);
    }

    rotateByLetter(letter) {
        let index = this.string.indexOf(letter);
        index = index >= 4 ? index+2 : index+1;
        this.rotate(index*-1);
    }

    move(from, to) {
        let move = this.string[from],
            removed = this.string.split('').map((char, index) => index !== from ? char : '').concat([' ']).join('');
        this.string = removed.split('').map((char, index) => index !== to ? char : move+char).join('').replace(' ', '');
    }

    scramble(commands) {
        commands.forEach(command => {
            if(positionRegex.test(command)) {
                let match = positionRegex.exec(command);
                this.swapPositions(parseInt(match[1]), parseInt(match[2]));
            } else if(letterRegex.test(command)) {
                let match = letterRegex.exec(command);
                this.swapLetters(match[1], match[2]);
            } else if(reverseRegex.test(command)) {
                let match = reverseRegex.exec(command);
                this.reverse(parseInt(match[1]), parseInt(match[2]));
            } else if(rotateRegex.test(command)) {
                let match = rotateRegex.exec(command),
                    val = match[1] === 'right' ? parseInt(match[2])*-1 : parseInt(match[2]);
                this.rotate(val);
            } else if(rotateLetterRegex.test(command)) {
                let match = rotateLetterRegex.exec(command);
                this.rotateByLetter(match[1]);
            } else if(moveRegex.test(command)) {
                let match = moveRegex.exec(command);
                this.move(parseInt(match[1]), parseInt(match[2]));
            } else {
                console.log(`UNKNOWN COMMAND: ${command}`);
            }
        });
    }
}

module.exports = {
    Password
};