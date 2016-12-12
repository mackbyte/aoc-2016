const fs = require("fs"),
      CommandProcessor = require('./CommandProcessor').CommandProcessor;

fs.readFile("twelve/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    let processor = new CommandProcessor();
    processor.process(data.split('\n'));

    console.log(processor.registers.get('a').value);
});