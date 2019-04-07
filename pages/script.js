window.onload = function () {
    //for updating data about files
     
    var fileList = (function (query) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", query, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }('show')).split("\n");


    for (var i = 0; i < fileList.length - 1; i++) {
        addButtons(fileList[i]);
    }

    function addButtons(fileName) {
        var name = document.createTextNode(fileName);
        var rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";

        var btnDownload = document.createElement("button");
        btnDownload.innerText = "Download";
        btnDownload.className = "btnDownload";
        btnDownload.id = fileName;
        btnDownload.onclick = function () {
            alert("download file");
            //prosto na ska4ivanie
        };
        var btnShow = document.createElement("button");
        btnShow.innerText = "Show";
        btnShow.className = "btnShow";
        btnShow.id = fileName;
        btnShow.onclick = function () {
            //window.location.href = 'show/' + btnDownload.id;
            //ta samaja funkcija na polui4enie, a tam uzhe vqvod v div
            
            var testImage = (function (query) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", query, false); // false for synchronous request
                xmlHttp.send(null);
                return xmlHttp.responseText;
            }('show/' + btnShow.id));
            //document.getElementById("additional").src = testImage;

            var img = document.createElement("img");
            img.src = testImage;
            var src = document.getElementById("additional");
            src.appendChild(img);
        }



        rowDiv.appendChild(name);
        rowDiv.appendChild(btnDownload);
        rowDiv.appendChild(btnShow);
        document.getElementById("main").appendChild(rowDiv);

    }


}