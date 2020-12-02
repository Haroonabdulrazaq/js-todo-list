const newProject = require('./project');

test('It should return a new task Object', () => {
  expect(newProject('title')).toMatchObject({ title: 'title', tasks: [] });
});

test('It should be defined when called', () => {
  expect(newProject()).toBeDefined();
});
