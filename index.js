var fs = require("fs");
var App = require("./app/app.js");

if (process.argv.length !== 3) {
    console.error("Please provide input JSON file as argument");
    return false;
}

var fileName = process.argv[2];

if (!fs.existsSync(fileName)) {
    console.error("JSON file given as input doesn't exist");
    return false;
}

fs.readFile(fileName, "utf8", function(err, data) {
    if (err) {
        console.error(err.message);
        return false;
    }

    var inputData = JSON.parse(data);
    var app = new App(inputData);
    app.execute();
});
