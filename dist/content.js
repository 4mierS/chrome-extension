"use strict";
document.addEventListener('mouseup', () => {
    var _a;
    const selectedText = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    console.log('Selected text:', selectedText);
    if (selectedText) {
        chrome.runtime.sendMessage({ action: 'saveSelection', data: selectedText }, (response) => {
            console.log('Response from background script:', response);
        });
    }
});
//# sourceMappingURL=content.js.map