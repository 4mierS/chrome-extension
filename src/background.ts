chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveSelection') {
    // Daten speichern
    chrome.storage.local.get({ selections: [] }, (result) => {
      const selections = result.selections;
      selections.push(message.data);
      chrome.storage.local.set({ selections: selections }, () => {
        console.log('Selection saved:', message.data);
        sendResponse({ status: 'success' });
      });
    });
    return true; // Gibt an, dass sendResponse asynchron ist
  }
});


// Function to delete data from local storage
function deleteData() {
  chrome.storage.local.remove('selections', function() {
      if (chrome.runtime.lastError) {
          console.error('Error removing data:', chrome.runtime.lastError);
      } else {
          console.log('Data removed successfully');
      }
  });
}

// Call the function to delete the data

