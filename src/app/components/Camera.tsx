import { Button } from "react-bootstrap";

/* Test, ob Kamera angebunden werden kann*/
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  console.log("Let's get this party started");
}



function Camera() {

  let video = document.querySelector('video');

  let isAvailableCamera = false;

  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    isAvailableCamera = true;
    console.log("Let's get this party started");
  }


  async function openCamera(): void {
    try{
    const stream = await navigator.mediaDevices.getUserMedia({video: true});
    handleStream(stream);
    } catch {
      alert('error asking permissions of camera')
    }
  }

  const handleStream = async (stream: any) => {
    video ? video.srcObject = stream : await connectVideo(stream); 
    video?.play();
  }

  async function connectVideo(stream: any) {
    console.log('video element not found. retrying...');
    video = document.querySelector('video');
    video.srcObject = stream
  }

  function takePicture(): void {
    console.log('take picture called')
    const canvas = document.querySelector('canvas');
    const screenshotImage = document.querySelector('img');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas?.getContext('2d')?.drawImage(video, 0, 0);
    screenshotImage.src = canvas.toDataURL('image/webp');
    screenshotImage.classList.remove('d-none');
  }

  function closeCamera(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <h1>Branch to test camera</h1>
      {isAvailableCamera ? <>
      <p>Camera is available...</p>
      <video autoPlay></video>
      
      
      </> : null}
    
      <section className="mb-4">
      <Button variant="secondary" className="mt-4" onClick={() => openCamera()}>
        Open camera
      </Button>
      <Button variant="primary" className="mt-4"  onClick={() => takePicture()}>
        Take a picture
      </Button>
      <Button variant="secondary" className="mt-4"  onClick={() => closeCamera()}>
        Close camera
      </Button>
      </section>
      <section>
      <canvas class="d-none"></canvas>
      <img class="screenshot-image d-none" alt=""/>
      </section>
    </>
  );
}

export default Camera;
