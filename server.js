const http = require("http");
//const url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    
    //var pathname = url.parse(request.url).pathname;
    console.log("Request for " + request.url + " received.");
 
    route(handle, request.url, response, request);
        
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;