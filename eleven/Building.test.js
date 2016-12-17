const Building = require('./Building').Building,
    Floor = require('./Floor').Floor,
    Item = require('./Item').Item,
    ItemPair = require('./ItemPair').ItemPair,
    should = require('chai').should();

describe('Building', () => {
    describe('constructor', () => {
        it('create building with 4 empty floors and the lift on the bottom floor', () => {
            let building = new Building();
            building.lift.should.equal(0);
            building.floors.size.should.equal(4);
            building.floors.get(0).should.deep.equal(new Floor());
            building.floors.get(1).should.deep.equal(new Floor());
            building.floors.get(2).should.deep.equal(new Floor());
            building.floors.get(3).should.deep.equal(new Floor());
        });
    });

    describe('clone', () => {
        it('clone empty building', () => {
            let building = new Building();
            let clone = building.clone();

            building.should.not.equal(clone);
        });

        it('changes in clone should not happen in original', () => {
            let building = new Building();
            let clone = building.clone();

            clone.addToFloor(1, new Item('some', 'thing'));

            clone.floors.get(1).should.deep.equal({
                items: [new Item('some', 'thing')]
            });
            clone.lift = 2;

            building.floors.get(1).should.deep.equal({items: []});
            building.lift.should.equal(0);
        });

        it('should clone floors from existing building', () => {
            let building = new Building();
            building.addToFloor(1, new Item('some', 'thing'));
            building.addToFloor(2, new Item('other', 'thing'));

            let clone = building.clone();
            clone.floors.get(1).should.deep.equal({
                items: [new Item('some', 'thing')]
            });
            clone.floors.get(2).should.deep.equal({
                items: [new Item('other', 'thing')]
            });
        });
    });

    describe('addToFloor', () => {
        it('should be able to add to floor', () => {
            let building = new Building();
            building.addToFloor(1, new Item('microchip', 'cobalt'));

            building.floors.get(1).should.deep.equal({
                items: [new Item('microchip', 'cobalt')]
            });
        });

        it('should be able to add to any floor', () => {
            let building = new Building();
            building.addToFloor(3, new Item('generator', 'promethium'));

            building.floors.get(3).should.deep.equal({
                items: [new Item('generator', 'promethium')]
            });
        });
    });

    describe('takeFromFloor', () => {
        it('should be able to add to floor', () => {
            let building = new Building();
            building.addToFloor(1, new Item('microchip', 'cobalt'));

            building.takeFromFloor(1, 'microchip', 'cobalt').should.deep.equal(new Item('microchip', 'cobalt'));
            building.floors.get(1).should.deep.equal({items: []});
        });

        it('should be able to take from any floor', () => {
            let building = new Building();
            building.addToFloor(2, new Item('generator', 'curium'));

            building.takeFromFloor(2, 'generator', 'curium').should.deep.equal(new Item('generator', 'curium'));
            building.floors.get(2).should.deep.equal({items: []});
        });
    });

    describe('print', () => {
        it('should print the state of the simulation', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('microchip', 'lithium'));
            building.addToFloor(1, new Item('generator', 'hydrogen'));
            building.addToFloor(2, new Item('generator', 'lithium'));

            building.print().should.equal(
                '4:\t\t\n' +
                '3:\t\tLI-G\n' +
                '2:\t\tHY-G\n' +
                '1:\t*\tHY-M, LI-M\n'
            );
        });

        it('should print the difference from previous state if provided', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));

            let nextBuilding = new Building();
            nextBuilding.lift = 1;
            nextBuilding.addToFloor(1, new Item('microchip', 'hydrogen'));

            nextBuilding.print(building).should.equal(
                '4:\t\t\n' +
                '3:\t\t\n' +
                '2:\t*\t\x1b[32mHY-M\x1b[0m\n' +
                '1:\t^\t\n'
            );
        });
    });

    describe('finished', () => {
        it('should be finished if all items are on the 4th floor', () => {
            let building = new Building();
            building.addToFloor(3, new Item('generator', 'lithium'));

            building.finished().should.equal(true);
        });

        it('should not be finished if some items are not the 4th floor', () => {
            let building = new Building();
            building.addToFloor(1, new Item('microchip', 'lithium'));
            building.addToFloor(3, new Item('generator', 'lithium'));


            building.finished().should.equal(false);
        });
    });

    describe('getMoves', () => {
        it('should get all possible moves from ground floor', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('microchip', 'lithium'));
            building.addToFloor(1, new Item('microchip', 'otherium'));

            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'microchip', material: 'hydrogen'},
                        {type: 'microchip', material: 'lithium'}
                    ],
                    toFloor: 1
                }
            ]);
        });

        it('should only return pair moves upwards if possible', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('microchip', 'lithium'));

            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'microchip', material: 'hydrogen'},
                        {type: 'microchip', material: 'lithium'}
                    ],
                    toFloor: 1
                }
            ]);
        });

        it('should only return single moves upwards if no pair moves present', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));

            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'microchip', material: 'hydrogen'}
                    ],
                    toFloor: 1
                }
            ]);
        });

        it('should get all possible moves from ground floor ordered by multiple moves first', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('microchip', 'lithium'));
            building.addToFloor(1, new Item('microchip', 'otherium'));

            building.getMoves().should.have.deep.equal([
                {
                    items: [
                        {type: 'microchip', material: 'hydrogen'},
                        {type: 'microchip', material: 'lithium'}
                    ],
                    toFloor: 1
                }
            ]);
        });

        it('should get possible moves that go down aswell as up', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'lithium'));
            building.addToFloor(1, new Item('generator', 'hydrogen'));

            building.lift = 1;
            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'}
                    ],
                    toFloor: 0
                },
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'}
                    ],
                    toFloor: 2
                }
            ]);
        });

        it('should only give single moves down even if pair move present', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'madeup'));
            building.addToFloor(1, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('generator', 'lithium'));

            building.lift = 1;
            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'}
                    ],
                    toFloor: 0
                },
                {
                    items: [
                        {type: 'generator', material: 'lithium'}
                    ],
                    toFloor: 0
                },
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'},
                        {type: 'generator', material: 'lithium'}
                    ],
                    toFloor: 2
                }
            ]);
        });

        it('should get pair moves that go down if no single moves exist', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'lithium'));
            building.addToFloor(0, new Item('microchip', 'lithium'));
            building.addToFloor(1, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('microchip', 'hydrogen'));

            building.lift = 1;
            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'}
                    ],
                    toFloor: 0
                },
                {
                    items: [
                        {type: 'generator', material: 'hydrogen'},
                        {type: 'microchip', material: 'hydrogen'}
                    ],
                    toFloor: 2
                }
            ]);
        });

        it('should not get any moves down if floors below do not have any items', () => {
            let building = new Building();
            building.addToFloor(2, new Item('generator', 'lithium'));
            building.lift = 2;

            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'generator', material: 'lithium'}
                    ],
                    toFloor: 3
                }
            ]);
        });

        it('should not allow moves that would leave floor in invalid state', () => {
            let building = new Building();
            building.addToFloor(3, new Item('generator', 'hydrogen'));
            building.addToFloor(3, new Item('microchip', 'hydrogen'));
            building.addToFloor(3, new Item('generator', 'lithium'));
            building.addToFloor(1, new Item('microchip', 'lithium'));
            building.lift = 3;

            building.getMoves().should.have.deep.members([
                {
                    items: [
                        {type: 'microchip', material: 'hydrogen'}
                    ],
                    toFloor: 2
                },
                {
                    items: [
                        {type: 'generator', material: 'lithium'}
                    ],
                    toFloor: 2
                }
            ]);
        });
    });

    describe('makeMove', () => {
        it('should move item and lift to floor', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));

            let buildingAfter = building.makeMove({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                ],
                toFloor: 1
            });

            buildingAfter.floors.get(0).should.deep.equal({items: []});
            buildingAfter.floors.get(1).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'}
                ]
            });
            buildingAfter.lift.should.equal(1);
        });

        it('should move both items and lift to floor', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('generator', 'hydrogen'));

            let buildingAfter = building.makeMove({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                    {type: 'generator', material: 'hydrogen'},
                ],
                toFloor: 1
            });

            buildingAfter.floors.get(0).should.deep.equal({items: []});
            buildingAfter.floors.get(1).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                    {type: 'generator', material: 'hydrogen'}
                ]
            });
            buildingAfter.lift.should.equal(1);
        });

        it('should move item and lift down a floor', () => {
            let building = new Building();
            building.addToFloor(1, new Item('microchip', 'hydrogen'));

            building.lift = 1;
            let buildingAfter = building.makeMove({
                items: [
                    {type: 'microchip', material: 'hydrogen'}
                ],
                toFloor: 0
            });

            buildingAfter.floors.get(0).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'}
                ]
            });
            buildingAfter.floors.get(1).should.deep.equal({items: []});
            buildingAfter.lift.should.equal(0);
        });

        it('should not modify existing building when making a move', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));

            let buildingAfter = building.makeMove({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                ],
                toFloor: 1
            });

            building.should.not.equal(buildingAfter);

            building.floors.get(0).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'}
                ]
            });
            building.floors.get(1).should.deep.equal({items: []});
            building.lift.should.equal(0);

            buildingAfter.floors.get(0).should.deep.equal({items: []});
            buildingAfter.floors.get(1).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'}
                ]
            });
            buildingAfter.lift.should.equal(1);
        });
    });

    describe('equal', () => {
        it('should be equal if all floors and lift are equal', () => {
            let building = new Building();
            let building2 = new Building();

            building.equal(building2).should.equal(true);
        });

        it('should be equal if all floors and lift are equal with items', () => {
            let building = new Building();
            building.addToFloor(1, new Item('microchip', 'hydrogen'));

            let building2 = new Building();
            building2.addToFloor(1, new Item('microchip', 'hydrogen'));

            building.equal(building2).should.equal(true);
        });

        it('should be equal if all floors and lift are not equal', () => {
            let building = new Building();
            building.addToFloor(0, new Item('microchip', 'hydrogen'));
            building.addToFloor(0, new Item('generator', 'hydrogen'));

            let building2 = new Building();
            building2.addToFloor(2, new Item('microchip', 'hydrogen'));
            building2.addToFloor(2, new Item('generator', 'hydrogen'));

            building.equal(building2).should.equal(false);
        });

        it('should be equal to building with swapped pairs', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('microchip', 'hydrogen'));
            building.addToFloor(2, new Item('generator', 'lithium'));
            building.addToFloor(2, new Item('microchip', 'lithium'));

            let building2 = new Building();
            building2.addToFloor(0, new Item('generator', 'lithium'));
            building2.addToFloor(1, new Item('microchip', 'lithium'));
            building2.addToFloor(2, new Item('generator', 'hydrogen'));
            building2.addToFloor(2, new Item('microchip', 'hydrogen'));

            building.equal(building2).should.equal(true);
        });

        it('should not be equal to building with items on same floors, but not interchanging pairs', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('microchip', 'hydrogen'));
            building.addToFloor(2, new Item('generator', 'lithium'));
            building.addToFloor(2, new Item('microchip', 'lithium'));

            let building2 = new Building();
            building2.addToFloor(0, new Item('generator', 'lithium'));
            building2.addToFloor(1, new Item('microchip', 'hydrogen'));
            building2.addToFloor(2, new Item('generator', 'hydrogen'));
            building2.addToFloor(2, new Item('microchip', 'lithium'));

            building.equal(building2).should.equal(false);
        });

        it('should not be equal with items on different floors', () => {
            let building = new Building();
            building.lift = 2;
            building.addToFloor(2, new Item('microchip', 'cobalt'));
            building.addToFloor(2, new Item('microchip', 'curium'));
            building.addToFloor(2, new Item('microchip', 'plutonium'));
            building.addToFloor(2, new Item('microchip', 'promethium'));
            building.addToFloor(2, new Item('microchip', 'ruthenium'));
            building.addToFloor(1, new Item('generator', 'cobalt'));
            building.addToFloor(1, new Item('generator', 'curium'));
            building.addToFloor(1, new Item('generator', 'plutonium'));
            building.addToFloor(1, new Item('generator', 'promethium'));
            building.addToFloor(1, new Item('generator', 'ruthenium'));
            // 4:
            // 3:	*	CO-M, CU-M, PL-M, PR-M, RU-M
            // 2:		CO-G, CU-G, PL-G, PR-G, RU-G
            // 1:

            let building2 = new Building();
            building2.lift = 2;
            building2.addToFloor(3, new Item('microchip', 'cobalt'));
            building2.addToFloor(2, new Item('microchip', 'curium'));
            building2.addToFloor(2, new Item('microchip', 'plutonium'));
            building2.addToFloor(2, new Item('microchip', 'promethium'));
            building2.addToFloor(2, new Item('microchip', 'ruthenium'));
            building2.addToFloor(1, new Item('generator', 'curium'));
            building2.addToFloor(1, new Item('generator', 'plutonium'));
            building2.addToFloor(1, new Item('generator', 'promethium'));
            building2.addToFloor(1, new Item('generator', 'cobalt'));
            building2.addToFloor(1, new Item('generator', 'ruthenium'));
            // 4:		CO-M
            // 3:	*	CU-M, PL-M, PR-M, RU-M
            // 2:		CO-G, CU-G, PL-G, PR-G, RU-G
            // 1:

            building.equal(building2).should.equal(false);
        });
    });

    describe('getPairs', () => {
        it('should return pairs of items by floor numbers', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('microchip', 'hydrogen'));
            building.addToFloor(2, new Item('generator', 'lithium'));
            building.addToFloor(2, new Item('microchip', 'lithium'));

            building.getPairs().should.have.deep.members([
                new ItemPair(0, 1),
                new ItemPair(2, 2),
            ]);
        });
    });

    describe('getFloor', () => {
        it('should return floor of item', () => {
            let building = new Building();
            building.addToFloor(0, new Item('generator', 'hydrogen'));
            building.addToFloor(1, new Item('microchip', 'hydrogen'));
            building.addToFloor(2, new Item('generator', 'lithium'));
            building.addToFloor(3, new Item('microchip', 'lithium'));

            building.getFloor(new Item('microchip', 'hydrogen')).should.equal(1);
        });
    });
});