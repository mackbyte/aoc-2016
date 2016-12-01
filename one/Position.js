const facings = require('./Facing').facings;

class Position {
    constructor() {
        this.current = 0;
        this.facings = facings;
    }

    getCurrentFacing() {
        return this.facings[this.current];
    }

    turn(direction) {
        if(direction === 'L') {
            this.current--;
            if(this.current === -1) {
                this.current = facings.length-1;
            }
        } else {
            this.current++;
            if(this.current === facings.length) {
                this.current = 0;
            }
        }

        return this.facings[this.current];
    }
}

module.exports = {
    Position
};