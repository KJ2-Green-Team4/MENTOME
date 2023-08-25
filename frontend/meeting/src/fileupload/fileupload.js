// 파일 업로드
const fileUploadForm = document.getElementById('fileUpload');
const selectedFileInput = document.getElementById('selectedFile');

// 파일2 업로드
const fileUploadForm2 = document.getElementById('fileUpload2');
const selectedFileInput2 = document.getElementById('selectedFile2');

// 파일 업로드
fileUploadForm.addEventListener('change', (event) => {
    event.preventDefault();

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled) {
        addSkeletonToVideo();
    }

    // 로딩 스피너 활성화
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    // Get the selected file
    const selectedFile = selectedFileInput.files[0];
    console.log(selectedFile.name);
    if (selectedFile) {
        // Create a FormData object
        let formData = new FormData();
        // Add the file to the form data
        formData.append('file', selectedFile);

        // Send the form data using fetch
        fetch('/api/s3/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('File uploaded successfully. Server Response: ', data);
                socket.emit('file_uploaded', data.url, roomName);
                // Assume there is an img or video element to display the uploaded file
                const fileDisplayElement = document.getElementById('fileDisplay');
                fileDisplayElement.src = data.url;
                // Show the video player
                fileDisplayElement.style.display = 'block';

                // 로딩 스피너 비활성화
                loadingSpinner.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);
                fileDisplayElement.style.display = 'none';

                // 로딩 스피너 비활성화
                loadingSpinner.style.display = 'none';
            });

        // Clear the input
        selectedFileInput.value = '';
    } else {
        loadingSpinner.style.display = 'none';
    }
});

fileUploadForm2.addEventListener('change', (event) => {
    event.preventDefault();

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled2) {
        addSkeletonToVideo2();
    }

    // Get the selected file
    const selectedFile = selectedFileInput2.files[0];
    console.log(selectedFile.name);

    // 로딩 스피너를 활성화하는 코드
    const loadingSpinner2 = document.getElementById('loadingSpinner2');
    loadingSpinner2.style.display = 'block';

    if (selectedFile) {
        // Create a FormData object
        let formData = new FormData();
        // Add the file to the form data
        formData.append('file', selectedFile);

        // Send the form data using fetch
        fetch('/api/s3/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('File uploaded successfully. Server Response: ', data);
                socket.emit('file_uploaded2', data.url, roomName);
                // Assume there is an img or video element to display the uploaded file
                const fileDisplayElement2 = document.getElementById('fileDisplay2');
                fileDisplayElement2.src = data.url;
                // Show the video player
                fileDisplayElement2.style.display = 'block';

                // 로딩 스피너 비활성화
                loadingSpinner2.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);

                loadingSpinner2.style.display = 'none';
            });

        // Clear the input
        selectedFileInput2.value = '';
    } else {
        loadingSpinner2.style.display = 'none';
    }
});

socket.on('new_file', (url) => {
    const fileDisplayElement = document.getElementById('fileDisplay');
    fileDisplayElement.src = url;
    // Show the video player
    fileDisplayElement.style.display = 'block';

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled) {
        addSkeletonToVideo();
    }
});

// 파일2 업로드
socket.on('new_file2', (url) => {
    const fileDisplayElement2 = document.getElementById('fileDisplay2');
    fileDisplayElement2.src = url;
    // Show the video player
    fileDisplayElement2.style.display = 'block';

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled2) {
        addSkeletonToVideo2();
    }
});

// 파일 업로드 드랍다운 버튼

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

const uploadedFile = document.getElementById('uploadedFile');
const uploadedFile2 = document.getElementById('uploadedFile2');

// 파일 업로드 toggle 버튼

fileUploadForm.addEventListener('click', () => {
    socket.emit('fileuploadtoggleToServer1', roomName);
    uploadedFile.style.display = 'block';
});

// 파일 업로드 toggle 버튼2

fileUploadForm2.addEventListener('click', () => {
    socket.emit('fileuploadtoggleToServer2', roomName);
    uploadedFile2.style.display = 'block';
});

// 파일 업로드 toggle 동기화

socket.on('fileuploadtoggleToClient1', () => {
    uploadedFile.style.display = 'block';
});

// 파일 업로드 toggle 동기화 2

socket.on('fileuploadtoggleToClient2', () => {
    uploadedFile2.style.display = 'block';
});

// 동영상 전체 화면 설정을 막기 위한 함수
function preventFullscreen(element) {
    element.addEventListener('fullscreenchange', function (event) {
        if (document.fullscreenElement) {
            exitFullscreen(element);
        }
    });

    element.addEventListener('webkitfullscreenchange', function (event) {
        if (document.webkitFullscreenElement) {
            exitFullscreen(element);
        }
    });

    element.addEventListener('mozfullscreenchange', function (event) {
        if (document.mozFullScreenElement) {
            exitFullscreen(element);
        }
    });

    element.addEventListener('msfullscreenchange', function (event) {
        if (document.msFullscreenElement) {
            exitFullscreen(element);
        }
    });

    function exitFullscreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 업로드된 동영상 컨테이너들에 대해 동영상 전체 화면 설정을 막는 함수 호출
preventFullscreen(uploadedFile);
preventFullscreen(uploadedFile2);

// 로딩 스피너 관련 부분
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('fileDisplay');
    var spinner = document.getElementById('loadingSpinner');

    video.addEventListener('loadeddata', function () {
        spinner.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('fileDisplay2');
    var spinner = document.getElementById('loadingSpinner2');

    video.addEventListener('loadeddata', function () {
        spinner.style.display = 'none';
    });
});
