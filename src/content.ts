document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection()?.toString().trim();
  console.log('Selected text:', selectedText);
  if (selectedText) {
    chrome.runtime.sendMessage({ action: 'saveSelection', data: selectedText }, (response) => {
      console.log('Response from background script:', response);
    });
  }
});
