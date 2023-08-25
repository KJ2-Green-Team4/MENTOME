// 스켈레톤 tooltip 안보이게 설정 (스켈레톤 드랍다운 버튼 활성화시)
const addButton = document.getElementById('skeleton-dropdown-button');
const tooltip = addButton.querySelector('.tooltiptext');
let dropdownActive = false;

// Function to toggle tooltip visibility
function toggleTooltipVisibility() {
    if (!dropdownActive) {
        tooltip.style.visibility = 'visible';
    } else {
        tooltip.style.visibility = 'hidden';
    }
}

addButton.addEventListener('mouseenter', toggleTooltipVisibility);

addButton.addEventListener('mouseleave', () => {
    if (!dropdownActive) {
        tooltip.style.visibility = 'hidden';
    }
});

addButton.addEventListener('click', () => {
    dropdownActive = !dropdownActive;
    toggleTooltipVisibility();
});

// ImpactTime tooltip 안보이게 설정 (ImpactTime 드랍다운 버튼 활성화시)
const ImpactButton = document.getElementById('impact-dropdown-button');
const ImpactTooltip = ImpactButton.querySelector('.ImpactTooltiptext');
let ImpactDropdownActive = false;

// Function to toggle tooltip visibility
function toggleImpactTooltipVisibility() {
    if (!ImpactDropdownActive) {
        ImpactTooltip.style.visibility = 'visible';
    } else {
        ImpactTooltip.style.visibility = 'hidden';
    }
}

ImpactButton.addEventListener('mouseenter', toggleImpactTooltipVisibility);

ImpactButton.addEventListener('mouseleave', () => {
    if (!ImpactDropdownActive) {
        ImpactTooltip.style.visibility = 'hidden';
    }
});

ImpactButton.addEventListener('click', () => {
    ImpactDropdownActive = !ImpactDropdownActive;
    toggleImpactTooltipVisibility();
});

// toggleUploadbutton 다른곳 클릭시 드랍다운 메뉴 안보이게 설정
const toggleUploadbutton = document.getElementById('upload-dropdown-button');

toggleUploadbutton.addEventListener('blur', () => {
    const dropdown = document.getElementById('upload-dropdown-content');

    setTimeout(() => {
        dropdown.style.display = 'none';
        dropdown.style.opacity = 0;
    }, 200);
});