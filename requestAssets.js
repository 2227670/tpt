const fs = require("fs");
const path = require("path");

function join(pathname, response) {
    if (fs.existsSync("./pages" + pathname)) {
        fs.readFile("./pages" + pathname, function (err, data) {
            if (err) {
                console.log("Something went wrong");
            }
            else {
                console.log("Trying to upload " + pathname);
                response.writeHead(200, { 'Content-Type': 'text/' + path.extname(pathname).substr(1) });
                response.write(data);
                response.end();
                console.log("Assest uploaded: " + pathname);
            }
        });
    }
    else {
        console.log("File doesn't exist: " + pathname);
    }
}

exports.join = join;