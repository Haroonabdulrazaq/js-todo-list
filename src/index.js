import newTask from './task'
import newProject from './project'
import initUI from './ui'
import display from './display'

// project array with check for local storage

//const projects = localStorage.getItem('projects_store') ? JSON.parse(localStorage.getItem('projects_store')) : []

const projects = []

initUI(projects)





// ISSUES TO FIX:

// project/task edit icons only showing on first item - resolved

// task-modal does update when working with multiple tasks - resolved

// confirmation when deleting project with custom modal 

// visual display of priority, due-date or task properties 

// does task completion do anything - does task object react to checkbox interaction

// webpack - complete

// linters


// development data

const demoProj = newProject('Project 1')
projects.push(demoProj)

const demotask = newTask('task 1')
demotask.priority = 'Medium'
demoProj.tasks.push(demotask)

const demotask2 = newTask('task 2')
demoProj.tasks.push(demotask2)


display.showProjects(projects)

//Strike through
// Confirmation before destroying