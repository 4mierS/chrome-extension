"use strict";
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started');
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