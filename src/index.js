const newTask = (title, description = '', dueDate = '', priority = '', completed = false, project = 'default') => ({
  title: title,
  description: description,
  dueDate: dueDate,
  priority: priority,
  completed: completed,
  project: 'default'
})

// list containing projects
const projects = []

// title (str), tasks (array)
const newProject = (title, tasks) => ({
  title: title,
  tasks: tasks
})

// module structure: tasks, projects, UI

// functions

/* project CRUD
  add project button
  delete project button
  (edit)
*/

// add project button
const addProject = document.querySelector('.add-project')
const projectForm = document.querySelector('.new-project-form')

addProject.addEventListener('click', () => {
  projectForm.classList.toggle('hide')
})

const createProject = document.querySelector('.create-project-btn')
createProject.addEventListener('click', (e) => {
  const projectName = document.querySelector('.new-project-name').value
  if (projectName.length > 0) {
    projects.push(projectName)
    console.log(projects)
  }
})


/* task CRUD
  add task form + button
  delete task button
  (edit)
  show/hide update form
  update task (form)
*/
