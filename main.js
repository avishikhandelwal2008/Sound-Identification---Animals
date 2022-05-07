function start() {
    navigator.mediaDevices.getUserMedia({ audio: true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/FxOey3FxH/model.json', modelReady);
}
cat = 0;
dog = 0;
lion = 0;

function modelReady() {
    classifier.classify(gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        r = Math.floor(Math.random() * 255) + 1;
        g = Math.floor(Math.random() * 255) + 1;
        b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("audio_played").innerHTML= "Detected voice is of - "+results[0].label;
        document.getElementById("audio_played").style.color = "rgb("+r+","+g+","+b+")";
        document.getElementById("count").innerHTML= "Detected Dog - "+dog+' , Detected Cat - '+cat+' , Detected Lion - '+lion;
        document.getElementById("count").style.color = "rgb("+r+","+g+","+b+")";

        img = document.getElementById("gif");
        if (results[0].label == "Bark") {
            img.src='dog.png'; 
            dog= dog+1;
        }
        else if (results[0].label == "Meow") {
            img.src='cat.png'; 
            cat= cat+1;
        }
        else if (results[0].label == "Roar") {
            img.src='lion.png'; 
            lion= lion+1;
        }
        else {
            img.src= "listen (1).gif";
        }
    }
}