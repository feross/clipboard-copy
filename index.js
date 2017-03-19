/* global Range */

module.exports = clipboardCopy

function clipboardCopy (text) {
  var div = document.createElement('div')
  div.textContent = text
  document.body.appendChild(div)

  window.getSelection().removeAllRanges()

  var range = new Range()
  range.selectNode(div)
  window.getSelection().addRange(range)

  var successful = false
  try {
    successful = document.execCommand('copy')
  } catch (err) {}

  window.getSelection().removeAllRanges()
  div.remove()

  return successful
}
