let getUniqueId = document.querySelector("#getUniqueId")
let successText = document.querySelector("#successText")
let successTextID = document.querySelector("#successTextID")
let warningText = document.querySelector("#warningText")

const copyToClipboard = str => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

const showSuccessMessage = text => {
  successTextID.innerHTML = text
  successText.style.display = "block"
  setTimeout(hideSuccessMessage, 3000)
}

const hideSuccessMessage = () => {
  successText.style.display = "none"
}

const showWarningMessage = () => {
  warningText.style.display = "block"
  setTimeout(hideWarningMessage, 5000)
}

const hideWarningMessage = () => {
  warningText.style.display = "none"
}

getUniqueId.onclick = element => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: 'var elem = "";' +
          'if (typeof elem !== \'undefined\' || elem !== null) { elem = document.querySelector(\'[modulename="cmc/foundation/TextViewer"]\') } else { var elem = document.querySelector(\'[modulename="cmc/foundation/TextViewer"]\') };' +
          'if (elem != null) { chrome.runtime.sendMessage({ text: elem.innerHTML }) } else { chrome.runtime.sendMessage({ text: "noidfound" }) };'
      }
    )
  })
}

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.text !== undefined && msg.text !== "noidfound") {
    copyToClipboard(msg.text)
    showSuccessMessage(msg.text)
  } else if (msg.text === "noidfound") {
    showWarningMessage()
  }
})

// Login text for testing:
// document.querySelector(\'[modulename="cmc/shell/LogonInputWidget::_$1_$0_$0"]\')
//
// Normal query:
// document.querySelector(\'[modulename="cmc/foundation/TextViewer"]\')