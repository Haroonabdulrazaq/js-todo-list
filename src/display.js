import helpr from './helpers';

const display = (() => {
  // uses project object to render project ui

  const displayProject = (projects, project) => {
    const projectList = document.querySelector('.project-list');
    const projDiv = helpr.classyDiv('project card');

    const idx = projects.indexOf(project);
    projDiv.setAttribute('p-index', idx);

    const projectTitle = helpr.textEl('h3', project.title);
    const projectDel = helpr.createTag('i', 'del-project fa fa-trash');

    const projectEdit = helpr.createTag('i', 'edit-project fa fa-edit');

    const editInput = helpr.createTag('input', 'edit-input input');
    editInput.classList.add('hide');
    editInput.setAttribute('placeholder', 'Enter new title here');

    const taskList = helpr.createTag('ul', 'task-list');
    const taskDiv = document.createElement('div');

    const taskForm = document.createElement('form');
    const textIn = helpr.createTag('input', 'input');
    textIn.setAttribute('placeholder', 'Enter a new task here + ENTER to save');
    textIn.setAttribute('type', 'text');


    const taskSubmit = helpr.createTag('input', 'task-submit button mt-4 is-info');
    taskSubmit.setAttribute('type', 'submit');
    taskSubmit.setAttribute('value', 'Add Task');

    helpr.addChildren(taskForm, [textIn, taskSubmit]);
    helpr.addChildren(taskDiv, [taskList, taskForm]);
    helpr.addChildren(projDiv, [projectTitle, editInput, projectEdit, projectDel, taskDiv]);
    projectList.appendChild(projDiv);


    project.tasks.forEach((el) => {
      const taskItem = helpr.createTag('li', 'task-item');
      const taskDiv = helpr.classyDiv('task-div');

      const taskCheckbox = helpr.createTag('input', 'task-checkbox');
      taskCheckbox.setAttribute('type', 'checkbox');

      const index = project.tasks.indexOf(el);

      taskDiv.setAttribute('t-index', index);
      const taskTitle = helpr.textEl('p', el.title);
      const taskEdit = helpr.createTag('i', 'fa fa-edit');
      const taskDel = helpr.createTag('i', 'fa fa-trash');
      helpr.addChildren(taskDiv, [taskCheckbox, taskTitle, taskEdit, taskDel]);
      taskItem.appendChild(taskDiv);
      taskList.appendChild(taskItem);
    });
  };

  const showProjects = (projects) => {
    document.querySelector('.project-list').innerHTML = '';
    projects.forEach(p => {
      displayProject(projects, p);
    });

    if (helpr.storageAvailable('localStorage')) {
      localStorage.setItem('projects_store', JSON.stringify(projects));
    }
  };

  return { showProjects };
})();

module.exports = display;