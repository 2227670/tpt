var fs = require('fs');


function start(response) {
  console.log("Request handler 'start' was called.");

  var page = fs.readFileSync('./pages/index.html');
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(page);
  response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;

  //функции с обработчика
  


