class Bot {
    constructor(value) {
        this.carrying = [value];
        this.history = [{values: [value]}];
    }

    carry(value) {
        this.carrying.push(value);
        this.carrying.sort((a, b) => a-b);
        this.history.push({values: this.carrying.slice(0)});
    }

    getCarry(type) {
        let value = type === 'high' ? this.carrying.pop() : this.carrying.shift();
        this.history.push({values: this.carrying.slice(0)});
        return value;
    }

    inHistory(num) {
        return this.history.some(row => row.values.indexOf(num) > -1);
    }

    isReady() {
        return this.carrying.length >= 2;
    }
}

module.exports = {
    Bot
};