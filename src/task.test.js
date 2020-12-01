const newTask = require('./task')

test('It should return a new task Object',()=>{
  expect(newTask('title')).toMatchObject({"completed": false, "description": "", "dueDate": "", "priority": "", "project": "default", "title": "title"})
})

test('It should be defined when called',()=>{
  expect(newTask()).toBeDefined()
})

