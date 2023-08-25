const enterSound = document.getElementById('enterSound');
const exitSound = document.getElementById('exitSound');

// 상대방이 입장했을 때 효과음 재생
function playEnterSound() {
    enterSound.currentTime = 0; // 재생 위치를 처음으로 되돌림
    enterSound.play();
}

// 상대방이 퇴장했을 때 효과음 재생
function playExitSound() {
    exitSound.currentTime = 0; // 재생 위치를 처음으로 되돌림
    exitSound.play();

    socket.emit('user_exitToServer', roomName); // 상대방에게 나가기 이벤트 보내기
}

// 상대방 입장 및 퇴장 시 효과음 재생
// 이 함수를 호출하면 효과음이 재생됩니다.
function handleUserEnter() {
    playEnterSound();
}

function handleUserExit() {
    playExitSound();
}

const exitButton = document.getElementById('exit');

function autoEnterRoom() {
    handleWelcomeSubmit();
    handleRoomSubmit();

    handleUserEnter(); // 영훈 입장 효과음
}

exitButton.addEventListener('click', () => {
        handleUserExit();
        console.log('유저 퇴장');
        setTimeout(() => {
            window.location.href = '/';
        }, 300);
});
