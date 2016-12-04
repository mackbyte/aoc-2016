class Room {
    constructor(encryptedCode) {
        const roomRegex = /(.+)-(\d+)\[(.+)]/;
        const parts = roomRegex.exec(encryptedCode);

        this.name = parts[1];
        this.sectorId = parseInt(parts[2]);
        this.checksum = parts[3];
    }

    static mostCommonCharacter(string) {
        let charMap = new Map();

        for(let char of string) {
            charMap.set(char, charMap.get(char)+1 || 1)
        }

        return Array.from(charMap)
            .sort((a, b) => {
                let dif = a[1] - b[1];

                if(dif !== 0) {return dif}

                return a[0] < b[0] ? 1 : -1;
            })
            .slice(-1)[0][0];
    }

    isReal() {
        let letters = this.name.replace(/-/g, '');

        let checksum = '';
        while(checksum.length < 5) {
            let mostCommonCharacter = Room.mostCommonCharacter(letters);
            checksum += mostCommonCharacter;
            letters = letters.replace(new RegExp(mostCommonCharacter, 'g'), '');
        }

        return checksum === this.checksum;
    }
}

module.exports = {
    Room
};