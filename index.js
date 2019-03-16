const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/showFiles"] = requestHandlers.showFiles;

server.start(router.route, handle);