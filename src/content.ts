document.addEventListener('mouseup', () => {
  if (window.getSelection()?.empty) {
    console.log('No text selected');
    return;
  }
  const selectedText = window.getSelection()?.toString().trim();
  console.log('Selected text:', selectedText);
  if (selectedText && selectedText.length > 0) {
    chrome.runtime.sendMessage({ action: 'saveSelection', data: selectedText }, (response) => {
      console.log('Response from background script:', response);
    });
  }
});
