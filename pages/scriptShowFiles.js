//dir there we are
var DIR = '';

function changeDirectory(){
    //kak to sledit za tem v kakoi mq direktorii
    //hz kak
}

function querySender(query, method = 'GET') {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, query, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

window.onload = function () {
    //for updating data about files
    //get some info about User
    //checkatj 4to za 4tuka i esli directorija rabotatj s nej otdelno

    var userDir = querySender('getUserData/');
    DIR[0] = userDir;
    var fileList = querySender('show/' + userDir).split(',');

    for (var i = 0; i < fileList.length - 1; i++) {
        addButtons(fileList[i], querySender('getDataType/' + userDir + '/' + fileList[i]));
    }

    function addButtons(fileName, filetype) {
        var rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";

        var name = document.createTextNode(fileName);
        var type = document.createElement("LABEL");
        type.innerText = filetype;
        type.className = 'lblDataType';

        var btnDownload = document.createElement("button");
        btnDownload.innerText = "Download";
        btnDownload.className = "btnDownload";
        btnDownload.id = fileName;
        btnDownload.onclick = function () {
            window.location.href = 'download/' + btnDownload.id;
            //prosto na ska4ivanie
        };

        var btnShow = document.createElement("button");
        if (filetype == 'dir') {
            btnShow.innerText = "Open";
        }
        else btnShow.innerText = "Show";
        btnShow.className = "btnShow";
        btnShow.id = fileName;
        btnShow.onclick = function () {
            //we have path, we can show it picture :>
            var testImage = (function (query) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", query, false); // false for synchronous request
                xmlHttp.send(null);
                return xmlHttp.responseText;
            }('show/' + btnShow.id));


            var img = document.createElement("img");
            img.src = testImage;
            var src = document.getElementById("additional");
            src.appendChild(img);
        }

        var btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        btnDelete.className = "btnDelete";
        btnDelete.id = fileName;
        btnDelete.onclick = function () {
            //just delete file  /delete/id
            //window.location.href = 'remove/' + btnDelete.id;
            //location.reload(true);
            if ((querySender('remove/' + DIR + '/' + btnDelete.id)) == "true") {
                location.reload(true);
            }
            else alert("something went wrong");
        };

        rowDiv.appendChild(name);
        rowDiv.appendChild(type);
        if (filetype == 'dir') {
            //have a nice day :)
        }
        else rowDiv.appendChild(btnDownload);
        
        rowDiv.appendChild(btnShow);
        rowDiv.appendChild(btnDelete);
        document.getElementById("main").appendChild(rowDiv);
    }

}