const helpr = require('./helpers')

describe('textEl function', () =>{
  test('function is defined', () => {
    expect(helpr.textEl()).toBeDefined();
  })
  test('function is defined', () => {
    expect(helpr.textEl()).not.toBeUndefined();
  })
})


describe('ClassyDiv function',()=>{
  let resultDiv = document.createElement('div')

  test('classyDiv should create a div element',()=>{
    expect(helpr.classyDiv('className')).toMatchObject(resultDiv)
  })
//helpr.classyDiv('className')
  test('classyDiv should be defined',()=>{
    expect(helpr.classyDiv('className')).toBeDefined()
  })

  test('It should create a div tag ',()=>{
    expect(helpr.classyDiv('className')).not.toBeNull()
  })
})

describe('CreateTag function',()=>{
  let tagEle = document.createElement('ul')
  tagEle.setAttribute('class', 'className')

  test('createTag should create the specified element',()=>{
    expect(helpr.createTag('className')).toMatchObject(tagEle)
  })

  test('createTag should be defined',()=>{
    expect(helpr.createTag('ul')).toBeDefined()
  })

  test('It should create a div tag ',()=>{
    expect(helpr.createTag('ul')).not.toBeNull()
  })
})
