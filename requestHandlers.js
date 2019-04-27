const fs = require('fs');
const querystring = require('querystring');
const formidable = require('formidable');
const exec = require('child_process').exec;
const mime = require('mime-types');
const path = require("path");
const rimraf = require("rimraf");

const requestAssets = require("./requestAssets");
const authorization = require("./authorization");

const ROOT = __dirname + "/UsersData";
var JSONfile = require('./pages/info.json');



function upload(response, request) {

  console.log("try to upload");
  var form = new formidable.IncomingForm();
  form.parse(request, function (error, fields, files) {
    if (error) {
      console.log(error);
    }
    else {
      if (files.upload.size == 0) {
        //nas naebali
        requestAssets.loadFile('/upload.html', response);
        //send some page with info about size = 0
      }
      else {
        ///////check that file with same name doesn't exist
        if (fs.existsSync('./files/' + files.upload.name)) {
          files.upload.name = (function (fileName) {
            var d = new Date();
            //var time = d.getHours() +"-"+ d.getMinutes() +"-"+ d.getSeconds();
            return d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds() + "-" + fileName;
          }(files.upload.name));
        }

        var oldpath = files.upload.path;
        var newpath = './files/' + files.upload.name;

        fs.rename(oldpath, newpath, function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("done");
            requestAssets.loadFile('/upload.html', response);
          }
        });
      }
    }
  });
}

function download(response, request, id) {

  console.log("Handler DOWNLOAD works with: " + id);
  if (id == undefined) {
    //nu ja hz kak vse ku4ei otdavatj
  }
  else {
    if(id.includes("%")){ 
    id = (function (fileName) {
      return fileName.replace(/%20/g, " ");
    }(id));}

    var dataPath = ROOT + id;

    if (fs.lstatSync(dataPath).isDirectory()) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("tq tam ebu dal?");
      response.end();
    }
    ////////////nu skkoree perehod v nee chem skachivanie
    else {
      console.log("Try to download file:" + dataPath);
      if (fs.existsSync(dataPath)) {
        fs.readFile(dataPath, function (error, data) {
          if (error) {
            console.log("Something went wrong");
            console.log(error)
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(fs.readFileSync('./pages/404.html'));
            response.end();
          }
          else {//here dodelatj nado
            console.log("Try to downloading: " + id);
            var file = './files/' + id;
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            console.log("type of file: " + mimetype);

            response.setHeader('Content-disposition', 'attachment; filename=' + filename);
            response.setHeader('Content-type', 'application/octet-stream');
            var filestream = fs.createReadStream(file);
            filestream.pipe(response);

            console.log("Picture downloaded: " + id);
          }
        });
      }
      else {
        console.log("We don't have this file: " + id);
      }


    }
  }
}

function show(response, request, id) {

  console.log("response show received with id: " + id);
  if (id == undefined) {
    //send info about default directory
    //useless mby?
    exec("dir /b files", function (error, stdout, stderr) {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(error + "\n");
        response.end();
      }
      else {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(stdout);
        response.end();
      }
    });
  }
  else {
    //send data about 'id' directory
    id = (function (fileName) {
      return fileName.replace(/%20/g, " ");
    }(id));
    //var test ='./UsersData/' +  id;
    if (fs.lstatSync('./UsersData/' + id).isDirectory()) {
      /*
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("tq tam ebu dal?");
      response.end();
      */
      testFolder = './UsersData/' + id;
      fs.readdir('./UsersData/' + id, function (err, files) {
        if (err) {
          console.log(err);
        }
        else {
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.write(files.toString());
          response.end();
        }


      });

    }
    ////////////perehod tudq dolzhen bqtj
    else {

      console.log("file: " + './files/' + id);
      //send picture to here :)
      if (fs.existsSync('./files/' + id)) {
        fs.readFile('./files/' + id, function (error, data) {
          if (error) {
            console.log("Something went wrong");
            console.log(error)
            response.writeHead(500, { "Content-Type": "text/html" });
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
      else {
        console.log("We don't have this file: " + id);
      }

    }
  }
}

function remove(response, request, id) {

  if (id == undefined) {
    //uto4naet i removaet vse
  }
  else {
    if(id.includes("%")){ 
    id = (function (fileName) {
      return fileName.replace(/%20/g, " ");
    }(id));}
    console.log('Handler REMOVE works with: ' + id);

    var dataPath = ROOT + id;

    if (fs.lstatSync(dataPath).isDirectory()) {
      rimraf.sync(dataPath);
      console.log("Try to delete dir: " + dataPath);
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("true");
      response.end();
      console.log("Directory deleted: " + dataPath);
    }
    else {
      console.log("Try to delete file: " + dataPath);
      if (fs.existsSync(dataPath)) {
        fs.unlinkSync(dataPath);
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("true");
        response.end();
        console.log("File deleted: " + dataPath);
      }
      else {
        console.log("We don't have this file: " + dataPath);
      }
    }
  }
}


function getUserData(response, request, id) {
  console.log("Send data about user.");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write(authorization.getDir(authorization.getUser()));
  response.end();
}

function getDataType(response, request, id) {
    
  if(id.includes("%")){ 
     id = (function (fileName) {
    return fileName.replace(/%20/g, " ");
  }(id));}
  console.log('Handler getDataType works with: ' + id);
 
  var dataPath = ROOT + id;
    
  if (fs.lstatSync(dataPath).isDirectory()) {
    console.log("Send data type for: " + dataPath);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write('dir');
    response.end();
  }
  else{
    console.log("Send data type for: " + dataPath);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(mime.lookup(dataPath));
    response.end();
  }
}


function start(response, request, id) {
  console.log("Request handler 'start' was called.");

  //var page = fs.readFileSync('./pages/index.html');
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Your id is: " + id);
  response.end();
}



exports.start = start;

exports.upload = upload;
exports.show = show;
exports.download = download;
exports.remove = remove;

exports.getUserData = getUserData;
exports.getDataType = getDataType;


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