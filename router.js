const url = require("url");
const requestAssets = require("./requestAssets");

function route(handle, path, response, request) {
  
  var pathname = url.parse(path).pathname;
  var method = pathname.split('/');
  //делим что бы ид странице передавать

  console.log("Function route works with " + pathname);
  console.log(method[1]);

  if (path == '' || path == '/') {
    requestAssets.loadFile('/index.html', response);
  } 
  else if(typeof handle[method[1]] === 'function'){
    handle[method[1]](response, request, method[2]);
    //проверяем на наличие функции, если есть то запуск
  }
  else {
    console.log("Send to assets handler: " + pathname);
    requestAssets.loadFile(pathname, response);
  }
}

exports.route = route;