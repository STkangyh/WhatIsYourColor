import React, { useEffect, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import "@tensorflow/tfjs";

function Detection() {
  const labelContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const maxPredictionsRef = useRef(null);

  const init = async () => {
    const URL = "./my_model/";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    modelRef.current = await tmImage.load(modelURL, metadataURL);
    maxPredictionsRef.current = modelRef.current.getTotalClasses();

    const flip = true;
    webcamRef.current = new tmImage.Webcam(200, 200, flip);
    await webcamRef.current.setup();
    await webcamRef.current.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcamRef.current.canvas);
  };

  const loop = async () => {
    webcamRef.current.update();
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    const prediction = await modelRef.current.predict(webcamRef.current.canvas);
    for (let i = 0; i < maxPredictionsRef.current; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
    }
  };

  const handleStart = () => {
    if (!modelRef.current) {
      init();
    }
  };

  useEffect(() => {
    return () => {
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
  }, []);

  return (
    <div>
      <button type="button" onClick={handleStart}>
        Start
      </button>
      <div id="webcam-container"></div>
      <div ref={labelContainerRef}></div>
    </div>
  );
}

export default Detection;