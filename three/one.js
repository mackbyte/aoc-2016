const fs = require("fs"),
      Triangle = require('./Triangle').Triangle;

fs.readFile("three/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const triangles = data.split('\n');

    let total = 0;
    triangles.forEach(triangle => {
        let dimensions = triangle.trim().split(/ +/).map(num => parseInt(num)),
            tri = new Triangle(dimensions);

        if(tri.isValid()) { total++; }
    });

    console.log(total);
});