module.exports = clipboardCopy

Object.defineProperty(clipboardCopy, 'isSupported', {
  enumerable: true,
  get: function () {
    try {
      return document.queryCommandSupported('copy')
    } catch (_) {
      return false
    }
  }
})

function clipboardCopy (text) {
  // Put the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'

  // An <iframe> isolates the <span> from the page's styles
  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'

  // Add the <iframe> to the page
  document.body.appendChild(iframe)

  // Add the <span> to the <iframe>
  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {}

  selection.removeAllRanges()
  win.document.body.removeChild(span)
  document.body.removeChild(iframe)

  return success
}
