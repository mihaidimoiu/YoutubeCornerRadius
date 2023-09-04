// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const radiusSlider = document.getElementById('radiusSlider');
    const radiusValue = document.getElementById('radiusValue');
    const saveButton = document.getElementById('saveButton');

    // Load the saved radius from storage (if available)
    chrome.storage.sync.get(['borderRadius'], function (result) {
        if (result.borderRadius !== undefined) {
            radiusSlider.value = result.borderRadius;
            updateRadiusDisplay(result.borderRadius); // Update the display
        }
    });

    // Function to update the radius value display
    function updateRadiusDisplay(value) {
        radiusValue.innerText = value + 'px';
        radiusSlider.setAttribute('value', value); // Update the slider value
    }

    // Update the radius value display as the slider is moved
    radiusSlider.addEventListener('input', function () {
        const value = radiusSlider.value;
        updateRadiusDisplay(value); // Call the function to update the display
    });

    // Save the selected radius when the save button is clicked
    saveButton.addEventListener('click', function () {
        const value = radiusSlider.value;

        // Save the selected radius to storage
        chrome.storage.sync.set({ 'borderRadius': value }, function () {
            // Send a message to the content script to apply the updated radius
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { radius: value });
            });
        });
    });
});
