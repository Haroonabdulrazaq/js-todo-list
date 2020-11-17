//import helpr from './helpers'

const helpr = (() => {
  const addChildren = (parent, items) => {
    items.forEach(el => {
      parent.appendChild(el);
    });
  };

  const textEl = (elType, elText) => {
    const res = document.createElement(elType);
    res.innerHTML = elText;

    return res;
  };

  const classyDiv = (className) => {
    const res = document.createElement('div');
    res.setAttribute('class', className);

    return res;
  };

  const createTag = (el, className = '') => {
    const res = document.createElement(el);
    if (className != '') {
      res.setAttribute('class', className);
    }
    return res;
  }

  return { addChildren, textEl, classyDiv, createTag };
})();


const newTask = (title, description = '', dueDate = '', priority = '', completed = false, project = 'default') => ({
  title: title,
  description: description,
  dueDate: dueDate,
  priority: priority,
  completed: completed,
  project: 'default'
})

// title (str), tasks (array)
const newProject = (title) => ({
  title: title,
  tasks: []
})

// list containing projects
const projects = []
const projectList = document.querySelector('.project-list')

// DOM manipulation

const displayProject = (project) => {
  const projDiv = helpr.classyDiv('project')

  // TEMP: for delete fn
  const idx = projects.indexOf(project)
  projDiv.setAttribute('p-index', idx)

  const projectTitle = helpr.textEl('h3', project.title)
  const projectDel = helpr.createTag('button', 'del-project')
  projectDel.innerHTML = 'Delete Project'

  const projectEdit = helpr.createTag('button', 'edit-project')
  projectEdit.innerHTML = 'Edit'

  const editInput = helpr.createTag('input', 'edit-input')
   editInput.classList.add('hide')

  const taskList = helpr.createTag('ul', 'task-list')
  const taskDiv = document.createElement('div')

  const taskForm = document.createElement('form')
  let textIn = document.createElement('input')
  textIn.setAttribute('type', 'text')


  let taskSubmit = helpr.createTag('input', 'task-submit')
  taskSubmit.setAttribute('type', 'submit')
  taskSubmit.setAttribute('value', 'Add Task')

  helpr.addChildren(taskForm, [textIn, taskSubmit])
  helpr.addChildren(taskDiv, [taskList, taskForm])
  helpr.addChildren(projDiv, [projectTitle,  editInput, projectDel, projectEdit, taskDiv])
  projectList.appendChild(projDiv)

}


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
    let p = newProject(projectName)
    projects.push(p)

    document.querySelector('.project-list').innerHTML = ''
    projects.forEach(displayProject)
  }
})



document.querySelector('.project-list').addEventListener('click', function (e) {

  // TODO : renderTasks function

  // delete project button

  if (e.target && e.target.matches('button.del-project')) {
    const delIndx = e.target.parentNode.getAttribute('p-index')
    projects.splice(delIndx, 1)
    document.querySelector('.project-list').innerHTML = ''
    projects.forEach(displayProject)
  }

  // edit project button
  if (e.target && e.target.matches('button.edit-project')) {
    const editInput = e.target.parentNode.querySelector('.edit-input')
    const projectIndx = e.target.parentNode.getAttribute('p-index')
    editInput.classList.toggle('hide')
    
  }




  // submit task button

  if (e.target && e.target.matches('input.task-submit')) {

    const tasks = e.target.parentNode.parentNode.firstChild
    const taskInput = e.target.parentNode.firstChild.value
    const taskList = e.target.parentNode.parentNode.firstChild // selects .task-list
    const projIndx = e.target.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndx]

    if (taskInput.length != '') {
      const task = newTask(taskInput)
      project.tasks.push(task)
    }
  }

  // delete task button

  if (e.target && e.target.matches('button.task-del')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const taskList = e.target.parentNode.parentNode.firstChild
    const taskItem = e.target.parentNode.parentNode
    const projIndex = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndex]
    project.tasks.splice(taskIndex, 1)
    taskItem.remove()
  }

  // edit tasks

  if (e.target && e.target.matches('.task-div p')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const projIndex = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndex]
    const task = project.tasks[taskIndex]
    console.log(task)
  }
})


/* task CRUD
  add task form + button
  delete task button
  (edit)
  show/hide update form
  update task (form)
*/

// development data

const demoProj = newProject('Project 1')
projects.push(demoProj)

const demotask = newTask('task 1')
demoProj.tasks.push(demotask)


showProjects()