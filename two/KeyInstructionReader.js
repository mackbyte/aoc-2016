const KeyPad = require('./KeyPad').KeyPad;
const KeyPad2 = require('./KeyPad2').KeyPad2;

class KeyInstructionReader {
    constructor(partTwo) {
        this.keyPad = partTwo ? new KeyPad2() : new KeyPad();
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