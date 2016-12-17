const Floor = require('./Floor').Floor,
      Item = require('./Item').Item,
      ItemPair = require('./ItemPair').ItemPair;

class Building {
    constructor() {
        this.floors = new Map();
        this.floors.set(0, new Floor());
        this.floors.set(1, new Floor());
        this.floors.set(2, new Floor());
        this.floors.set(3, new Floor());
        this.lift = 0;
    }

    clone() {
        let clone = new Building();
        clone.lift = this.lift;
        for (let [num, floor] of this.floors) {
            clone.floors.get(num).items = floor.items.map(item => item.clone());
        }
        return clone;
    }

    addToFloor(floor, item) {
        this.floors.get(floor).addItem(item);
    }

    takeFromFloor(floor, type, material) {
        return this.floors.get(floor).takeItem(type, material);
    }

    getMoves() {
        let currentFloor = this.floors.get(this.lift),
            items = currentFloor.items,
            possibilities = [];

        for (let i = 0; i < items.length; i++) {
            possibilities.push([items[i]]);
            for (let j = i + 1; j < items.length; j++) {
                if(!items[i].equal(items[j])) {
                    possibilities.push([items[i], items[j]]);
                }
            }
        }

        let allMoves = [];
        if(this.lift < 3) {
            let floorUp = this.floors.get(this.lift + 1);
            let upMoves = possibilities
                .filter(possible => floorUp.canAdd(possible) && currentFloor.canTake(possible));

            if(upMoves.some(possible => possible.length > 1)) {
                upMoves = upMoves.filter(possible => possible.length > 1)
            }

            allMoves = allMoves.concat(upMoves.map(items => {
                return {
                    items, toFloor: this.lift + 1
                }
            }));
        }

        if(this.lift > 0) {
            let somethingBelow = false;
            for(let i = this.lift-1; i >= 0; i--) {
                if(this.floors.get(i).items.length > 0) {
                    somethingBelow = true;
                }
            }

            if(somethingBelow) {
                let floorDown = this.floors.get(this.lift - 1);
                let downMoves = possibilities
                    .filter(possible => floorDown.canAdd(possible) && currentFloor.canTake(possible));

                if(downMoves.some(possible => possible.length < 2)) {
                    downMoves = downMoves.filter(possible => possible.length < 2);
                }

                allMoves = allMoves.concat(downMoves.map(items => {
                    return {
                        items, toFloor: this.lift - 1
                    }
                }));
            }
        }

        return allMoves;
    }

    makeMove(move) {
        let clone = this.clone();
        move.items.forEach(item => {
            clone.addToFloor(move.toFloor, clone.takeFromFloor(clone.lift, item.type, item.material));
        });
        clone.lift = move.toFloor;
        return clone;
    }

    finished() {
        for (let [num, floor] of this.floors) {
            if(num !== 3 && floor.items.length > 0) {
                return false;
            }
        }
        return true;
    }

    _liftMarker(num, previousFloor, dir) {
        if(num === previousFloor) {
            return dir > 0 ? '^\t' : 'v\t'
        }
        return num === this.lift ? '*\t' : '\t'
    }

    _changes(prevFloor, newFloor, floorString) {
        return newFloor.items
            .filter(item => prevFloor.items.some(prevItem => prevItem.equal(item)))
            .map(item => item.print())
            .reduce((string, itemString) => string = string.replace(itemString, `\x1b[32m${itemString}\x1b[0m`), floorString);
    }

    print(previous) {
        let output = [];
        if(previous) {
            let direction = this.lift - previous.lift,
                prevFloorNum = this.lift - direction;

            for (let [num, floor] of this.floors) {
                let floorString = floor.print();
                if(num === this.lift) {
                    floorString = this._changes(previous.floors.get(prevFloorNum), floor, floorString);
                }
                output.push(`${(num + 1)}:\t${this._liftMarker(num, prevFloorNum, direction)}${floorString}\n`);
            }
        } else {
            for (let [num, floor] of this.floors) {
                output.push((num + 1) + ':\t' + (num === this.lift ? '*\t' : '\t') + floor.print() + '\n');
            }
        }

        return output.reverse().join('');
    }

    getFloor(item) {
        for (let [num, floor] of this.floors) {
            if(floor.hasItem(item.type, item.material)) {return num}
        }
    }

    getPairs() {
        let allItems = [];
        for (let [num, floor] of this.floors) {
            allItems = allItems.concat(floor.items.slice(0));
        }

        let pairs = [],
            idxs = [];

        for(let i = 0; i < allItems.length; i++) {
            for(let j = i+1; j < allItems.length; j++) {
                if(idxs.indexOf(i) < 0 && idxs.indexOf(j) < 0 && allItems[i].pair(allItems[j])) {
                    pairs.push(new ItemPair(this.getFloor(allItems[i]), this.getFloor(allItems[j])));
                    idxs = idxs.concat([i, j]);
                }
            }
        }

        return pairs;
    }

    equal(other) {
        if(this.lift !== other.lift) {
            return false;
        }

        let pairs = this.getPairs(),
            otherPairs = other.getPairs(),
            matchedIndexes = [];

        pairs.forEach(pair => {
            otherPairs.forEach((other, index) => {
                if(other.equal(pair) && matchedIndexes.indexOf(index) === -1) {
                    matchedIndexes.push(index);
                }
            });
        });

        return otherPairs.length === matchedIndexes.length;
    }

    // equal(other) {
    //     if(this.lift !== other.lift) {
    //         return false;
    //     }
    //
    //     for (let [num, floor] of this.floors) {
    //         if(!this.floors.get(num).equal(other.floors.get(num))) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }

}

module.exports = {
    Building
};