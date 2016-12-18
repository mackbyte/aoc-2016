const Key = require('./Key').Key;

class KeyFinder {
    constructor(input) {
        this.input = input;
        this.current = -1;
        this.keys = [];
    }

    find() {
        while(this.keys.length < 64) {
            let key = new Key(`${this.input}${++this.current}`);
            let potential = key.potential();
            if(potential && potential.three) {
                for(let i = this.current+1; i < this.current+1000; i++) {
                    let newKey = new Key(`${this.input}${i}`),
                        newKeyPotential = newKey.potential();
                    if(newKeyPotential && newKeyPotential.five) {
                        if(potential.three === newKeyPotential.five.substr(0, 3)) {
                            this.keys.push(this.current);
                            break;
                        }
                    }
                }
            }
        }
        return this.current;
    }
}

module.exports = {
    KeyFinder
};