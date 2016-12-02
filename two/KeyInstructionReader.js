const KeyPad = require('./KeyPad').KeyPad;

class KeyInstructionReader {
    constructor() {
        this.keyPad = new KeyPad();
    }

    read(instructionList) {
        let code = [];
        let currentKey = this.keyPad.getKey(5);

        instructionList.forEach(list => {
            list.split('').forEach(instruction => {
                currentKey = this.keyPad.getKey(currentKey.getNeighbour(instruction));
            });
            code.push(currentKey.number);
        });

        return code;
    }
}

module.exports = {
    KeyInstructionReader
};