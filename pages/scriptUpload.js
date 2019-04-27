window.onload = function () {

    document.getElementById("UploadBtn").disabled = true;

    document.getElementById("up").onclick = function(){
        document.getElementById("UploadBtn").disabled = false;

    }
}


    
/*
    if( document.getElementById("up").files.length == 0 ){
        document.getElementById("UploadBtn").disabled = true;   
    }
    else{
        document.getElementById("UploadBtn").disabled = false; 
    }
    
*/

