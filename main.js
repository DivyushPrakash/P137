loadedvideo = "";
modelstatus = "";
inputtext = "";
finalresults = [];

function preload() {
    loadedvideo = createVideo("junglevideo.mp4");
    loadedvideo.hide();

}

function setup() {
    canvas = createCanvas(550, 350);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
}

function startapp() {
    loadedmodel = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    inputtext = document.getElementById("animalinput").value;
    if (finalresults[loopvalue].label == inputtext) {
        document.getElementById("status").innerHTML = "Status : " + inputtext + " Has Been Found!";
    }
}

function modelloaded() {
    console.log("Model Loaded");
    modelstatus = true;
}

function draw() {
    image(webcam, 0, 0, 550, 350);
    if (modelstatus != "") {
        loadedmodel.detect(webcam, getresult);
    }
    for (loopvalue = 0; loopvalue < finalresults.length; loopvalue = loopvalue + 1) {
        document.getElementById("modelstatus").innerHTML = "Status : " + finalresults.length + " Objects Detected ";
        stroke("green");
        noFill();
        rect(finalresults[loopvalue].x, finalresults[loopvalue].y, finalresults[loopvalue].width, finalresults[loopvalue].height);
        stroke("green");
        fill("green");
        text(finalresults[loopvalue].label, finalresults[loopvalue].x, finalresults[loopvalue].y);
    }
}

function getresult(errorarray, resultsarray) {
    if (errorarray) {
        console.error(errorarray);
    } else {
        console.log(resultsarray);
        finalresults = resultsarray;
    }
}