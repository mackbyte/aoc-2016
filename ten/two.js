const fs = require("fs"),
      BotCommander = require('./BotCommander').BotCommander;

fs.readFile("ten/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const commander = new BotCommander(data.split('\n')),
          initCommands = commander.getInitialCommands(),
          moveCommands = commander.getMoveCommands();

    commander.initialise(initCommands);
    commander.move(moveCommands);

    console.log(commander.outputs.get(0).carrying[0] * commander.outputs.get(1).carrying[0] * commander.outputs.get(2).carrying[0]);
});