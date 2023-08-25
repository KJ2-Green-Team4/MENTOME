let isResizing = false;
let isDragging = false;
let offsetX, offsetY;
let videoContainer = document.querySelector('.video-container');
let resizer = document.querySelector('.resizer');

resizer.addEventListener('mousedown', initResize, false);
videoContainer.addEventListener('mousedown', initDrag, false);

function initResize(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    isResizing = true;
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
}

function resize(e) {
    if (!isResizing) return;
    const videoElement = document.getElementById('fileDisplay');
    const canvasElement = document.getElementById('canvas');
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;

    const newWidth = e.clientX - videoContainer.offsetLeft;
    const newHeight = newWidth / aspectRatio;

    // Apply styles to the video container, video, and canvas
    videoContainer.style.width = newWidth + 'px';
    videoContainer.style.height = newHeight + 'px';
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
    socket.emit("resize_video_container", syncData, roomName);
}


function stopResize() {
    isResizing = false;
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
}

function initDrag(e) {
    if (e.target === resizer) return; // Prevent drag when resizing
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    isDragging = true;
    offsetX = e.clientX - videoContainer.offsetLeft;
    offsetY = e.clientY - videoContainer.offsetTop;
    window.addEventListener('mousemove', drag, false);
    window.addEventListener('mouseup', stopDrag, false);
}

function drag(e) {
    if (!isDragging) return;
    videoContainer.style.left = e.clientX - offsetX + 'px';
    videoContainer.style.top = e.clientY - offsetY + 'px';
    // 동영상1 리사이즈, 드래그 동기화
    socket.emit("drag_video_container", { left: videoContainer.style.left, top: videoContainer.style.top }, roomName);
}

function stopDrag() {
    isDragging = false;
    window.removeEventListener('mousemove', drag, false);
    window.removeEventListener('mouseup', stopDrag, false);
}


// 동영상1 리사이즈, 드래그 동기화
socket.on("resize_video_container", (data) => {
    videoContainer.style.width = data.width;
    videoContainer.style.height = data.height;
    const canvasElement = document.getElementById('canvas');
    const videoElement = document.getElementById('fileDisplay');
    canvasElement.style.width = data.canvasWidth;
    canvasElement.style.height = data.canvasHeight;
    videoElement.style.width = data.videoWidth;
    videoElement.style.height = data.videoHeight;
});

socket.on("drag_video_container", (data) => {
    videoContainer.style.left = data.left;
    videoContainer.style.top = data.top;
});


// video-container 사이즈 같게 하기
function setVideoSize(videoElement, width) {
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    videoElement.style.width = width || videoElement.offsetWidth + 'px';
    videoElement.style.height = (videoElement.offsetWidth / aspectRatio) + 'px';
}

function onVideoMetadataLoaded() {
    setVideoSize(this);

    const videoElement = this;
    // 동영상 크기를 video-container에 적용
    videoContainer.style.width = videoElement.style.width;
    videoContainer.style.height = videoElement.style.height;
}

function onWindowResized() {
    setVideoSize(document.getElementById('fileDisplay'));
}

const fileDisplayElement = document.getElementById('fileDisplay');
fileDisplayElement.addEventListener('loadedmetadata', onVideoMetadataLoaded);
window.addEventListener('resize', onWindowResized);
