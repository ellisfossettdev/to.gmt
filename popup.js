// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const notificationText = document.getElementById('notificationText');
    const closeButton = document.getElementById('close');
  
    // Set the text of the notification
    chrome.storage.local.get(['gmtTime'], function(result) {
      notificationText.textContent = result.gmtTime;
    });
  
    // Close the popup when the Close button is clicked
    closeButton.addEventListener('click', function() {
      window.close();
    });
  });
  