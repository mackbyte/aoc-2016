class Room {
    constructor(initialRow) {
        this.rows = [initialRow.split('').map(tile => tile === '.')];
    }

    nextRow() {
        let lastRow = this.rows.slice(-1)[0].slice(0),
            newRow = [];
        lastRow.unshift(true);
        lastRow.push(true);

        for(let i = 1; i < lastRow.length-1; i++) {
            if(!lastRow[i-1] && !lastRow[i] && lastRow[i+1]) {
                newRow.push(false);
            } else if(lastRow[i-1] && !lastRow[i] && !lastRow[i+1]) {
                newRow.push(false);
            } else if(!lastRow[i-1] && lastRow[i] && lastRow[i+1]) {
                newRow.push(false);
            } else if(lastRow[i-1] && lastRow[i] && !lastRow[i+1]) {
                newRow.push(false);
            } else {
                newRow.push(true);
            }
        }

        return newRow;
    }

    generate(rows) {
        while(this.rows.length < rows) {
            this.rows.push(this.nextRow());
        }
    }

    safeTiles() {
        return this.rows.reduce((count, row) => count += row.reduce((rowCount, tile) => rowCount += tile ? 1 : 0, 0), 0)
    }
}

module.exports = {
    Room
};