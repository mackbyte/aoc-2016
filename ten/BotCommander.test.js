const BotCommander = require('./BotCommander').BotCommander,
      should = require('chai').should();

describe('BotCommander', () => {
    describe('getInitialCommands', () => {
        it('should extract initial commands', () => {
            let commander = new BotCommander([
                'value 5 goes to bot 2',
                'bot 2 gives low to bot 1 and high to bot 0',
                'value 3 goes to bot 1',
                'bot 1 gives low to output 1 and high to bot 0',
                'bot 0 gives low to output 2 and high to output 0',
                'value 2 goes to bot 2'
            ]);

            commander.getInitialCommands().should.deep.equal([
                {bot: 2, value: 5},
                {bot: 1, value: 3},
                {bot: 2, value: 2}
            ]);
        });
    });

    describe('getMoveCommands', () => {
        it('should extract movement commands', () => {
            let commander = new BotCommander([
                'value 5 goes to bot 2',
                'bot 2 gives low to bot 1 and high to bot 0',
                'value 3 goes to bot 1',
                'bot 1 gives low to output 1 and high to bot 0',
                'bot 0 gives low to output 2 and high to output 0',
                'value 2 goes to bot 2'
            ]);

            commander.getMoveCommands().should.deep.equal([
                {from: {type: 'bot', number: 2}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 1}, to: {low: {type: 'output', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 0}, to: {low: {type: 'output', number: 2}, high: {type: 'output', number: 0}}}
            ]);
        });
    });

    describe('initialise', () => {
        it('should initialise bots with values specified', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 2, value: 5},
                {bot: 1, value: 3},
                {bot: 2, value: 2}
            ]);

            commander.bots.size.should.equal(2);
            commander.bots.get(1).carrying.should.deep.equal([3]);
            commander.bots.get(2).carrying.should.deep.equal([2, 5]);
        });

        it('should initialise bots with carrying values in ascending order', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 0, value: 5},
                {bot: 0, value: 10}
            ]);

            commander.bots.get(0).carrying.should.deep.equal([5, 10]);
        });
    });

    describe('move', () => {
        it('should process movement commands', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 2, value: 5},
                {bot: 1, value: 3},
                {bot: 2, value: 2}
            ]);
            commander.move([
                {from: {type: 'bot', number: 2}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 1}, to: {low: {type: 'output', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 0}, to: {low: {type: 'output', number: 2}, high: {type: 'output', number: 0}}}
            ]);

            commander.bots.size.should.equal(3);
            for (let [botNumber, bot] of commander.bots) {
                bot.carrying.should.deep.equal([]);
            }

            commander.outputs.size.should.equal(3);
            commander.outputs.get(0).carrying.should.deep.equal([5]);
            commander.outputs.get(1).carrying.should.deep.equal([2]);
            commander.outputs.get(2).carrying.should.deep.equal([3]);
        });

        it('should ignore command if bot from does not exist', () => {
            let commander = new BotCommander();
            commander.move([
                {from: {type: 'bot', number: 2}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 0}}}
            ]);

            commander.bots.size.should.equal(0);
        });

        it('should create bot to give to if it does not exist', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 0, value: 5},
                {bot: 0, value: 10}
            ]);

            commander.move([
                {from: {type: 'bot', number: 0}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 2}}}
            ]);

            commander.bots.size.should.equal(3);
            commander.bots.get(0).carrying.should.deep.equal([]);
            commander.bots.get(1).carrying.should.deep.equal([5]);
            commander.bots.get(2).carrying.should.deep.equal([10]);
        });

        it('should not play command if bot does not have 2 values', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 0, value: 5},
            ]);

            commander.move([
                {from: {type: 'bot', number: 0}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 2}}}
            ]);

            commander.bots.size.should.equal(1);
            commander.bots.get(0).carrying.should.deep.equal([5]);
        });

        it('should create output to give to if does not exist', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 0, value: 5},
                {bot: 0, value: 10}
            ]);

            commander.move([
                {from: {type: 'bot', number: 0}, to: {low: {type: 'output', number: 1}, high: {type: 'output', number: 2}}}
            ]);

            commander.outputs.size.should.equal(2);
            commander.outputs.get(1).carrying.should.deep.equal([5]);
            commander.outputs.get(2).carrying.should.deep.equal([10]);
        });

        it('should keep applying commands until all possible commands have been played', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 0, value: 5},
                {bot: 0, value: 10},
                {bot: 1, value: 20},
            ]);

            commander.move([
                {from: {type: 'bot', number: 1}, to: {low: {type: 'bot', number: 0}, high: {type: 'bot', number: 2}}},
                {from: {type: 'bot', number: 0}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 2}}}
            ]);

            commander.bots.size.should.equal(3);
            commander.bots.get(0).carrying.should.deep.equal([5]);
            commander.bots.get(1).carrying.should.deep.equal([]);
            commander.bots.get(2).carrying.should.deep.equal([10,20]);
        });
    });

    describe('findComparison', () => {
        it('should find comparison in bots history', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 2, value: 5},
                {bot: 1, value: 3},
                {bot: 2, value: 2}
            ]);
            commander.move([
                {from: {type: 'bot', number: 2}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 1}, to: {low: {type: 'output', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 0}, to: {low: {type: 'output', number: 2}, high: {type: 'output', number: 0}}}
            ]);

            commander.findComparison(2, 5).should.equal(2);
        });

        it('should not find comparison if not in bots history', () => {
            let commander = new BotCommander();
            commander.initialise([
                {bot: 2, value: 5},
                {bot: 1, value: 3},
                {bot: 2, value: 2}
            ]);
            commander.move([
                {from: {type: 'bot', number: 2}, to: {low: {type: 'bot', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 1}, to: {low: {type: 'output', number: 1}, high: {type: 'bot', number: 0}}},
                {from: {type: 'bot', number: 0}, to: {low: {type: 'output', number: 2}, high: {type: 'output', number: 0}}}
            ]);

            should.not.exist(commander.findComparison(10, 5));
        });
    });
});