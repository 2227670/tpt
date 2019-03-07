var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');

function start(response) {
  console.log("Request handler 'start' was called.");

  var page = fs.readFileSync('./pages/index.html');
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(page);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();
  console.log("about to parse");
    
  form.parse(request, function(error, fields, files){
      console.log("parsing done");
      
      //rename func
      fs.rename(files.upload.path, "./files/test.jpg", function(err){
        if(err){
          fs.unlink("./files/test.jpg");
          fs.rename(files.upload.path, "./files/test.jpg")     
        }
    });
    var test = "<img src='/show' />";
    response.writeHead(200, {"Content-Type": "text/html"});
	  response.write("received image:<br/>");
	  response.write("<img src='/" + "show'/>");
	  response.end();
    });
}

function show(response) {
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
  


