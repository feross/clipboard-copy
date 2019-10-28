/* global DOMException */

module.exports = clipboardCopy

function copyViaExecCommand (text) {
// Put the text to copy into a <span>
  var span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'

  // Add the <span> to the page
  document.body.appendChild(span)

  // Make a selection object representing the range of text selected by the user
  var selection = window.getSelection()
  var range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  var success = false
  var err
  // Copy text to the clipboard
  try {
    success = window.document.execCommand('copy')
  } catch (e) {
    err = e
  }

  // Cleanup
  selection.removeAllRanges()
  window.document.body.removeChild(span)

  return success
    ? Promise.resolve()
    : Promise.reject(err)
}

function copyViaClipboardApi (text) {
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  return navigator.clipboard
    ? navigator.clipboard.writeText(text)
    : Promise.reject()
}

function clipboardCopy (text) {
  var clipboardApiError
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  return copyViaClipboardApi(text)
    .catch(function (err) {
      // fallback to document.execCommand() if it Clipboard API or not available
      clipboardApiError = err
      return copyViaExecCommand(text)
    })
    .catch(function (err) {
      throw err || clipboardApiError || new DOMException('The request is not allowed', 'NotAllowedError')
    })
}
