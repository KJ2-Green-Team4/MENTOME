// impactpoint 구현
let timeline1 = [];
let timeline2 = [];
let impactTimes1 = [];
let impactTimes2 = [];

function videoZero() {
    video.currentTime = 0.01;
}

function videoZero2() {
    video2.currentTime = 0.01;
}

function videoPauser1() {
    if (video.currentTime > 0.09) {
        requestAnimationFrame(videoPauser1);
    } else {
        video.playbackRate = 1;
        video.pause();
        waitImpact = true;
        socket.emit('pause_video', roomName);
        setTimeout(() => {
            videoZero();
        }, 500);
    }
}

function videoPauser2() {
    if (video2.currentTime > 0.09) {
        requestAnimationFrame(videoPauser2);
    } else {
        video2.playbackRate = 1;
        video2.pause();
        waitImpact = true;
        socket.emit('pause_video2', roomName);
        setTimeout(() => {
            videoZero2();
        }, 500);
    }
}

function getPosition1(results) {
    const landmark = [];
    let indices = [0, 12, 13, 14, 15, 16, 23, 24];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            landmark.push([x, y]);
        });
    }

    return landmark;
}

function getPosition2(results) {
    const landmark = [];
    let indices = [0, 12, 13, 14, 15, 16, 23, 24];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            landmark.push([x, y]);
        });
    }

    return landmark;
}

// [0, 12, 13, 14, 15, 16, 23, 24]
function getImpact1(results) {
    let saveFlag1 = true;
    let checkFlag1 = true;
    let saveFlag2 = true;
    let lefthigh = 1;
    let leftTime;
    let righthigh = 1;
    let rightTime;

    for (let i = 1; i < timeline1.length; i++) {
        if (
            saveFlag1 &&
            timeline1[i].positions[5][1] < timeline1[i].positions[3][1] &&
            timeline1[i].positions[5][1] < lefthigh
        ) {
            lefthigh = timeline1[i].positions[5][1];
            leftTime = timeline1[i].videoTime;
            checkFlag1 = false;
        }

        if (saveFlag1 && !checkFlag1 && timeline1[i].positions[5][1] > timeline1[i].positions[3][1]) {
            impactTimes1.push(leftTime);
            saveFlag1 = false;
        }

        if (
            !saveFlag1 &&
            saveFlag2 &&
            timeline1[i].positions[4][0] > timeline1[i].positions[1][0] &&
            timeline1[i].positions[4][0] >= timeline1[i].positions[6][0]
        ) {
            impactTimes1.push(timeline1[i].videoTime);
            saveFlag2 = false;
        }

        if (
            !saveFlag1 &&
            !saveFlag2 &&
            timeline1[i].positions[5][1] < righthigh &&
            timeline1[i].positions[5][0] >= timeline1[i].positions[0][0]
        ) {
            righthigh = timeline1[i].positions[5][1];
            rightTime = timeline1[i].videoTime;
        }
    }

    impactTimes1.push(rightTime);
}

function getImpact2(results) {
    let saveFlag1 = true;
    let checkFlag1 = true;
    let saveFlag2 = true;
    let lefthigh = 1;
    let leftTime;
    let middleTime;
    let righthigh = 1;
    let rightTime;

    for (let i = 1; i < timeline2.length; i++) {
        if (
            saveFlag1 &&
            timeline2[i].positions[5][1] < timeline2[i].positions[3][1] &&
            timeline2[i].positions[5][1] < lefthigh
        ) {
            lefthigh = timeline2[i].positions[5][1];
            leftTime = timeline2[i].videoTime;
            checkFlag1 = false;
        }

        if (saveFlag1 && !checkFlag1 && timeline2[i].positions[5][1] > timeline2[i].positions[3][1]) {
            impactTimes2.push(leftTime);
            saveFlag1 = false;
        }

        if (
            !saveFlag1 &&
            saveFlag2 &&
            timeline2[i].positions[4][0] > timeline2[i].positions[1][0] &&
            timeline2[i].positions[4][0] >= timeline2[i].positions[6][0]
        ) {
            impactTimes2.push(timeline2[i].videoTime);
            saveFlag2 = false;
        }

        if (
            !saveFlag1 &&
            !saveFlag2 &&
            timeline2[i].positions[5][1] < righthigh &&
            timeline2[i].positions[5][0] >= timeline2[i].positions[0][0]
        ) {
            righthigh = timeline2[i].positions[5][1];
            rightTime = timeline2[i].videoTime;
        }
    }

    impactTimes2.push(rightTime);
}

// function getImpact1() {
//     let saveFlag1 = true;
//     let saveFlag2 = true;
//     let saveFlag3 = true;
//     for (let i = 1; i < timeline1.length; i++) {
//         if (saveFlag1 && timeline1[i].positions[5][1] < timeline1[i].positions[0][1]) {
//             impactTimes1.push(timeline1[i].videoTime);
//             saveFlag1 = false;
//         } else if (!saveFlag1 && saveFlag2 && timeline1[i].positions[4][0] > timeline1[i].positions[6][0]) {
//             impactTimes1.push(timeline1[i].videoTime);
//             saveFlag2 = false;
//         } else if (!saveFlag1 && !saveFlag2 && saveFlag3 && timeline1[i].positions[5][0] < timeline1[i].positions[0][0]) {
//             impactTimes1.push(timeline1[i].videoTime);
//             saveFlag3 = false;
//             break;
//         }
//     }
// }

// function getImpact2() {
//     let saveFlag1 = true;
//     let saveFlag2 = true;
//     let saveFlag3 = true;
//     for (let i = 1; i < timeline2.length; i++) {
//         if (saveFlag1 && timeline2[i].positions[5][1] < timeline2[i].positions[0][1]) {
//             impactTimes2.push(timeline2[i].videoTime);
//             saveFlag1 = false;
//         } else if (!saveFlag1 && saveFlag2 && timeline2[i].positions[4][0] > timeline2[i].positions[6][0]) {
//             impactTimes2.push(timeline2[i].videoTime);
//             saveFlag2 = false;
//         } else if (!saveFlag1 && !saveFlag2 && saveFlag3 && timeline2[i].positions[5][0] < timeline2[i].positions[0][0]) {
//             impactTimes2.push(timeline2[i].videoTime);
//             saveFlag3 = false;
//             break;
//         }
//     }
// }

function timelinePusher1() {
    if (video.currentTime > 0.1) {
        let positionInfo = [];
        positionInfo.videoTime = video.currentTime;
        positionInfo.positions = similpos1;
        timeline1.push(positionInfo);
    }

    if (!video.paused) {
        requestAnimationFrame(timelinePusher1);
    } else {
        console.log('stop');
        getImpact1();
    }
}

function timelinePusher2() {
    if (video2.currentTime > 0.1) {
        let positionInfo = [];
        positionInfo.videoTime = video2.currentTime;
        positionInfo.positions = similpos2;
        timeline2.push(positionInfo);
    }

    if (!video2.paused) {
        requestAnimationFrame(timelinePusher2);
    } else {
        console.log('stop');
        getImpact2();
    }
}

function calImpact1() {
    timeline1 = [];
    impactTimes1 = [];
    socket.emit('pause_video', roomName);
    waitImpact = false;

    video.pause();
    video.currentTime = 0.1;
    video.playbackRate = 1;
    video.play();
    videoPauser1();

    timelinePusher1();
}

function calImpact2() {
    timeline2 = [];
    impactTimes2 = [];
    socket.emit('pause_video2', roomName);
    waitImpact = false;

    video2.pause();
    video2.currentTime = 0.1;
    video2.playbackRate = 1;
    video2.play();
    videoPauser2();

    timelinePusher2();
}

document.getElementById('impactTime1').addEventListener('click', function () {
    socket.emit('impact1', roomName);
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[0];
    video2.currentTime = impactTimes2[0];
    console.log(impactTimes1[0]);
    console.log(impactTimes2[0]);
});

document.getElementById('impactTime2').addEventListener('click', function () {
    socket.emit('impact2', roomName);
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[1];
    video2.currentTime = impactTimes2[1];
    console.log(impactTimes1[1]);
    console.log(impactTimes2[1]);
});

document.getElementById('impactTime3').addEventListener('click', function () {
    socket.emit('impact3', roomName);
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[2];
    video2.currentTime = impactTimes2[2];
    console.log(impactTimes1[2]);
    console.log(impactTimes2[2]);
});

document.getElementById('impactTimeReset').addEventListener('click', function () {
    socket.emit('doImpactReset', roomName);
    calImpact1();
    calImpact2();
});

// document.getElementById('testbutton').addEventListener('click', function() {
//     console.log(timeline1);
//     console.log(timeline2);
//     console.log(impactTimes1);
//     console.log(impactTimes2);
// });

socket.on('impact1', () => {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[0];
    video2.currentTime = impactTimes2[0];
    console.log(impactTimes1[0]);
    console.log(impactTimes2[0]);
});

socket.on('impact2', () => {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[1];
    video2.currentTime = impactTimes2[1];
    console.log(impactTimes1[1]);
    console.log(impactTimes2[1]);
});

socket.on('impact3', () => {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[2];
    video2.currentTime = impactTimes2[2];
    console.log(impactTimes1[2]);
    console.log(impactTimes2[2]);
});

// socket.on("doImpactReset", () => {
//     calImpact1();
//     calImpact2();
// });

// 임팩트 드랍다운 버튼

function toggleDropdownImpact() {
    const dropdownContent = document.getElementById('dropdownContent-impact');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}
