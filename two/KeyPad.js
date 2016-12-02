const Key = require('./Key').Key;

class KeyPad {
    constructor() {
        this.keys = {
            1: new Key(1),
            2: new Key(2),
            3: new Key(3),
            4: new Key(4),
            5: new Key(5),
            6: new Key(6),
            7: new Key(7),
            8: new Key(8),
            9: new Key(9),
        };

        this.keys["1"].setNeighbours({D: 4, R: 2});
        this.keys["2"].setNeighbours({D: 5, L: 1, R: 3});
        this.keys["3"].setNeighbours({D: 6, L: 2});
        this.keys["4"].setNeighbours({U: 1, D: 7, R: 5});
        this.keys["5"].setNeighbours({U: 2, D: 8, L: 4, R: 6});
        this.keys["6"].setNeighbours({U: 3, D: 9, L: 5});
        this.keys["7"].setNeighbours({U: 4, R: 8});
        this.keys["8"].setNeighbours({U: 5, L: 7, R: 9});
        this.keys["9"].setNeighbours({U: 6, L: 8});
    }

    getKey(number) {
        return this.keys[number];
    }
}

module.exports = {
    KeyPad
};