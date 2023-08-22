chrome.runtime.onInstalled.addListener(() => {
    console.log("Background service worker installed.");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'storeGMTTime') {
      chrome.storage.local.set({ 'gmtTime': message.data }, function() {
        // Handle completion if needed
      });
    }
  });
  