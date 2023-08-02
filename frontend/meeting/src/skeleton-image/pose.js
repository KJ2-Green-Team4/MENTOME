// 스켈레톤 이미지 씌우기
const addSkeletonButton = document.getElementById('addSkeletonButton');
addSkeletonButton.addEventListener('click', addSkeletonToVideo);
const canvas = document.getElementById('canvas');
const canvasCtx5 = canvas.getContext('2d');
const video = document.getElementById('fileDisplay');
let skeletonEnabled = false;
let animationFrameId;
//추가 
let recentV1Time = 0;
let recentV2Time = 0;
let video1SkeletonCoordinates = [];
let video2SkeletonCoordinates = [];
// 상하체 추가
let video1upperBodySkeletonCoordinates=[];
let video1lowerBodySkeletonCoordinates=[];
let video2upperBodySkeletonCoordinates = [];
let video2lowerBodySkeletonCoordinates =  [];


let similpos1 = [];
let similpos2 = [];

let flag1 = 0;
let flag2 = 0;

// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    },
});

async function addSkeletonToVideo() {
    skeletonEnabled = !skeletonEnabled; // 버튼 클릭시 토글
    if (skeletonEnabled) {
        // 스켈레톤 활성화시 pose 설정
        addSkeletonButton.textContent = 'Remove Skeleton'; // Add the line to change the button text

        // Set the canvas size to the video size
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
        pose.onResults(onResultsPose);

        const updatePose = async () => {
            try {
                // pass the video element
                await pose.send({ image: videoPlayer });
            } catch (error) {
                console.error('Error in pose.send:', error);
            }
            // call the next frame
            animationFrameId = requestAnimationFrame(updatePose);
        };
        // start the loop
        updatePose();
    } else {
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
    }
}

function zColor(data) {
    const z = clamp(data.from.z + 0.5, 0, 1);
    return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

// Modify the onResults function
function onResultsPose(results) {
    if (skeletonEnabled) {
        // 스켈레톤이 활성화되어 있을 때만 그림
        canvasCtx5.save();
        canvasCtx5.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx5.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
                const x0 = canvas.width * data.from.x;
                const y0 = canvas.height * data.from.y;
                const x1 = canvas.width * data.to.x;
                const y1 = canvas.height * data.to.y;

                const z0 = clamp(data.from.z + 0.5, 0, 1);
                const z1 = clamp(data.to.z + 0.5, 0, 1);

                const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                gradient.addColorStop(1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                return gradient;
            },
        });
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_LEFT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#FF0000' }
        );
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#00FF00' }
        );
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_NEUTRAL).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#AAAAAA' }
        );
        canvasCtx5.restore();
        // 유사도 좌표 받아오기 pose1

        if (video.currentTime === recentV1Time && flag1 < 30) {
            flag1 += 1;
        } else if (video.currentTime !== recentV1Time ) {
            flag1 = 0;
        }
       // 상체 하체 추가
       if (skeletonEnabled && flag1 < 30) {
        // const skeletonCoordinates = extractSkeletonCoordinates(results);
        const upperBodySkeletonCoordinates = extractSkeletonCoordinates(results,'upperBody');
        const lowerBodySkeletonCoordinates = extractSkeletonCoordinates(results,'lowerBody');
        // video1SkeletonCoordinates = skeletonCoordinates;
        video1upperBodySkeletonCoordinates = upperBodySkeletonCoordinates;
        video1lowerBodySkeletonCoordinates = lowerBodySkeletonCoordinates;
        recentV1Time = video.currentTime

        similpos1 = getPosition1(results);
        // console.log(video1SkeletonCoordinates);
        // console.log(video1upperBodySkeletonCoordinates);
        // console.log(video1lowerBodySkeletonCoordinates);
        }
    } else {
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

const addSkeletonButton2 = document.getElementById('addSkeletonButton2');
addSkeletonButton2.addEventListener('click', addSkeletonToVideo2);
const canvas2 = document.getElementById('canvas2');
const canvasCtx6 = canvas2.getContext('2d');
const video2 = document.getElementById('fileDisplay2');
let skeletonEnabled2 = false;
let animationFrameId2;

// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose2 = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    },
});


async function addSkeletonToVideo2() {
    skeletonEnabled2 = !skeletonEnabled2; // 버튼 클릭시 토글
    if (skeletonEnabled2) {
        // 스켈레톤 활성화시 pose 설정
        addSkeletonButton2.textContent = 'Remove Skeleton'; // Add the line to change the button text

        // Set the canvas size to the video size
        canvas2.width = videoPlayer2.videoWidth;
        canvas2.height = videoPlayer2.videoHeight;

        pose2.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
        pose2.onResults(onResultsPose2);

        const updatePose2 = async () => {
            try {
                // pass the video element
                await pose2.send({ image: videoPlayer2 });
            } catch (error) {
                console.error('Error in pose2.send:', error);
            }
            // call the next frame
            animationFrameId2 = requestAnimationFrame(updatePose2);
        };
        // start the loop
        updatePose2();
    } else {
        addSkeletonButton2.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx2 = canvas2.getContext('2d');
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        cancelAnimationFrame(animationFrameId2);
    }
}

// Modify the onResults function for the second video
function onResultsPose2(results) {
    if (skeletonEnabled2) {
        // 스켈레톤이 활성화되어 있을 때만 그림
        canvasCtx6.save();
        canvasCtx6.clearRect(0, 0, canvas2.width, canvas2.height);
        canvasCtx6.drawImage(results.image, 0, 0, canvas2.width, canvas2.height);
        drawConnectors(canvasCtx6, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
                const x0 = canvas2.width * data.from.x;
                const y0 = canvas2.height * data.from.y;
                const x1 = canvas2.width * data.to.x;
                const y1 = canvas2.height * data.to.y;

                const z0 = clamp(data.from.z + 0.5, 0, 1);
                const z1 = clamp(data.to.z + 0.5, 0, 1);

                const gradient = canvasCtx6.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                gradient.addColorStop(1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                return gradient;
            },
        });
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_LEFT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#FF0000' }
        );
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#00FF00' }
        );
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_NEUTRAL).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#AAAAAA' }
        );
        canvasCtx6.restore();
        // 유사도 측정좌표 pose2
        if (video2.currentTime === recentV2Time && flag2 < 30) {
            flag2 += 1;
        } else if (video2.currentTime !== recentV2Time ) {
            flag2 = 0;
        }
        // 상체 하체 추가 2
        if (skeletonEnabled && flag2 < 30) {
            // const skeletonCoordinates2 = extractSkeletonCoordinates2(results);
            const upperBodySkeletonCoordinates2 = extractSkeletonCoordinates2(results, 'upperBody');
            const lowerBodySkeletonCoordinates2 = extractSkeletonCoordinates2(results, 'lowerBody');
            // video2SkeletonCoordinates = skeletonCoordinates2;
            video2upperBodySkeletonCoordinates = upperBodySkeletonCoordinates2;
            video2lowerBodySkeletonCoordinates = lowerBodySkeletonCoordinates2;
            recentV2Time = video2.currentTime

            similpos2 = getPosition2(results);
            // console.log(video2upperBodySkeletonCoordinates);

        }
    } else {
        addSkeletonButton2.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas2.getContext('2d');
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    }
}