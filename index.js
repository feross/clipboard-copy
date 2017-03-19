module.exports = clipboardCopy

function clipboardCopy (text) {
  // A <span> contains the text to copy
  var span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve spaces and newlines

  // An <iframe> isolates the <span> from the page's styles
  var iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'

  document.body.appendChild(iframe)
  var win = iframe.contentWindow
  win.document.body.appendChild(span)

  var selection = win.getSelection()
  var range = win.document.createRange()

  var success = false
  try {
    selection.removeAllRanges()
    range.selectNode(span)
    selection.addRange(range)

    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  iframe.remove()

  return success
}
