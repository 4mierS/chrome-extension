"use strict";
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});

chrome.contextMenus.create({
  id: "fastSave",
  title: "Fast Save",
  contexts: ["selection"], 
});

chrome.contextMenus.create({
  id: "groupSave",
  title: "Group Save",
  contexts: ["selection"],
});

/**
 * Listens for clicks on the context menu items and performs corresponding actions.
 * @param {Object} info - Information about the context menu click event.
 * @param {Object} tab - The tab that was clicked on.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fastSave") {
    console.log("Fast Save clicked - bg");
    const selectedText = info.selectionText?.trim();
    if (selectedText && selectedText.length > 0) {
        chrome.storage.local.get({ selections: [] }, (result) => {
            const selections = result.selections;
            selections.push(selectedText);
            chrome.storage.local.set({ selections: selections });
        });
    } else {
      return;
    }
  } else if(info.menuItemId === "groupSave") {
    //TODO: Implement group save
    console.log("Group Save clicked - bg");
    chrome.windows.create({
      url: chrome.runtime.getURL("/dist/groupSelection.html"),
      type: "popup",
      width: 300,
      height: 800,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveSelection") {
    console.log("Message - bg");
    chrome.storage.local.get({ selections: [] }, (result) => {
      const selections = result.selections;
      selections.push(message.data);
      chrome.storage.local.set({ selections: selections }, () => {
        console.log("Selection saved:", message.data);
        sendResponse({ status: "success" });
      });
    });
    return true;
  }
});
