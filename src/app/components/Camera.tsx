import { Button } from "react-bootstrap";

/* Test, ob Kamera angebunden werden kann*/
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  console.log("Let's get this party started");
}



function Camera() {

  const video = document.querySelector('video');

  let isAvailableCamera = false;

  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    isAvailableCamera = true;
    console.log("Let's get this party started");
  }


  async function openCamera(): void {
    try{
    const stream = navigator.mediaDevices.getUserMedia({video: true});
    handleStream(stream);
    } catch {
      alert('error asking permissions of camera')
    }
  }

  const handleStream = (stream: any) => {
    video? video.srcObject = stream : console.log('video element not found');
  }

  return (
    <>
      <h1>Branch to test camera</h1>
      {isAvailableCamera ? <>
      <p>Camera is available...</p>
      <video autoPlay></video>
      
      
      </> : null}
      <Button variant="primary" onClick={() => openCamera()}>
        Take a picture
      </Button>
     
    </>
  );
}

export default Camera;
