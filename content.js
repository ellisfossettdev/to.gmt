function convertTimeToGMT(element) {
    const timeText = element.textContent;
    const timeRegex = /(\d{1,2}):(\d{2}) (AM|PM|CEST)/i;
    const match = timeText.match(timeRegex);
  
    if (match) {
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const meridiem = match[3].toLowerCase();
  
      if (meridiem === "pm" && hours !== 12) {
        hours += 12;
      }
  
      const timeZoneOffsets = {
        "pt": -7,
        "ct": -5,
        "cest": 2
      };
  
      const timezoneOffset = timeZoneOffsets[meridiem] || 0;
  
      const date = new Date(`2000-01-01T${hours}:${minutes}:00`);
      const gmtTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000 - timezoneOffset * 3600000);
  
      // Send message to background script to store GMT time
      chrome.runtime.sendMessage({ action: 'storeGMTTime', data: `GMT Time: ${gmtTime.toTimeString().split(' ')[0]}` });
  
      const notificationOptions = {
        type: "popup",
        url: "popup.html",
        width: 300,
        height: 150
      };
  
      chrome.windows.create(notificationOptions);
    }
  }
  
  function processPage() {
    const elementsWithTime = document.querySelectorAll('p, span, div');
    elementsWithTime.forEach(element => {
      convertTimeToGMT(element);
    });
  }
  
  processPage();
  