const form = welcome.querySelector('form');
const room = document.getElementById('room');
const userName = document.cookie
    .split('; ')
    .find((row) => row.startsWith('logInUser='))
    .split('=')[1];

room.hidden = true;

function addMessage(message) {
    const p = room.querySelector('p');
    const li = document.createElement('p');
    li.innerText = message;
    p.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    socket.emit('new_message', input.value, roomName, () => {
        addMessage(`${userName}: ${value}`);
    });
    input.value = '';
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('#name input');
    socket.emit('nickname', input.value);
}

const btn = document.getElementById('ToggleChat');
const div = document.getElementById('chat-info');

btn.addEventListener('click', function () {
    if (div.style.opacity === '1' || getComputedStyle(div).opacity === '1') {
        div.style.opacity = '0';
        setTimeout(function () {
            div.style.display = 'none';
            btn.style.fill = '#000';
        }, 300); // 300ms is the duration of the transition set in CSS
    } else {
        div.style.display = 'block';
        // Using setTimeout to ensure display: block; is applied first before changing opacity
        setTimeout(function () {
            div.style.opacity = '1';
            btn.style.fill = '#8eb6f7';
        }, 10);
    }
});

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector('h3');
    // h3.innerText = `${roomName}`;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#name');
    msgForm.addEventListener('submit', handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);

    // 파일 업로드 관련
    fileUploadForm.style.display = 'block';
    fileUploadForm2.style.display = 'block';

    // pose (스켈레톤) 이미지 관련
    video.addEventListener('loadedmetadata', function () {
        canvasCtx5.width = video.videoWidth;
        canvasCtx5.height = video.videoHeight;
    });
}

function handleRoomSubmit() {
    socket.emit('enter_room', roomName, showRoom);
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
    const h3 = room.querySelector('h3');
    // h3.innerText = `Room ${roomName} (${newCount})`;
    // h3.innerText = `Room ${roomName}`;
    // addMessage(`${user} arrived!`);
});

socket.on('bye', (left, newCount) => {
    const h3 = room.querySelector('h3');
    // h3.innerText = `Room ${roomName} (${newCount})`;
    // h3.innerText = `Room ${roomName}`;
    playExitSound();
    addMessage(`${left}님이 방을 나갔습니다.`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
    const roomList = welcome.querySelector('p');
    roomList.innerHTML = '';
    if (rooms.length === 0) {
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement('li');
        li.innerText = room;
        roomList.append(li);
    });
});
