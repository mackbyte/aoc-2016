const Key = require('./Key').Key;

class KeyFinder {
    constructor(input, stretch = false) {
        this.input = input;
        this.stretch = stretch;
        this.foundKeys = [];
        this.allKeys = [];
        this.candidates = [];
    }

    find() {
        for (let i = 0; this.foundKeys.length < 64; i++) {
            let key = new Key(`${this.input}${i}`, this.stretch),
                match = key.match(this.stretch);
            this.allKeys[i] = key;

            if(match) {
                this.candidates[i] = { index: i, key, char: match[1] };
            }

            let candidate = this.candidates[i - 1000];
            if(candidate) {
                const matches = this.allKeys.slice(i - 999).filter(key => (new RegExp(`${candidate.char}{5}`)).test(key.hash));
                if (matches.length) {
                    this.foundKeys.push({
                        index: candidate.index,
                        hash: candidate.hash
                    });
                    console.log(`Found key #${this.foundKeys.length}`, i - 1000);
                }
            }
        }

        return this.foundKeys.slice(-1)[0].index;
    }
}

module.exports = {
    KeyFinder
};