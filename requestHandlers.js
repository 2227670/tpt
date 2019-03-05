var fs = require('fs');
var querystring = require('querystring');


function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var page = fs.readFileSync('./pages/index.html');
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(page);
  response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: " +  querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./files/test.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;

  //функции с обработчика
  


