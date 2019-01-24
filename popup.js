let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: 'var string1 = document.querySelector(\'[style="position: absolute; overflow: hidden; overflow-wrap: break-word; outline: none; pointer-events: auto; font-family: Helvetica, Arial, sans-serif; padding: 2px; width: 1195px; left: 170px; top: 0px; background-image: none; background-repeat: no-repeat; background-color: transparent; color: currentcolor; font-weight: inherit; font-style: inherit; font-size: inherit; display: block; white-space: normal; line-height: normal;"]\').innerHTML; ' +
          'chrome.runtime.sendMessage({ text: string1 });'
      },
      function (stuff) {
        console.log("stuff");
      });
  });
};

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.text !== undefined) {
    copyToClipboard(msg.text)
  }
});






/* changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'console.log("bananas")' });
  });
}; */

/* 'document.querySelector(\'[widgetid="dijit__WidgetBase_4051"]\').innerHTML = "The art of suggestive banana eating"' */
/* document.querySelector(\'[style="position: absolute; overflow: hidden; overflow-wrap: break-word; outline: none; pointer-events: auto; font-family: Helvetica, Arial, sans-serif; padding: 2px; width: 1195px; left: 170px; top: 0px; background-image: none; background-repeat: no-repeat; background-color: transparent; color: currentcolor; font-weight: inherit; font-style: inherit; font-size: inherit; display: block; white-space: normal; line-height: normal;"]\').innerHTML */