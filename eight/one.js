const fs = require("fs"),
      Screen = require('./Screen').Screen;

fs.readFile("eight/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const commands = data.split('\n'),
          screen = new Screen(50, 6);

    commands.forEach(command => screen.process(command));

    console.log(screen.pixelsOn());
});