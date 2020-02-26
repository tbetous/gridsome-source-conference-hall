const convertAbstractsToHtml = require('../convert-abstracts-to-html')

const talk1 = {
  abstract: `
# Hello World !

- Test 1
- Test 2
- Test 3
    `
}

const talk2 = {
  abstract: `
## Hello World 2 !
    `
}

const event = {
  talks: [talk1, talk2]
}

describe('convertAbstractsToHtml', () => {
  it('should convert talk abstract to html', () => {
    expect(convertAbstractsToHtml(event).talks[0].abstract)
      .toEqual(`<h1 id="helloworld">Hello World !</h1>
<ul>
<li>Test 1</li>
<li>Test 2</li>
<li>Test 3</li>
</ul>`)
    expect(convertAbstractsToHtml(event).talks[1].abstract).toEqual(
      `<h2 id="helloworld2">Hello World 2 !</h2>`
    )
  })
})
