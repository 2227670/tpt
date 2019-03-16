const requestAssets = require("./requestAssets");

function route(handle, pathname, response, request) {
  console.log("Function route works with " + pathname);

  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("Send to assets handler: " + pathname);
    requestAssets.join(pathname, response);
  }
}

exports.route = route;



  //проверяем на наличие функции, если есть то запуск