import React, {  useEffect, useRef } from 'react'
import * as fp from 'fingerpose'

const FingerPoseApp = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const runHandpose = async () => {
      const handpose = await fp.load()

      const video = videoRef.current
      video.width = 800
      video.height = 600

      const canvas = document.createElement('canvas')
      canvas.width = 800;
      canvas.height = 600;
      document.body.appendChild(canvas)

      const ctx = canvas.getContext('2d')

      const drawHand = (predictions, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (predictions.length > 0) {
          predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;

            for (let j = 0; j < landmarks.length; j++) {
              const x = landmarks[j][0];
              const y = landmarks[j][1];

              ctx.beginPath();
              ctx.arc(x, y, 5, 0, 2 * Math.PI);
              ctx.fillStyle = 'red'
              ctx.fill()
            }
          });
        }
      };

      const gesture = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
      ]);

      const getGesture = async () => {
        if (handpose && video.readyState === 4) {
          const predictions = await handpose.estimateHands(video);
          if (predictions.length > 0) {
            const result = gesture.estimate(predictions[0].landmarks, 7.5)
            console.log(result)
          }
          drawHand(predictions, ctx)
        }

        requestAnimationFrame(getGesture)
      }

      getGesture()
    }

    runHandpose()
  }, [])

  return (
    <div>
      <video
        ref={videoRef}
        style={{ transform: 'scaleX(-1)', display: 'none' }}
      ></video>
    </div>
  )}

  export default FingerPoseApp