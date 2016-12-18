const crypto = require('crypto');

class Key {
    constructor(input, stretch = false) {
        this.input = input;
        this.hash = stretch ? this.createStretchedHash() : this.createHash();
    }

    createHash() {
        let digest = crypto.createHash('md5')
            .update(this.input)
            .digest('hex');
        return digest;
    }

    createStretchedHash() {
        let digest = crypto.createHash('md5')
            .update(this.input)
            .digest('hex');

        for(let i = 0; i < 2016; i++) {
            digest = crypto.createHash('md5')
                .update(digest)
                .digest('hex');
        }

        return digest;
    }

    match() {
        return this.hash.match(/(.)\1{2}/);
    }
}

module.exports = {
    Key
};