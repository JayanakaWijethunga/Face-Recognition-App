//Capture upload file

const getFile = document.getElementById('uploadFile');

//Load Face Recognition Model

Promise.all([

faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

]).then(start)


function start(){
    document.body.append('Loaded');
    getFile.addEventListener('change', async() => {

      const image=await faceapi.bufferToImage(getFile.files[0])
      document.body.append(image)
      const detection=await faceapi.detectAllFaces(image)
      .withFaceLandmarks().withFaceDescriptors()
      document.body.append(detection.length)

    })
}