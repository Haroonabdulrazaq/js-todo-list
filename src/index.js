import newProject from './project';
import initUI from './ui';
import display from './display';

// project array with check for local storage
const projects = localStorage.getItem('projects_store') ? JSON.parse(localStorage.getItem('projects_store')) : [];

initUI(projects);

// seed data

const defaultProj = newProject('Default Project');

if (projects.length === 0) {
  projects.push(defaultProj);
}

display.showProjects(projects);
