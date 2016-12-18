class Disk {
    constructor(slots, position, time) {
        this.slots = slots;
        this.position = position;
        this.time = time;
    }

    isOpen(time) {
        return (this.position + (time - this.time)) % this.slots === 0;
    }

    static create(string) {
        const diskRegex = /Disc #\d+ has (\d+) positions; at time=(\d+), it is at position (\d+)/;
        let disk = diskRegex.exec(string);
        return new Disk(parseInt(disk[1]), parseInt(disk[3]), parseInt(disk[2]));
    }
}

module.exports = {
    Disk
};