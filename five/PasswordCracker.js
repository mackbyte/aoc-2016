const crypto = require('crypto');

class PasswordCracker {
    constructor(doorId) {
        this.doorId = doorId;
    }

    hash(string) {
        return crypto.createHash('md5')
            .update(string)
            .digest('hex');
    }

    crack() {
        let password = '',
            idx = 0;

        while(password.length < 8) {
            let attempt = this.doorId + idx;
            let hash = this.hash(attempt);
            if(hash.startsWith('00000')) {
                password += hash[5];
                console.log(`Found char, password now: ${password}`);
            }
            idx++;
        }

        return password;
    }

    crack2() {
        let password = ['_','_','_','_','_','_','_','_'],
            idx = 0;

        while(password.indexOf('_') > -1) {
            let attempt = this.doorId + idx;
            let hash = this.hash(attempt);
            if(hash.startsWith('00000')) {
                let charIdx = parseInt(hash[5]);
                if(charIdx >= 0 && charIdx < 8 && password[charIdx] === '_') {
                    password[charIdx] = hash[6];
                    console.log(`Found char, password now: ${password.join('')}`);
                }
            }
            idx++;
        }

        return password.join('');
    }
}

module.exports = {
    PasswordCracker
};