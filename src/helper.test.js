const helpr = require('./helpers')


describe('addChildren adds elements to parent', () => {
  document.body.innerHTML = '<div id="parent"></div>';
  const parent = document.querySelector('#parent')
  const pgraph = helpr.textEl('p', 'hello')
  helpr.addChildren(parent, [pgraph])

  expect(document.body.innerHTML).toBe('<div id="parent"><p>hello</p></div>')

})


describe('textEl function is defined', () => {
  let textel = document.createElement('p')
  textel.innerHTML = 'hello'

  test('textEl does as intended', () => {
    expect(helpr.textEl('p', 'hello')).toMatchObject(textel)
  })

  test('function is defined', () => {
    expect(helpr.textEl()).toBeDefined();
  })
  test('function is not undefined', () => {
    expect(helpr.textEl()).not.toBeUndefined();
  })
})


describe('ClassyDiv function is defined and behaves as expected', () => {
  let resultDiv = document.createElement('div')

  test('classyDiv should create a div element', () => {
    expect(helpr.classyDiv('className')).toMatchObject(resultDiv)
  })

  test('classyDiv should be defined', () => {
    expect(helpr.classyDiv('className')).toBeDefined()
  })

  test('It should create a div tag ', () => {
    expect(helpr.classyDiv('className')).not.toBeNull()
  })
})

describe('CreateTag function', () => {
  let tagEle = document.createElement('ul')
  tagEle.setAttribute('class', 'className')

  test('createTag should create the specified element', () => {
    expect(helpr.createTag('className')).toMatchObject(tagEle)
  })

  test('createTag should be defined', () => {
    expect(helpr.createTag('ul')).toBeDefined()
  })

  test('It should create a div tag ', () => {
    expect(helpr.createTag('ul')).not.toBeNull()
  })
})
