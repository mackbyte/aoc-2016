const Bot = require('./Bot').Bot;

class BotCommander {
    constructor(commands) {
        this.commands = commands;
        this.bots = new Map();
        this.outputs = new Map();
    }

    getInitialCommands() {
        const commandRegex = /value (\d+) goes to bot (\d+)/;
        return this.commands
            .filter(command => command.startsWith('value'))
            .map(command => {
                let match = commandRegex.exec(command);
                return {
                    bot: parseInt(match[2]),
                    value: parseInt(match[1])
                }
            });
    }

    getMoveCommands() {
        const commandRegex = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;
        return this.commands
            .filter(command => !command.startsWith('value'))
            .map(command => {
                let match = commandRegex.exec(command);
                return {
                    from: {
                        type: 'bot',
                        number: parseInt(match[1]),
                    },
                    to: {
                        low: {
                            type: match[2],
                            number: parseInt(match[3])
                        },
                        high: {
                            type: match[4],
                            number: parseInt(match[5])
                        }
                    },
                }

            });
    }

    initialise(commands) {
        commands.forEach(command => {
            let bot = this.bots.get(command.bot);
            if(bot) {
                bot.carry(command.value);
            } else {
                this.bots.set(command.bot, new Bot(command.value))
            }
        });
    }

    move(commands) {
        let notReadyCommands = commands.filter(command => {
            let bot = this.bots.get(command.from.number);
            if(bot && bot.isReady()) {
                let lowCarry = bot.getCarry('low'),
                    highCarry = bot.getCarry('high');

                if(command.to.low.type === 'bot') {
                    let lowBot = this.bots.get(command.to.low.number);
                    if(lowBot) {
                        lowBot.carry(lowCarry);
                    } else {
                        this.bots.set(command.to.low.number, new Bot(lowCarry));
                    }
                } else {
                    let lowOutput = this.outputs.get(command.to.low.number);
                    if(lowOutput) {
                        lowOutput.carry(lowCarry);
                    } else {
                        this.outputs.set(command.to.low.number, new Bot(lowCarry));
                    }
                }

                if(command.to.high.type === 'bot') {
                    let highBot = this.bots.get(command.to.high.number);
                    if(highBot) {
                        highBot.carry(highCarry);
                    } else {
                        this.bots.set(command.to.high.number, new Bot(highCarry));
                    }
                } else {
                    let highOutput = this.outputs.get(command.to.high.number);
                    if(highOutput) {
                        highOutput.carry(highCarry);
                    } else {
                        this.outputs.set(command.to.high.number, new Bot(highCarry));
                    }
                }
                return false;
            }
            return true;
        });

        if(notReadyCommands.length > 0 && commands.length !== notReadyCommands.length) {
            this.move(notReadyCommands);
        }
    }

    findComparison(a, b) {
        for(let [num, bot] of this.bots) {
            if(bot.inHistory(a) && bot.inHistory(b)) {
                return num;
            }
        }
    }
}

module.exports = {
    BotCommander
};