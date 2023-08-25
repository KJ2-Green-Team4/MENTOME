const skeletonDropdownButton = document.getElementById('skeleton-dropdown-button');
const skeletonDropdownContent = document.getElementById('skeleton-dropdown-content');

skeletonDropdownButton.addEventListener('click', function () {
    if (skeletonDropdownContent.style.display === 'block') {
        skeletonDropdownContent.style.display = 'none';
    } else {
        skeletonDropdownContent.style.display = 'block';
    }
});

const impactDropdownButton = document.getElementById('impact-dropdown-button');
const impactDropdownContent = document.getElementById('impact-dropdown-content');

impactDropdownButton.addEventListener('click', function () {
    if (impactDropdownContent.style.display === 'block') {
        impactDropdownContent.style.display = 'none';
    } else {
        impactDropdownContent.style.display = 'block';
    }
});

const uploadDropdownButton = document.getElementById('upload-dropdown-button');
const uploadDropdownContent = document.getElementById('upload-dropdown-content');

uploadDropdownButton.addEventListener('click', function () {
    if (uploadDropdownContent.style.opacity === '1' || getComputedStyle(uploadDropdownContent).opacity === '1') {
        uploadDropdownContent.style.opacity = '0';
        setTimeout(function () {
            uploadDropdownContent.style.display = 'none';
        }, 300); // 300ms is the duration of the transition set in CSS
    } else {
        uploadDropdownContent.style.display = 'block';
        // Using setTimeout to ensure display: block; is applied first before changing opacity
        setTimeout(function () {
            uploadDropdownContent.style.opacity = '1';
        }, 10);
    }
});
