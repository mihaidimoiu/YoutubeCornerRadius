// Function to apply the saved radius
function applySavedRadius(radius) {
  const cssCode = `
      .html5-video-player {
        border-radius: ${radius}px !important;
      }
      .html5-video-player .video-click-tracking,
      .html5-video-player .video-stream {
          border-radius: ${radius}px !important;
      }
  `;

  const style = document.createElement("style");
  style.textContent = cssCode;
  document.head.appendChild(style);
}

// Retrieve the saved radius from storage and apply it
chrome.storage.sync.get(['borderRadius'], function (result) {
  if (result.borderRadius !== undefined) {
      applySavedRadius(result.borderRadius);
  }
});

// Listen for messages from the popup to apply the updated radius
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.radius !== undefined) {
      applySavedRadius(request.radius);
  }
});
