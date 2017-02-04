
var id = $( "meta[property='al:ios:url']" ).attr("content").split("/")[3];
console.log(id)
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get_id') {
        sendResponse(id);
    }
});
