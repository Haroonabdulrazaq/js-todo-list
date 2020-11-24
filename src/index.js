import helpr from './helpers'
import newTask from './task'
import newProject from './project'
import display from './display'

// project array with check for local storage

const projects = localStorage.getItem('projects_store') ? JSON.parse(localStorage.getItem('projects_store')) : []













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
const closeProjectEdit = document.querySelector('.close-project-edit')

addProject.addEventListener('click', () => {
  projectForm.classList.toggle('hide')
})

closeProjectEdit.addEventListener('click', () => {
  projectForm.classList.toggle('hide')
})

const createProject = document.querySelector('.create-project-btn')
createProject.addEventListener('click', (e) => {
  const projectName = document.querySelector('.new-project-name').value
  if (projectName.length > 0) {
    let p = newProject(projectName)
    projects.push(p)

    display.showProjects(projects)
  }
})

const taskModal = document.querySelector('.edit-task')
const taskTextArea = document.querySelector('.task-textarea')

document.querySelector('main').addEventListener('click', function (e) {

  // TODO : renderTasks function

  const matchTarget = (event, target) => {
    return (event.target && event.target.matches(target))
  }

  // locates task object in projects array and sets value

  const setTaskValue = (taskKey, taskValue) => {
    const taskIndicies = taskModal.getAttribute('pt-indices').split(',').map(Number)
    let [projIndex, taskIndex] = [...taskIndicies]
    projects[projIndex]["tasks"][taskIndex][taskKey] = taskValue
  }



  if (matchTarget(e, '.description-submit') && taskTextArea.value.length > 0) {
    setTaskValue("description", taskTextArea)
    let descSubmit = document.querySelector('.description-submit')
    let taskDescription = document.querySelector('.task-description p')
    taskDescription.innerHTML = taskTextArea.value

    taskTextArea.classList.add('hide')
    descSubmit.classList.add('hide')
    display.showProjects(projects)

  }

  // Checkbox completed 
  if (matchTarget(e, '.task-checkbox')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const projIndex = helpr.nthParent(e.target, 5).getAttribute('p-index')
    const project = projects[projIndex]["tasks"][taskIndex]
    project.completed = e.target.checked
  }

  // delete project button
  if (matchTarget(e, 'i.del-project')) {
    // TODO : Add confirmation
    const delIndex = e.target.parentNode.getAttribute('p-index')
    projects.splice(delIndex, 1)

    display.showProjects(projects)
  }

  // edit project button
  if (matchTarget(e, 'i.edit-project')) {
    const editInput = e.target.parentNode.querySelector('.edit-input')
    const projectIndex = e.target.parentNode.getAttribute('p-index')
    editInput.classList.toggle('hide')

    if (!editInput.classList.contains('hide')) {
      document.querySelector('.project-list').addEventListener('keyup', function (k) {
        k.preventDefault();
        if (k.key === 'Enter' && editInput.value.length > 0) {
          projects[projectIndex].title = editInput.value

          display.showProjects(projects)
        }
      })
    }
  }


  // submit task button

  if (matchTarget(e, 'input.task-submit')) {
    e.preventDefault()
    const tasks = helpr.nthParent(e.target, 2).firstChild
    const taskInput = e.target.parentNode.firstChild.value
    const taskList = helpr.nthParent(e.target, 2).firstChild // selects .task-list
    const projIndex = helpr.nthParent(e.target, 3).getAttribute('p-index')
    const project = projects[projIndex]

    if (taskInput.length != '') {
      const task = newTask(taskInput)
      project.tasks.push(task)

      display.showProjects(projects)
    }
  }

  // delete task button

  if (matchTarget(e, '.task-item .fa-trash')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const taskList = helpr.nthParent(e.target, 2).firstChild
    const taskItem = helpr.nthParent(e.target, 2)
    const projIndex = helpr.nthParent(e.target, 5).getAttribute('p-index')
    const project = projects[projIndex]
    project.tasks.splice(taskIndex, 1)
    taskItem.remove()
  }

  // edit task


  // show/hide task modal

  if (matchTarget(e, '.task-div p') || matchTarget(e, '.task-div .fa-edit')) {
    const taskIndex = e.target.parentNode.getAttribute('t-index')
    const projIndex = helpr.nthParent(e.target, 5).getAttribute('p-index')
    const project = projects[projIndex]
    const task = project.tasks[taskIndex]
    const taskTitle = document.querySelector('.task-title h3')
    const taskDesc = document.querySelector('.task-description p')
    const taskDescInput = document.querySelector('.task-description textarea')


    taskModal.classList.toggle('hide')
    taskModal.setAttribute('pt-indices', `${projIndex}, ${taskIndex}`)


    if (task.description.length > 0) {
      let descSubmit = document.querySelector('.description-submit')
      // descSubmit.classList.add('hide')
      taskDescInput.classList.add('hide')
      taskDescInput.value = ''
      taskDesc.innerHTML = task.description

    } else {
      taskDescInput.classList.remove('hide')
      taskDescInput.value = ''
      taskDesc.innerHTML = ''
    }


    if (task.priority) {
      document.querySelector(`input#${task.priority}`).click()
    } else {
      ['High', 'Medium', 'Low'].forEach(p => {
        document.querySelector(`input#${p}`).checked = false
      })
    }

    taskTitle.innerHTML = `Task: ${task.title}`

    if (taskModal.classList.contains('hide')) {
      taskModal.removeAttribute('pt-indices')
    } else {
      let dateInput = document.querySelector('.date-input')
      dateInput.value = task.dueDate
    }

    display.showProjects(projects)
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


        display.showProjects(projects)
      }

    })
  }

  // set task description



  if (matchTarget(e, '.task-textarea')) {
    document.querySelector('main').addEventListener('keyup', function (k) {
      k.preventDefault();
      // TODO: change from enter or key-up to button
      if (k.key === 'Enter' && taskTextArea.value.length > 0) {

        setTaskValue("description", taskTextArea.value)
        let taskDescription = document.querySelector('.task-description p')
        taskDescription.innerHTML = taskTextArea.value

        display.showProjects(projects)
      }
    })
  }

  // show/hide task-description input

  if (matchTarget(e, '.task-description p')) {
    taskTextArea.classList.toggle('hide')
    let descSubmit = document.querySelector('.description-submit')
    descSubmit.classList.toggle('hide')
    taskTextArea.value = ''
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

const dueDate = document.querySelector('.date-input')

dueDate.addEventListener('change', (e) => {
  const taskIndicies = taskModal.getAttribute('pt-indices').split(',').map(Number)
  let [projIndex, taskIndex] = [...taskIndicies]
  let taskProp = projects[projIndex]["tasks"][taskIndex]
  taskProp["dueDate"] = e.target.value
})



// ISSUES TO FIX:

// project/task edit icons only showing on first item - resolved

// task-modal does update when working with multiple tasks - resolved

// confirmation when deleting project with custom modal 

// visual display of priority, due-date or task properties 

// does task completion do anything - does task object react to checkbox interaction

// webpack

// linters


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
demotask.priority = 'Medium'
demoProj.tasks.push(demotask)

const demotask2 = newTask('task 2')
demoProj.tasks.push(demotask2)


display.showProjects(projects)