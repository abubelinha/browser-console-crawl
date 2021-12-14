
var storyPath = window.location.href;

// Console API to clear console before logging new data
console.API;
if (typeof console._commandLineAPI !== 'undefined') {
    console.API = console._commandLineAPI; //chrome
} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
    console.API = console._inspectorCommandLineAPI; //Safari
} else if (typeof console.clear !== 'undefined') {
    console.API = console;
}

// Extracts high level details of current story
function getCurrentStoryDetail() {

    console.API.clear();
    storyObj = {};
    storyObj.title = document.getElementsByClassName("graf--title")[0].innerText;
    storyObj.count = document.getElementsByClassName("js-multirecommendCountButton")[0].innerText;
    storyObj.name = document.getElementsByClassName("ds-link--styleSubtle")[0].innerText;
    storyObj.imageUrl = document.getElementsByClassName("avatar-image")[0].src;
    storyObj.profile = document.getElementsByClassName("ui-xs-clamp2")[0].innerText;
    storyObj.readTime = document.getElementsByClassName("readingTime")[0].getAttribute("title");   
    storyObj.url = storyPath;

    console.save(storyObj);

}

console.save = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }

    if (!filename) filename = 'story.json'

    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

getCurrentStoryDetail();

console.savehtml = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }

    if (!filename) filename = 'story.json'

    if (typeof data === "object") {
        // data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {
            type: 'text/html'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

console.savehtml(document.body.innerHTML, 'pagecontent.html'); // save full page
/* to avoid file destination dialog prompts:
https://stackoverflow.com/questions/25826573/download-txt-using-javascript-without-dialog-prompt/58918289#58918289
*/
