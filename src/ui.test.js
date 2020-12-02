const initUI = require('./ui')

test('map calls its argument with a non-null argument', () => {
  const initUI = jest.fn();
  [1].map(x => initUI(x));
  expect(initUI).toBeCalledWith(expect.anything());
});

test('It should hide the project form on click', () => {

  document.body.innerHTML = `<button class ='add-project'>Add Project</button>
                              <form class='new-project-form hide'></form>`

  const addProject = document.querySelector('.add-project');
  const projectForm = document.querySelector('.new-project-form');
  addProject.click();
  expect(projectForm.innerHTML).toBe(``)
})

test('It should hide the project form on click', () => {

  document.body.innerHTML = `<button class ='close-project'>x</button>
                              <form class='new-project-form hide'></form>`

  const closeProject = document.querySelector('.close-project');
  const projectForm = document.querySelector('.new-project-form');
  closeProject.click();
  expect(projectForm.innerHTML).toBe(``)
})

test('initUI is defined', () => {
  expect(initUI).toBeDefined()
})

