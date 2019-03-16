
window.onload = function () {

    
    var testArray = ["testImage", "testFolder", "testTextDocument", "testDocument"];

    for (var i = 0; i < testArray.length; i++) {
        addButtons(testArray[i]);
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
            alert("Download file: " + btnDownload.id);
        }
        var btnShow = document.createElement("button");
        btnShow.innerText = "Show";
        btnShow.className = "btnShow";
        btnShow.id = fileName;
        btnShow.onclick = function () {
            alert("Show file: " + btnShow.id);
        }



        rowDiv.appendChild(name);
        rowDiv.appendChild(btnDownload);
        rowDiv.appendChild(btnShow);
        document.getElementById("main").appendChild(rowDiv);

    }


}