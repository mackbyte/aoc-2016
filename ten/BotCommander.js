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

    _add(repo, number, value) {
        let dest = repo.get(number);
        dest ? dest.carry(value) : repo.set(number, new Bot(value));
    }

    _getRepo(type) {
        return type === 'bot' ? this.bots : this.outputs;
    }

    move(commands) {
        let notReadyCommands = commands.filter(command => {
            let bot = this.bots.get(command.from.number);
            if(bot && bot.isReady()) {
                let lowCarry = bot.getCarry('low'),
                    highCarry = bot.getCarry('high');

                this._add(this._getRepo(command.to.low.type), command.to.low.number, lowCarry);
                this._add(this._getRepo(command.to.high.type), command.to.high.number, highCarry);

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