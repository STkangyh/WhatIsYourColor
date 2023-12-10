const URL = "./my_model/";
let model, webcam, labelContainer, maxPredictions, isPredicting = false;

async function startPredict() {
    if (!isPredicting) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        isPredicting = true;
    }
}

async function stopPredict() {
    if (webcam && isPredicting) {
        webcam.stop();
        isPredicting = false;
        await predict(); // Display prediction after stopping
    }
}

async function loop() {
    if (isPredicting) {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let highestProbability = 0;
    let predictedClass = '';

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestProbability) {
            highestProbability = prediction[i].probability;
            predictedClass = prediction[i].className;
        }
    }
    if (!isPredicting) {
        labelContainer.innerHTML = `예측 결과: ${predictedClass}`;
    }
}
