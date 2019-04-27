const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

var handle = {}
//handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;



//we can used it
handle["show"] = requestHandlers.show;
handle["download"] = requestHandlers.download;
handle["upload"] = requestHandlers.upload;
handle["remove"] = requestHandlers.remove;

handle["getUserData"] = requestHandlers.getUserData;
handle["getDataType"] = requestHandlers.getDataType;

server.start(router.route, handle);







/*
теперь должно быть как-то так

handle["download"] = requestHandlers.download;
handle["upload"] =  requestHandlers.upload;
handle["show"] =  requestHandlers.show;


1. парсить урл по другому
2. перенести все на страницы
3. сделать основные запросы
4. сделать дополнительные запросы

                    
                url.parse(request.url).pathname;
                     |    |  
http://localhost:8888/path/query?string - .search
                          |    | 
                        .query

*/



