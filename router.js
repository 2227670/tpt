const url = require("url");
const requestAssets = require("./requestAssets");
const authorization = require("./authorization");

function route(handle, path, response, request) {

  var pathname = url.parse(path).pathname;
  var method = pathname.split('/');
  var handler = method[1];

  var query = (function (method) {
    var query = '';
    for (var i = 2; i < method.length; i++) {
      //slozhityj vse v ku4u :)
      query += '/' + method[i];
    }
    return query;
  }(method));


  console.log("Function ROUTE works with " + path);
  console.log("Handle name: " + method[1]);
  console.log('Query: ' + query);


  if (path == '' || path == '/') {
    if (authorization.login()) {
      requestAssets.loadFile('/index.html', response);
    }
    else {
      requestAssets.loadFile('/login.html', response);
    }

  }
  else if (typeof handle[method[1]] === 'function') {
    if (authorization.login()) {
      console.log('Send to ' + method[1] + ' handler: ' + query);
      handle[method[1]](response, request, query);
    }
    else {
      requestAssets.loadFile('/login.html', response);
    }
  }
  else {
    if (authorization.login()) {
      console.log("Send to ASSEST handler: " + pathname);
      requestAssets.loadFile(pathname, response);
    }
    else {
      requestAssets.loadFile('/login.html', response);
    }


  }
}

exports.route = route;