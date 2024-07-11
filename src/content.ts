document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection()?.toString().trim();
  console.log('Selected text:', selectedText);
  if (selectedText && selectedText.length > 0) {
    chrome.runtime.sendMessage({ action: 'saveSelection', data: selectedText }, (response) => {
      console.log('Response from background script:', response);
    });
  }
});
