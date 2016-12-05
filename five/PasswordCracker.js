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
}

module.exports = {
    PasswordCracker
};