/* global DOMException */
const assert = require('assert')
const fs = require('fs')
const vm = require('vm')

async function test () {
  const children = []
  const document = {
    createElement: () => ({ style: {} }),
    createRange: () => ({}),
    body: {
      appendChild: span => children.push(span),
      removeChild: span => children.splice(children.indexOf(span), 1)
    }
  }
  const module = {}
  vm.runInNewContext(fs.readFileSync(require.resolve('./'), 'utf8'), {
    module,
    navigator: {},
    DOMException,
    document,
    window: { document, getSelection: () => null }
  })

  await assert.rejects(module.exports('text'), { name: 'NotAllowedError' })
  assert.strictEqual(children.length, 0)
}

test().catch(err => {
  console.error(err)
  process.exitCode = 1
})
