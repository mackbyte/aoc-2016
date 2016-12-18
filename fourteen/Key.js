const crypto = require('crypto');

class Key {
    constructor(input) {
        this.input = input;
    }

    hash() {
        return crypto.createHash('md5')
            .update(this.input)
            .digest('hex');
    }

    potential() {
        let hash = this.hash(),
            three = null,
            five = null;

        for(let i = 0; i < hash.length-2; i++) {
            if(hash.charAt(i) === hash.charAt(i+1) && hash.charAt(i) == hash.charAt(i+2)) {
                if(hash.charAt(i) === hash.charAt(i+3) && hash.charAt(i) === hash.charAt(i+4)) {
                    five = new Array(6).join(hash.charAt(i));
                }
                three = new Array(4).join(hash.charAt(i));
                break;
            }
        }

        return three || five ? {three, five} : null;
    }
}

module.exports = {
    Key
};