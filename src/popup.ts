document.addEventListener('DOMContentLoaded', () => {
  const displayArea = document.getElementById('displayArea');
  if (displayArea) {
    chrome.storage.local.get({ selections: [] }, (result) => {
      const selections = result.selections;
      displayArea.innerHTML = selections.join('<br>');
    });
  }
});
