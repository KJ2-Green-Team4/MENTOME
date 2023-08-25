// whiteboard.js

// 브러쉬 색상 선택 및 선굵기 선택
const color = document.getElementById('color'); // 브러쉬 색상 선택
const linewidth = document.querySelector('#line-width'); // 선 굵기 조절

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function drawLine(x1, y1, x2, y2, colorValue = color.value, linewidthValue = linewidth.value) {
    const canvas = document.getElementById('drawcanvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = colorValue;
    canvasCtx.lineWidth = linewidthValue;
    canvasCtx.moveTo(x1, y1);
    canvasCtx.lineTo(x2, y2);
    canvasCtx.stroke();
    canvasCtx.closePath();
}

function drawAndEmit(x1, y1, x2, y2, roomName) {
    drawLine(x1, y1, x2, y2);
    socket.emit('drawing', { x1, y1, x2, y2, color: color.value, linewidth: linewidth.value, roomName });
}

// 지우개
function clearCanvas() {
    const canvas = document.getElementById('drawcanvas');
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}


const drawCanvas = document.getElementById('drawcanvas');
const toggleDrawCanvasButton = document.getElementById('toggleDrawCanvasButton');
const canvasToolsWrapper = document.getElementById('canvas-tools-wrapper');

toggleDrawCanvasButton.addEventListener('click', () => {
    if (drawCanvas.style.display === 'none' && canvasToolsWrapper.style.display === 'none') {
        // Show the draw canvas
        drawCanvas.style.display = 'block';
        // Show the draw canvas tools
        canvasToolsWrapper.style.display = 'block';
        // 캔버스 토글 상태 동기화
        socket.emit('toggle_drawCanvas', { state: 'block', roomName });
    } else {
        // Hide the draw canvas
        drawCanvas.style.display = 'none';
        // Hide the draw canvas tools
        canvasToolsWrapper.style.display = 'none';
        // 캔버스 토글 상태 동기화
        socket.emit('toggle_drawCanvas', { state: 'none', roomName });
    }
});

window.onload = () => {
    // onload 중복으로 인해 여기에 추가 (방 자동 입장)
    if (document.cookie.split('; ').find(row => row.startsWith('roomName='))) {
        console.log("!!!");
        autoEnterRoom();
    } else {
        console.log("!!");
        window.location.href = '/';
    }
    
    const canvas = document.getElementById('drawcanvas');
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];

        // Emit a 'start_drawing' event to the server when the drawing starts
        socket.emit('start_drawing', { x: lastX, y: lastY, roomName });
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const x = e.offsetX;
        const y = e.offsetY;
        drawAndEmit(lastX, lastY, x, y, roomName);
        [lastX, lastY] = [x, y];
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // In the client-side code, after the Socket.IO connection is established
    socket.on('drawing', (data) => {
        drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.linewidth);
    });


    // 지우개
    const clearCanvasButton = document.getElementById('clearCanvasButton');
    clearCanvasButton.addEventListener('click', () => {
        clearCanvas();
        socket.emit('clear_canvas', roomName);
    });

    socket.on('clear_canvas', () => {
        clearCanvas();
    });

    // 캔버스 토글 상태 동기
    socket.on('toggle_drawCanvas', (data) => {
        drawCanvas.style.display = data.state;
        canvasToolsWrapper.style.display = data.state;
    });
};

/* 변경된 선 굵기 값을 적용 받게 하는 함수 */
function handleChangeWidth(event) {
    linewidth.value = event.target.value;
}

/* 변경된 색상 값을 적용 받게 하는 함수 */
function handleChangeColor(event) {
    color.value = event.target.value; // 여기를 수정
}

linewidth.addEventListener("change", handleChangeWidth);
color.addEventListener("change", handleChangeColor);

const pencil = document.getElementById('toggleDrawCanvasButton');
let pencilMode = false;

pencil.addEventListener('click', function () {
    socket.emit('pencilClickToServer', roomName);

    if (!pencilMode) {
        document.body.classList.add('button-pointer');
        pencilMode = true;
    } else {
        document.body.classList.remove('button-pointer');
        pencilMode = false;
    }
});

socket.on('pencilClickToClient', () => {
    if (!pencilMode) {
        document.body.classList.add('button-pointer');
        pencilMode = true;
    } else {
        document.body.classList.remove('button-pointer');
        pencilMode = false;
    }
});