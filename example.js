const copy = require('./')

document.body.style.backgroundColor = 'red'

const $button = document.createElement('button')
$button.textContent = 'Copy text'
document.body.appendChild($button)

let num = 1
$button.addEventListener('click', () => {
  copy(`Cool text   ${num}`)
  num += 1
})
