//Capture upload file

const getFile = document.getElementById('uploadFile');

//Load Face Recognition Model

Promise.all([

faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

]).then(start)


function start(){

    const container=document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);
    document.body.append('Loaded');
    getFile.addEventListener('change', async() => {

      const image=await faceapi.bufferToImage(getFile.files[0])
      container.append(image)
      
      
      const canvas = faceapi.createCanvasFromMedia(image)
      container.append(canvas)
      const displaySize = {width:image.width,height:image.height}
      faceapi.matchDimensions(canvas,displaySize)
      const detection=await faceapi.detectAllFaces(image)
      .withFaceLandmarks().withFaceDescriptors()
      const resizeDetections = faceapi.resizeResults(detection,displaySize)
      resizeDetections.forEach(detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face'})
            drawBox.draw(canvas)


      })

    })
}