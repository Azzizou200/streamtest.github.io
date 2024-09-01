let constraintObj = {
    audio : false,
    video : true
};
const start = document.querySelector("#start")
const stopRecode = document.querySelector("#stop")
const video = document.querySelector("#live-feed")


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices.enumerateDevices()
  
      // Success callback
      .then((stream) => {stream.forEach(element => {  
            console.log(element.kind, element.label)        
      });})
  
      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
  navigator.mediaDevices.getUserMedia(constraintObj)
  .then(function(mediaStreamObj){    
    if ("srcObject" in video) {
        video.srcObject = mediaStreamObj
    } else {
        video.src = window.URL.createObjectURL(mediaStreamObj)
    }
    video.onloadedmetadata = function() {
        video.play()
    }

}) 
  const mediaRecorder = new MediaRecorder(mediaStreamObj)

  start.addEventListener("click",()=>{
    mediaRecorder.start()
    console.log(mediaRecorder.state)
    console.log("recording")

  })
  let chunk = []
  mediaRecorder.ondataavailable = (e) =>{
    chunk.puch(e.data)
  }
  stopRecode.addEventListener("click",()=>{
    mediaRecorder.stop
    console.log("reconding stop")
  })
  
    