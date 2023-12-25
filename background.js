chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'deleteTab') {
    chrome.tabs.remove(request.tabId);
  }
});