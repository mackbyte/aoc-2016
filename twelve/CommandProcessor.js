const Register = require('./Register').Register;

class CommandProcessor {
    constructor() {
        this.registers = new Map();
        this.registers.set('a', new Register());
        this.registers.set('b', new Register());
        this.registers.set('c', new Register());
        this.registers.set('d', new Register());
    }

    isRegister(char) {
        return this.registers.get(char) !== undefined;
    }

    process(commands) {
        const copyRegex = /cpy (\w+) (\w+)/;
        const mathRegex = /(?:inc|dec) (\w)/;
        const jumpRegex = /jnz (.+) (.+)/;

        for(let i = 0; i < commands.length;) {
            let command = commands[i];
            console.log(command);
            if(command.startsWith('cpy')) {
                let match = copyRegex.exec(command),
                    from = match[1],
                    to = match[2];

                if(this.isRegister(from)) {
                    this.registers.get(to).set(this.registers.get(from).value)
                } else {
                    this.registers.get(to).set(parseInt(from));
                }
                i++;
            } else if(command.startsWith('inc')) {
                let match = mathRegex.exec(command),
                    register = match[1];
                this.registers.get(register).inc();
                i++;
            } else if(command.startsWith('dec')) {
                let match = mathRegex.exec(command),
                    register = match[1];
                this.registers.get(register).dec();
                i++;
            } else if(command.startsWith('jnz')) {
                let match = jumpRegex.exec(command),
                    compare = match[1],
                    jump = match[2];

                let compareVal = this.isRegister(compare) ? this.registers.get(compare).value : parseInt(compare);
                let jumpVal = this.isRegister(jump) ? this.registers.get(jump).value : parseInt(jump);

                compareVal !== 0 ? i += jumpVal : i++;
            }
            console.log(this.registers);
            console.log(i);
        }
    }
}

module.exports = {
    CommandProcessor
};