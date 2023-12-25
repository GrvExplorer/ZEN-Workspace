document.addEventListener('DOMContentLoaded', function() {
  var workspaceList = document.getElementById('workspace-list');
  var addTabButton = document.getElementById('add-tab');

  // Load saved tabs from storage
  chrome.storage.sync.get('tabs', function(data) {
    var tabs = data.tabs || [];

    // Display saved tabs
    tabs.forEach(function(tab) {
      var li = document.createElement('li');
      li.textContent = tab.title;
      workspaceList.appendChild(li);
    });
  });

  // Add a new tab
  addTabButton.addEventListener('click', function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      var activeTab = tabs[0];

      // Save the active tab to storage
      chrome.storage.sync.get('tabs', function(data) {
        var tabs = data.tabs || [];
        tabs.push({ title: activeTab.title, url: activeTab.url });

        // Update the saved tabs in storage
        chrome.storage.sync.set({ tabs: tabs }, function() {
          // Display the new tab in the workspace list
          var li = document.createElement('li');
          li.textContent = activeTab.title;
          workspaceList.appendChild(li);
        });
      });
    });
  });
});