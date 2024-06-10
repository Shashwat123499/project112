//https://teachablemachine.withgoogle.com/models/jIjQCLBa-/

Webcam.set ({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("webcam_view");

Webcam.attach('#webcam_view');

function capture_image() {
    Webcam.snap (function (data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jIjQCLBa-/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded!");
}

function predict_emotion() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
if (error) {
    console.error(error);
}
else {
    console.log(results);
    prediction_1=results[0].label;
    speak();
    if(results[0].label=="Best") {
        document.getElementById("prediction").innerHTML = "&#128077;";
    }
    if(results[0].label=="Great") {
        document.getElementById("prediction").innerHTML = "&#128076;";        
    }
    if(results[0].label=="Victory") {
        document.getElementById("prediction").innerHTML = "&#9996;";
    }
}
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The Gesture is" + prediction_1;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}