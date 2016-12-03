const fs = require("fs"),
    TriangleReader = require('./TriangleReader').TriangleReader;

fs.readFile("three/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    let reader = new TriangleReader(),
        numbers = reader.read(data),
        triangles = reader.triangles(numbers);

    let total = 0;
    triangles.forEach(triangle => {
        if(triangle.isValid()) {total++;}
    });

    console.log(total);
});