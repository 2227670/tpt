const fs = require('fs');
const querystring = require('querystring');
const formidable = require('formidable');
const exec = require('child_process').exec;
const mime = require('mime-types');

const ROOT = __dirname + "/files";
var JSONfile = require('./pages/info.json');


function start(response, request, id) {
  console.log("Request handler 'start' was called.");

  //var page = fs.readFileSync('./pages/index.html');
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Your id is: " + id);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");

  form.parse(request, function (error, fields, files) {
    console.log("parsing done");

    //rename func
    fs.rename(files.upload.path, "./files/test.jpg", function (err) {
      if (err) {
        fs.unlink("./files/test.jpg");
        fs.rename(files.upload.path, "./files/test.jpg")
      }
    });
    var test = "<img src='/show' />";
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("received image:<br/>");
    response.write("<img src='/" + "show'/>");
    response.end();
  });
}

function show(response, request, id) {
  console.log("response show received with id: " + id);
  if (id == undefined) {
    exec("dir /b files", function (error, stdout, stderr) {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(error + "\n");
        response.end();
      }
      else {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(stdout);
        response.end();
      }
    });
  }
  else {
    console.log("file: " + './files/' + id);
    //send picture to here :)
    if (fs.existsSync('./files/' + id)) {
      fs.readFile('./files/' + id, function (error, data) {
        if (error) {
          console.log("Something went wrong");
          console.log(error)
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(fs.readFileSync('./pages/404.html'));
          response.end();
        }
        else {
          console.log("Trying to show " + id);
          response.writeHead(200, { 'Content-Type': mime.lookup(data) });
          response.write(data);
          response.end();
          console.log("Picture showed: " + id);
        }
      });
    }
    else{
      console.log("We don't have this file: " + id);
    }

  }
}

function showFiles(response) {

}

function TestDownload(response) {
  var dir = __dirname + "/files";
  var file = 'testImage.jpg';
  var mimetype = mime.lookup(file);
  console.log("all good, file type: " + mimetype);
  //fs.readFile('./files' + file, function(err, data){
  response.setHeader('Content-disposition', 'attachment; filename=' + file);
  response.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream('./files/' + file);
  filestream.pipe(response);
  //});
}



exports.showFiles = showFiles;
exports.start = start;
exports.upload = upload;
exports.show = show;


  //функции с обработчика



///////////////////////////
///////////////
/*
var fileName = './file.json';
var file = require(fileName);

file.key = "new value";

fs.writeFile(fileName, JSON.stringify(file), function (err) {
if (err) return console.log(err);
console.log(JSON.stringify(file));
console.log('writing to ' + fileName);
});
*
var filename = './pages/info.json';
var file = require(filename);
file.test = 'Node js at your service';
fs.writeFile(filename, JSON.stringify(file), function (err){
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});*/
      //////////////