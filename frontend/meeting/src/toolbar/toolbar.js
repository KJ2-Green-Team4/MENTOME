function showToggleTooltip() {
    const tooltip = document.getElementById('toggleTooltip');
    tooltip.style.display = 'block';
    setTimeout(function () {
        tooltip.style.display = 'none';
    }, 3000); // Hide the tooltip after 3 seconds (adjust as needed)
}
function toggleMic() {
    const micButton = document.getElementById('mute');
    micButton.classList.toggle('false');

    const micIcon = micButton.querySelector('svg');

    const trueIcon = `
      <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
      </svg>
    `;
    const falseIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path>
        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
      </svg>
    `;

    micIcon.outerHTML = micButton.classList.contains('false') ? falseIcon : trueIcon;
}

function toggleCamera() {
    const cameraButton = document.getElementById('camera');
    cameraButton.classList.toggle('false');
    if (!cameraButton) {
        console.error('Camera button not found');
        return;
    }

    const cameraIcon = cameraButton.querySelector('svg');
    if (!cameraIcon) {
        console.error('Camera icon not found');
        console.error('1');
        console.error(cameraButton);
        console.error('2');
        console.error(cameraIcon);
        return;
    }

    const trueIcon = `
    <svg focusable="false" width="20" height="20" viewBox="0 0 24 24" class="Hdh4hc cIGbvc NMm5M">
        <path
            d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"
        ></path>
    </svg>
    `;
    const falseIcon = `
    <svg focusable="false" width="20" height="20" viewBox="0 0 24 24" class="Hdh4hc cIGbvc NMm5M">
        <path
            d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"
        ></path>
    </svg>
    `;

    cameraIcon.outerHTML = cameraButton.classList.contains('false') ? falseIcon : trueIcon;
}

function toggleCanvasPen() {
    const CanvasPenButton = document.getElementById('toggleDrawCanvasButton');
    CanvasPenButton.classList.toggle('false');
    if (!CanvasPenButton) {
        console.error('CanvasPenButton not found');
        return;
    }

    const CanvasPenIcon = CanvasPenButton.querySelector('svg');
    if (!CanvasPenIcon) {
        console.error('CanvasPenIcon not found');
        console.error('1');
        console.error(CanvasPenButton);
        console.error('2');
        console.error(CanvasPenIcon);
        return;
    }

    const trueIcon = `
    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="20"
                                                        viewBox="0 -960 960 960"
                                                        width="20"
                                                    >
                                                        <g transform="translate(60,0)">
                                                            <path
                                                                d="M560-120q-12 0-21-9t-9-21q0-13 9-21.5t21-8.5q59 0 99.5-24t40.5-56q0-23-29.5-45T591-339l47-47q63 19 92.5 52.5T760-260q0 67-61 103.5T560-120ZM240-414q-64-14-92-44t-28-62q0-35 26-63t120-62q66-24 85-39t19-35q0-25-22-43t-68-18q-27 0-46 7t-34 22q-8 8-20.5 9.5T157-748q-11-8-11.5-20t7.5-21q17-22 51-36.5t76-14.5q68 0 109 32.5t41 88.5q0 41-28.5 69.5T290-590q-67 25-88.5 39.5T180-520q0 16 27 30.5t81 27.5l-48 48Zm496-154L608-696l45-45q18-18 40-18t40 18l48 48q18 18 18 40t-18 40l-45 45ZM220-180h42l345-345-42-42-345 345v42Zm-60 60v-128l405-405 128 128-405 405H160Zm405-447 42 42-42-42Z"
                                                            />
                                                        </g>
                                                    </svg>
    `;
    const falseIcon = `
    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="20"
                                                        viewBox="0 -960 960 960"
                                                        width="20"
                                                    >
                                                        <g transform="translate(60,0)">
                                                            <path
                                                                d="M560-120q-12 0-21-9t-9-21q0-13 9-21.5t21-8.5q59 0 99.5-24t40.5-56q0-23-29.5-45T591-339l47-47q63 19 92.5 52.5T760-260q0 67-61 103.5T560-120ZM240-414q-64-14-92-44t-28-62q0-35 26-63t120-62q66-24 85-39t19-35q0-25-22-43t-68-18q-27 0-46 7t-34 22q-8 8-20.5 9.5T157-748q-11-8-11.5-20t7.5-21q17-22 51-36.5t76-14.5q68 0 109 32.5t41 88.5q0 41-28.5 69.5T290-590q-67 25-88.5 39.5T180-520q0 16 27 30.5t81 27.5l-48 48Zm496-154L608-696l45-45q18-18 40-18t40 18l48 48q18 18 18 40t-18 40l-45 45ZM220-180h42l345-345-42-42-345 345v42Zm-60 60v-128l405-405 128 128-405 405H160Zm405-447 42 42-42-42Z"
                                                            />
                                                        </g>
                                                    </svg>

    `;

    CanvasPenIcon.outerHTML = CanvasPenButton.classList.contains('false') ? falseIcon : trueIcon;
}

function toggleCanvasButton() {
    socket.emit('toggleCanvasToServer', roomName);
    toggleCanvasPen();
}

socket.on('toggleCanvasToClient', () => {
    console.log('respone');
    toggleCanvasPen();
});

// Skeleton button 활성화 및 tooltip 글자 변경
function toggleAddSkeleton() {
    const toggleAddSkeletonbutton = document.getElementById('addSkeletonButton');
    const tooltipText = toggleAddSkeletonbutton.querySelector('.tooltiptext');

    toggleAddSkeletonbutton.classList.toggle('active');

    if (toggleAddSkeletonbutton.classList.contains('active')) {
        tooltipText.textContent = 'Remove Skeleton1';
    } else {
        tooltipText.textContent = 'Add Skeleton1';
    }
}

function toggleAddSkeleton2() {
    const toggleAddSkeletonbutton2 = document.getElementById('addSkeletonButton2');
    const tooltipText2 = toggleAddSkeletonbutton2.querySelector('.tooltiptext');

    toggleAddSkeletonbutton2.classList.toggle('active');

    if (toggleAddSkeletonbutton2.classList.contains('active')) {
        tooltipText2.textContent = 'Remove Skeleton2';
    } else {
        tooltipText2.textContent = 'Add Skeleton2';
    }
}
