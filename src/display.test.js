const initUI = require('./ui')
const newProject = require('./project')
const display = require('./display')

describe('should add a new project to the UI', () => {
  document.body.innerHTML = `<main class="main">
  <div class="columns is-centered">
    <div class="column is-half">
      <button class="add-project button is-primary is-small is-rounded">Add new project</button>
      <div class='new-project-form card'>
        <i class='fa fa-close close-project-edit'></i>
        <form action="#" id='addProjectForm'>
          <input type="text" placeholder="Enter project name" class='new-project-name input'>
          <input type="submit" class='create-project-btn button is-info mt-4' value='Create'>
        </form>
      </div>
      <section class="project-list">

      </section>
    </div>
  </div>

  <div class="edit-task hide">
    <span class='close-edit'><i class='fa fa-close'></i></span>
    <div class="task-title">
      <h3 class='title is-6'>Task: Complete Project</h3>
      <input type="text" placeholder='Enter new task name' class="input hide">
    </div>
    <div class="task-description">
      <h3 class='title is-6'>Description</h3>
      <p></p>
      <textarea id="taskDescription" class='task-textarea textarea is-info' cols="30" rows="5"
        placeholder="Add Description..."></textarea>
      <input type="submit" class="description-submit button is-info mt-4 is-small hide" value="Save">
    </div>
    <div class="task-priority">
      <h3 class='title is-6'>Priority</h3>
      <input type="radio" id="High" name="taskPriority" value="High">
      <label for="High">High</label><br>
      <input type="radio" id="Medium" name="taskPriority" value="Medium">
      <label for="Medium">Medium</label><br>
      <input type="radio" id="Low" name="taskPriority" value="Low">
      <label for="Low">Low</label>
    </div>
    <div class="task-date">
      <h3 class='title is-6'>Due Date ?</h3>
      <input type="date" class="date-input">
    </div>
  </div>

  <div class="confirm-delete hide">
    <p>Are you sure you want to delete this project?</p>
    <div class="btn-row">
      <button class='button delete-project-no is-danger'>Cancel</button>
      <button class='button delete-project-yes is-success'>Confirm</button>
    </div>
  </div>
</main>`

  let projects = []
  let testProject = newProject('test project')
  projects.push(testProject)
  initUI(projects)

  display.showProjects(projects)

  let pro = document.querySelector('.project').querySelector('h3')

  test('test project shows in UI', () => {
    expect(pro.innerHTML).toBe('test project')
  })
})