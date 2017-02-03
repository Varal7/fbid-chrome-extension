/**
 * Author: Varal7
 * Date: Jan 2017
 **/

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

/**
 * @param {string} url - Url
 * @param {function(string,number,number)} callback - Called when id has
 *   been found.
 * @param {function(string)} errorCallback - Called when the id is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getId(url, callback, errorCallback) {
  var searchUrl = 'https://api.fbid.varal7.fr/?url=' + url;
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response || !response.id ) {
      errorCallback('No response from API!');
      return;
    }
    callback(response.id);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {

  getCurrentTabUrl(function(url) {
    var searchTerm = url;
    renderStatus("Searching for profile: " + url);
    getId(searchTerm, function(id){
        renderStatus(id);

        }, function(errorMessage) {
          renderStatus('Could not find id.' + errorMessage);
        });
    });
  });
