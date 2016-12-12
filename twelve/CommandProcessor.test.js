const CommandProcessor = require('./CommandProcessor').CommandProcessor,
      should = require('chai').should();

describe('CommandProcessor', () => {
    describe('constructor', () => {
        it('should create four registers', () => {
            let commands = new CommandProcessor();
            commands.registers.size.should.equal(4);
            commands.registers.get('a').value.should.equal(0);
            commands.registers.get('b').value.should.equal(0);
            commands.registers.get('c').value.should.equal(0);
            commands.registers.get('d').value.should.equal(0);
        });
    });

    describe('process', () => {
        it('should create command from string', () => {
            let commands = new CommandProcessor();
            commands.process([
                'cpy 1 a'
            ]);
            commands.registers.get('a').value.should.equal(1);
        });

        it('should create command from string', () => {
            let commands = new CommandProcessor();
            commands.process([
                'cpy 5 a',
                'cpy a b'
            ]);
            commands.registers.get('a').value.should.equal(5);
            commands.registers.get('b').value.should.equal(5);
        });

        it('should inc register', () => {
            let commands = new CommandProcessor();
            commands.process([
                'inc a'
            ]);
            commands.registers.get('a').value.should.equal(1);
        });

        it('should dec register', () => {
            let commands = new CommandProcessor();
            commands.process([
                'dec a'
            ]);
            commands.registers.get('a').value.should.equal(-1);
        });

        it('should process jump commands', () => {
            let commands = new CommandProcessor();
            commands.process([
                'cpy 41 a',
                'inc a',
                'inc a',
                'dec a',
                'jnz a 2',
                'dec a'
            ]);
            commands.registers.get('a').value.should.equal(42);
        });

        it('should process jump commands that go in reverse', () => {
            let commands = new CommandProcessor();
            commands.process([
                'cpy 2 a',
                'dec a',
                'jnz a -1'
            ]);
            commands.registers.get('a').value.should.equal(0);
        });
    });

    describe('isRegister', () => {
        it('should return true if character is one of the registers', () => {
            let commands = new CommandProcessor();
            commands.isRegister('a').should.equal(true);
        });

        it('should return false if not one of the registers due to being a number', () => {
            let commands = new CommandProcessor();
            commands.isRegister('1').should.equal(false);
        });

        it('should return false if not one of the registers', () => {
            let commands = new CommandProcessor();
            commands.isRegister('e').should.equal(false);
        });
    });
});