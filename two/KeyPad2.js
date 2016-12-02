const Key = require('./Key').Key;

class KeyPad2 {
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
            A: new Key('A'),
            B: new Key('B'),
            C: new Key('C'),
            D: new Key('D'),
        };

        this.keys['1'].setNeighbours({D: 3});
        this.keys['2'].setNeighbours({D: 6, R: 3});
        this.keys['3'].setNeighbours({U: 1, D: 7, L: 2, R: 4});
        this.keys['4'].setNeighbours({D: 8, L: 3});
        this.keys['5'].setNeighbours({R: 6});
        this.keys['6'].setNeighbours({U: 2, D: 'A', L: 5, R: 7});
        this.keys['7'].setNeighbours({U: 3, D: 'B', L: 6, R: 8});
        this.keys['8'].setNeighbours({U: 4, D: 'C', L: 7, R: 9});
        this.keys['9'].setNeighbours({L: 8});
        this.keys['A'].setNeighbours({U: 6, R: 'B'});
        this.keys['B'].setNeighbours({U: 7, D: 'D', L: 'A', R: 'C'});
        this.keys['C'].setNeighbours({U: 8, L: 'B'});
        this.keys['D'].setNeighbours({U: 'B'});
    }

    getKey(number) {
        return this.keys[number];
    }
}

module.exports = {
    KeyPad2
};