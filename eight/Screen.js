class Screen {
    constructor(width, height) {
        this.pixels = [];
        for(let row = 0; row < height; row++) {
            this.pixels[row] = [];
            for(let column = 0; column < width; column++) {
                this.pixels[row][column] = 0;
            }
        }
    }

    rect(width, height) {
        for(let column = 0; column < width; column++) {
            for(let row = 0; row < height; row++) {
                this.pixels[row][column] = 1;
            }
        }
    }

    rotate(list, value) {
        let times = list.length - value % list.length;
        const copy = list.slice(0);

        while(times--) {
            copy.push(copy.shift());
        }

        return copy;
    }

    rotateColumn(column, value) {
        const columnValues = this.pixels.map(row => row[column]);
        const rotated = this.rotate(columnValues, value);
        rotated.forEach((val, index) => this.pixels[index][column] = val);
    }

    rotateRow(row, value) {
        const rowValues = this.pixels[row].slice(0);
        const rotated = this.rotate(rowValues, value);
        rotated.forEach((val, index) => this.pixels[row][index] = val);
    }

    process(command) {
        if(command.startsWith('rect')) {
            let match = /rect (\d+)x(\d+)/.exec(command);
            this.rect(match[1], match[2]);
        } else if(command.startsWith('rotate row')) {
            let match = /rotate row y=(\d+) by (\d+)/.exec(command);
            this.rotateRow(match[1], match[2]);
        } else {
            let match = /rotate column x=(\d+) by (\d+)/.exec(command);
            this.rotateColumn(match[1], match[2]);
        }
    }

    pixelsOn() {
        return this.pixels.reduce((rowCount, row) => {
            return rowCount + row.reduce((columnCount, value) => {
                    return columnCount + value;
                }, 0);
        }, 0);
    }

    print() {
        return this.pixels.map(row => {
            return row.map(val => val === 1 ? '#' : '.').join('')
        }).join('\n');
    }
}

module.exports = {
    Screen
};