"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const displayArea = document.getElementById("displayArea");
  if (displayArea) {
    chrome.storage.local.get({ selections: [] }, (result) => {
      const selections = result.selections;
      displayArea.innerHTML = selections.join("<br>");
    });
  }
});
//# sourceMappingURL=popup.js.map

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("deleteButton")
    .addEventListener("click", function () {
      deleteData();
      location.reload();
    });
});

function deleteData() {
  chrome.storage.local.remove("selections", function () {
    if (chrome.runtime.lastError) {
      console.error("Error removing data:", chrome.runtime.lastError);
    } else {
      console.log("Data removed successfully");
      // You can add any additional logic here, such as updating the UI
    }
  });
}
