class Address {
    constructor(address) {
        this.address = address;
    }

    extractParts() {
        const insideRegex = /\[(\w+)]/g;
        let inside = [],
            match = {};

        while (match = insideRegex.exec(this.address)) {
            inside.push(match[1])
        }

        return {
            inside: inside,
            outside: this.address.replace(insideRegex, '_').split('_')
        }
    }

    hasRepeat(message) {
        let pairs = [];

        message.split('').forEach((char, index) => {
            if(index < message.length-1) {
                pairs.push(char + message.charAt(index+1))
            }
        });

        let found = false;
        pairs.forEach((pair, index) => {
           if(index < pairs.length-2) {
               if(pair === pairs[index+2].split('').reverse().join('') && pair.charAt(0) !== pair.charAt(1)) {
                   found = true;
               }
           }
        });

        return found;
    }

    supportsTLS() {
        const { inside, outside } = this.extractParts();

        let insideRepeat = false;
        inside.forEach(message => {
            if(this.hasRepeat(message)) {
                insideRepeat = true;
            }
        });

        if(insideRepeat) {
            return false
        } else {
            let outsideRepeat = false;
            outside.forEach(message => {
                if(this.hasRepeat(message)) {
                    outsideRepeat = true;
                }
            });

            return outsideRepeat;
        }
    }
}

module.exports = {
    Address
};