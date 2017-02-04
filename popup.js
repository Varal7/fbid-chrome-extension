/**
 * Author: Varal7
 * Date: Fev 2017
 **/

document.addEventListener('DOMContentLoaded', function() {
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {text: "get_id"}, function(id) {
      var status = document.getElementById('status');
      if (id && id > 0) {
          var html = "<p>Found Id:<br/></p><h2><code>" + id + "</code></h2>";
          html += '<p><a href="https://www.facebook.com/search/' + id + '/photos-of" title="Photos for this person">Available photos</p> ';
          status.innerHTML = html;
      } else {
          status.innerHTML = "<p>Id not found</p>";
      }
  });
 });
});
