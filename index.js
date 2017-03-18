'use strict'

module.exports = clipboardCopy

function clipboardCopy (text) {
  var div = document.createElement('div')
  div.textContent = text
  document.body.appendChild(div)

  var range = document.createRange()
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
