let isResizing2 = false;
let isDragging2 = false;
let offsetX2, offsetY2;
let videoContainer2 = document.querySelector('.video-container2');
let resizer2 = document.querySelector('.resizer2');

resizer2.addEventListener('mousedown', initResize2, false);
videoContainer2.addEventListener('mousedown', initDrag2, false);

function initResize2(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // Stop event bubbling

    isResizing2 = true;
    window.addEventListener('mousemove', resize2, false);
    window.addEventListener('mouseup', stopResize2, false);
}

function resize2(ev) {
    if (!isResizing2) return;
    const videoElement = document.getElementById('fileDisplay2');
    const canvasElement = document.getElementById('canvas2');
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;

    const newWidth = ev.clientX - videoContainer2.offsetLeft;
    const newHeight = newWidth / aspectRatio;

    // Apply styles to the video container, video, and canvas
    videoContainer2.style.width = newWidth + 'px';
    videoContainer2.style.height = newHeight + 'px';
    videoElement.style.width = newWidth + 'px';
    videoElement.style.height = newHeight + 'px';
    canvasElement.style.width = newWidth + 'px';
    canvasElement.style.height = newHeight + 'px';

    // Create object with all the information
    const syncData = {
        width: newWidth + 'px',
        height: newHeight + 'px',
        canvasWidth: canvasElement.style.width,
        canvasHeight: canvasElement.style.height,
        videoWidth: videoElement.style.width,
        videoHeight: videoElement.style.height
    };

    // Emit to synchronize with others
    socket.emit("resize_video_container2", syncData, roomName);
}

function stopResize2() {
    isResizing2 = false;
    window.removeEventListener('mousemove', resize2, false);
    window.removeEventListener('mouseup', stopResize2, false);
}

function initDrag2(ev) {
    if (ev.target === resizer2) return; // Prevent drag when resizing
    ev.preventDefault();
    ev.stopPropagation(); // Stop event bubbling

    isDragging2 = true;
    offsetX2 = ev.clientX - videoContainer2.offsetLeft;
    offsetY2 = ev.clientY - videoContainer2.offsetTop;
    window.addEventListener('mousemove', drag2, false);
    window.addEventListener('mouseup', stopDrag2, false);
}

function drag2(ev) {
    if (!isDragging2) return;
    videoContainer2.style.left = ev.clientX - offsetX2 + 'px';
    videoContainer2.style.top = ev.clientY - offsetY2 + 'px';
    // 동영상2 리사이즈, 드래그 동기화
    socket.emit("drag_video_container2", { left: videoContainer2.style.left, top: videoContainer2.style.top }, roomName);

}

function stopDrag2() {
    isDragging2 = false;
    window.removeEventListener('mousemove', drag2, false);
    window.removeEventListener('mouseup', stopDrag2, false);
}


// 동영상2 리사이즈, 드래그 동기화
socket.on("resize_video_container2", (data) => {
    videoContainer2.style.width = data.width;
    videoContainer2.style.height = data.height;
    const canvasElement = document.getElementById('canvas2');
    const videoElement = document.getElementById('fileDisplay2');
    canvasElement.style.width = data.canvasWidth;
    canvasElement.style.height = data.canvasHeight;
    videoElement.style.width = data.videoWidth;
    videoElement.style.height = data.videoHeight;
});

socket.on("drag_video_container2", (data) => {
    videoContainer2.style.left = data.left;
    videoContainer2.style.top = data.top;
});


// video-container 사이즈 같게 하기
function setVideoSize2(videoElement, width) {
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    videoElement.style.width = width || videoElement.offsetWidth + 'px';
    videoElement.style.height = (videoElement.offsetWidth / aspectRatio) + 'px';
}

function onVideoMetadataLoaded2() {
    setVideoSize2(this);

    const videoElement = this;
    // 동영상 크기를 video-container에 적용
    videoContainer2.style.width = videoElement.style.width;
    videoContainer2.style.height = videoElement.style.height;
}

function onWindowResized2() {
    setVideoSize2(document.getElementById('fileDisplay2'));
}

const fileDisplayElement2 = document.getElementById('fileDisplay2');
fileDisplayElement2.addEventListener('loadedmetadata', onVideoMetadataLoaded2);
window.addEventListener('resize2', onWindowResized2);

