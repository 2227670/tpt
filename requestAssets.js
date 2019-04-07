const fs = require("fs");
const mime = require('mime-types');
const ROOT = __dirname + "/pages";


function loadFile(pathname, response) {

    if (fs.existsSync(ROOT + pathname)) {
        fs.readFile(ROOT + pathname, function (error, data) {
            if (error) {
                console.log("Something went wrong");
                console.log(error)
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(fs.readFileSync('./pages/404.html'));
                response.end();
            }
            else {
                console.log("Trying to upload " + pathname);
                response.writeHead(200, { 'Content-Type': mime.lookup(data) });
                response.write(data);
                response.end();
                console.log("Assest uploaded: " + pathname);
            }
        });
    }

    else {
        console.log("File doesn't exist: " + pathname);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(fs.readFileSync('./pages/404.html'));
        response.end();
    }
}

exports.loadFile = loadFile;