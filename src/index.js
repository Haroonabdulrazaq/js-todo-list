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
  projectEdit.innerHTML = 'Edit Project'

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
  helpr.addChildren(projDiv, [projectTitle, editInput, projectEdit, projectDel, taskDiv])
  projectList.appendChild(projDiv)


  project.tasks.forEach((el) => {
    const taskItem = helpr.createTag('li', 'task-item')
    const taskDiv = helpr.classyDiv('task-div')

    const taskCheckbox = helpr.createTag('input', 'task-checkbox')
    taskCheckbox.setAttribute('type', 'checkbox')

    const index = project.tasks.indexOf(el)

    taskDiv.setAttribute('t-index', index)
    const taskTitle = helpr.textEl('p', el.title)
    const taskDel = helpr.createTag('button', 'task-del')
    taskDel.innerHTML = 'Delete Task'
    helpr.addChildren(taskDiv, [taskCheckbox, taskTitle, taskDel])
    taskItem.appendChild(taskDiv)
    taskList.appendChild(taskItem)
  })


}

const showProjects = () => {
  document.querySelector('.project-list').innerHTML = ''
  projects.forEach(displayProject)
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

    showProjects()
  }
})



document.querySelector('main').addEventListener('click', function (e) {

  // TODO : renderTasks function

  const matchTarget = (event, target) => {
    return (event.target && event.target.matches(target))
  }


  // Checkbox completed 
  if (matchTarget(e, '.task-checkbox')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const projIndex = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('p-index')
    projects[projIndex]["tasks"][taskIndex].completed = e.target.checked
    console.log(taskIndex)
  }
  // delete project button
  if (matchTarget(e, 'button.del-project')) {
    const delIndex = e.target.parentNode.getAttribute('p-index')
    projects.splice(delIndex, 1)

    showProjects()
  }

  // edit project button
  if (matchTarget(e, 'button.edit-project')) {
    const editInput = e.target.parentNode.querySelector('.edit-input')
    const projectIndex = e.target.parentNode.getAttribute('p-index')
    editInput.classList.toggle('hide')

    if (!editInput.classList.contains('hide')) {
      document.querySelector('.project-list').addEventListener('keyup', function (k) {
        k.preventDefault();
        if (k.key === 'Enter' && editInput.value.length > 0) {
          projects[projectIndex].title = editInput.value

          showProjects()
        }
      })
    }
  }

  // submit task button

  if (matchTarget(e, 'input.task-submit')) {
    e.preventDefault()
    const tasks = e.target.parentNode.parentNode.firstChild
    const taskInput = e.target.parentNode.firstChild.value
    const taskList = e.target.parentNode.parentNode.firstChild // selects .task-list
    const projIndex = e.target.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndex]

    if (taskInput.length != '') {
      const task = newTask(taskInput)
      project.tasks.push(task)

      showProjects()
    }
  }

  // delete task button

  if (matchTarget(e, 'button.task-del')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const taskList = e.target.parentNode.parentNode.firstChild
    const taskItem = e.target.parentNode.parentNode
    const projIndex = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndex]
    project.tasks.splice(taskIndex, 1)
    taskItem.remove()
  }

  // edit task
  const taskModal = document.querySelector('.edit-task')

  // show/hide task modal

  if (matchTarget(e, '.task-div p')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const projIndex = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('p-index')
    const project = projects[projIndex]
    const task = project.tasks[taskIndex]
    const taskTitle = document.querySelector('.task-title h3')

    taskModal.classList.toggle('hide')


    taskModal.setAttribute('pt-indices', `${projIndex}, ${taskIndex}`)

    taskTitle.innerHTML = `Task: ${task.title}`


    if (taskModal.classList.contains('hide')) {
      taskModal.removeAttribute('pt-indices')
    }

  }

  // locates task object in projects array and sets value

  const setTaskValue = (taskKey, taskValue) => {
    const taskIndicies = taskModal.getAttribute('pt-indices').split(',').map(Number)
    let [projIndex, taskIndex] = [...taskIndicies]
    projects[projIndex]["tasks"][taskIndex][taskKey] = taskValue
  }




  let taskInput = document.querySelector('.task-title input')

  if (matchTarget(e, '.task-title .title')) {
    taskInput.classList.remove('hide')
  }

  // set task title

  if (!taskInput.classList.contains('hide')) {
    document.querySelector('main').addEventListener('keyup', function (k) {
      k.preventDefault();
      newTaskTitle = taskInput.value
      if (k.key === 'Enter' && taskInput.value.length > 0) {
        setTaskValue("title", newTaskTitle)

        taskInput.classList.add('hide')

        let taskTitle = document.querySelector('.task-title .title')
        taskTitle.innerHTML = `Task: ${newTaskTitle}`


        showProjects()
      }

    })
  }

  // set task description

  const taskTextArea = document.querySelector('.task-textarea')

  if (matchTarget(e, '.task-textarea')) {
    document.querySelector('main').addEventListener('keyup', function (k) {
      k.preventDefault();
      // TODO: change from enter or key-up to button
      if (k.key === 'Enter' && taskTextArea.value.length > 0) {

        setTaskValue("description", taskTextArea)
        let taskDescription = document.querySelector('.task-description p')
        taskDescription.innerHTML = taskTextArea.value

        taskTextArea.classList.add('hide')
        showProjects()
      }
    })
  }

  // show/hide task-description input

  if (matchTarget(e, '.task-description p')) {
    taskTextArea.classList.toggle('hide')
  }

  // set task-priority

  if (matchTarget(e, '.task-priority input[name="taskPriority"]')) {
    setTaskValue("priority", e.target.value)
  }

  // close task edit

  if (matchTarget(e, '.close-edit i')) {
    taskModal.classList.toggle('hide')
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