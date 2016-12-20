class Elves {
    constructor(number, stealFromAcross=false) {
        if(!stealFromAcross) {
            this.list = Array.from(new Array(number).keys());
        } else {
            this.list = Array.from(new Array(number).keys())
                .map(val => new Elf(val))
                .map((elf, index, elves) => {
                    if(index === 0) {
                        elf.next = elves[index+1];
                        elf.prev = elves[number-1];
                    } else if (index === number-1) {
                        elf.next = elves[0];
                        elf.prev = elves[index-1];
                    } else {
                        elf.next = elves[index+1];
                        elf.prev = elves[index-1];
                    }
                    return elf;
                });
        }
    }

    solve() {
        let filtered = this.list.slice(0);

        while(filtered.length > 1) {
            let odd = filtered.length % 2 === 1;
            filtered = filtered.filter((val, index) => index % 2 === 0);
            if(odd) {filtered.shift()}
        }
        return filtered[0]+1;
    }

    solve2() {
        let start = this.list[0],
            len = this.list.length,
            mid = this.list[Math.floor(len/2)];

        for(let i = 0; i < len; i++) {
            mid.delete();
            mid = mid.next;
            if((len - i) % 2 == 1) {
                mid = mid.next
            }
            start = start.next;
        }

        return start.seat+1
    }
}

class Elf {
    constructor(seat) {
        this.seat = seat;
        this.next;
        this.prev;
    }

    delete() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}

module.exports = {
    Elves
};