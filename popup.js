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
        code: 'var string1 = document.querySelector(\'[modulename="cmc/foundation/TextViewer"]\').innerHTML; ' +
          'chrome.runtime.sendMessage({ text: string1 });'
      }
    );
  });
};

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.text !== undefined) {
    copyToClipboard(msg.text)
  }
});