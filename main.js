Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wl695z9tw/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}
function check()
{
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if (error) {
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
      
        prediction_1 = results[0].label;
      
        speak();
        if(results[0].label == "victory or the often used in selfies ~cheese~.")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if(results[0].label == "Good luck or Good.")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "This looks terrific")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        
        
    }
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1 = " the meaning of the hand gesture is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 );
    synth.speak(utterThis);
}