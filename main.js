import { createTask, deleteProject, getProjects, deleteTask, getTasks, projectTasks, dateTodayTasks, dateWeekTasks, completeTask } from "./classes";
import { clearProjectList, createProjectList } from "./src/sidebar";
  
const taskInputs = document.getElementById('task-input');
const taskBtnBx = document.getElementById('task-btn');

function createTaskBtn(){
  const addTaskButton = document.createElement('button');
  addTaskButton.setAttribute('id', 'add-task');
  addTaskButton.textContent = 'New Task';
  addTaskButton.addEventListener('click', ()=>{
    createTaskInputFields();
    removeTaskBtn();
  })
  taskBtnBx.appendChild(addTaskButton);
}

function removeTaskBtn(){
  taskBtnBx.innerHTML = '';
}

//makes the input fields
function createTaskInputFields(){
  const taskDetails = document.createElement('div');
  taskDetails.classList.add('task-details');

  const taskButtons = document.createElement('div');
  taskButtons.classList.add('task-buttons')

  //title box
  const title = createTextInput('text','Title');
  const titleLabel = createInputLabel('Title');
  taskDetails.appendChild(taskInputBox(titleLabel,title));
  
  //description box
  const description = createTextInput('text','Description');
  const descriptionLabel = createInputLabel('Description');
  taskDetails.appendChild(taskInputBox(descriptionLabel,description));

  //due date
  const dueDate = createTextInput('date','Date');
  const dateLabel = createInputLabel('Date');
  taskDetails.appendChild(taskInputBox(dateLabel,dueDate));

  //priority drop down
  const priority = createDropDownMenu('Priority');
  const priorityLabel = createInputLabel('Priority');
  taskDetails.appendChild(taskInputBox(priorityLabel,priority));

  //notes box
  const notes = createTextInput('text','Notes');
  const notesLabel = createInputLabel('Notes');
  taskDetails.appendChild(taskInputBox(notesLabel,notes));

  const createBtn = createButtons('create');
  const cancelBtn = createButtons('cancel');

  taskButtons.append(createBtn,cancelBtn);
  taskInputs.append(taskDetails,taskButtons);
}

//box that wraps around the inputs
function taskInputBox(label, input){
  const bx = document.createElement('div');
  bx.classList.add('bx');
  bx.append(label, input);

  return bx
}

//label for inputs
function createInputLabel(inputName){
  const label = document.createElement('label');
  label.setAttribute('for', `${inputName}`);
  label.textContent = inputName

  return label;
}

//creates inputs
function createTextInput(type, inputName){
  const input = document.createElement('input');
  input.setAttribute('type', `${type}`);
  input.setAttribute('name', `${inputName}`);
  input.setAttribute('id', `${inputName}`);

  //limit description and note character amounts

  return input;
}

//create priority list
function createDropDownMenu(inputName){
  const dropdown = document.createElement('select');
  dropdown.setAttribute('name', `${inputName}`);
  dropdown.setAttribute('id', `${inputName}`);

  const low = document.createElement('option');
  low.textContent = 'Low';

  const medium = document.createElement('option');
  medium.textContent = 'Medium';

  const high = document.createElement('option');
  high.textContent = 'High';

  dropdown.append(low, medium, high);
  
  return dropdown;
}

function createButtons(btnType){
  const button = document.createElement('button');
  button.classList.add('taskbtn');

  if(btnType === 'create'){
    button.classList.add('create-task');
    button.textContent = 'Create';
    button.addEventListener('click',()=>{
      //submit task
      addNewTask()
      //clear inputs
      clearTaskInputFields()
      //clear task list
      clearTaskList();
      //update task list
      const projectName = document.getElementById('project-main').getAttribute('data');
      //createTaskList(projectName);
      createTaskList(projectName);
    });
  }
  else{
    button.classList.add('cancel-task');
    button.textContent = 'Cancel';
    button.addEventListener('click',()=>{
      removeTaskInputFields();
      createTaskBtn();
    });
  }

  return button;
}

function removeTaskInputFields(){
  taskInputs.innerHTML = "";
}

function clearTaskList(){
  let taskList = document.getElementById('task-list');
  taskList.innerHTML = "";
}

function addNewTask(){
  //gets task input info
  const project = document.getElementById('project-main');
  const projectName = project.textContent;
  const projectID = project.getAttribute('data');
  const taskTitle = document.getElementById('Title').value;
  const taskDescription = document.getElementById('Description').value;
  const taskDate = document.getElementById('Date').value;
  const taskPriority = document.getElementById('Priority').value;
  const taskNotes = document.getElementById('Notes').value;
  const taskComplete = false;

  if(taskTitle === "" || taskDescription === "") return

  createTask(projectName, projectID, taskTitle, taskDescription, taskDate, taskPriority, taskNotes, taskComplete);
}

function clearTaskInputFields(){
  removeTaskInputFields();
  createTaskInputFields();
}

//create task builder functions
function createTaskList(taskFilter){
  const taskListElement = document.getElementById('task-list');
  let listOfTasks = []
  
  //get tasks
  if(taskFilter === 'All Tasks'){
    //get all tasks
    listOfTasks = getTasks();
  }
  else if(taskFilter === 'Today'){
    listOfTasks = dateTodayTasks();
  }
  else if(taskFilter === 'This Week'){
    listOfTasks = dateWeekTasks();
  }
  else{
    listOfTasks = projectTasks(taskFilter);
  }
  //create task object
  listOfTasks.forEach(task => {
    taskListElement.appendChild(createTaskElements(task))
  });
}

function createTaskElements(taskObj){
  const taskFilter = document.getElementById('project-main').getAttribute('data');

  //build the task block
  const taskBox = document.createElement('div');
  taskBox.setAttribute('id', `${taskObj.id}`)
  taskBox.classList.add('task-box');
  taskBox.classList.add(`${taskObj.priority}`)

  const taskCheck = document.createElement('input');
  taskCheck.setAttribute('type', 'checkbox');
  taskCheck.setAttribute('id', 'complete');
  taskCheck.setAttribute('value', `${taskObj.id}`);
  taskCheck.addEventListener('click', (e)=>{
    completeTask(e.target.value, e.target.checked);
    clearTaskList();
    createTaskList(taskFilter);
  });

  if(taskObj.completed === true){
    taskBox.classList.add('completed');
    taskCheck.checked = true;
  }

  const taskElementTitle = document.createElement('h4');
  taskElementTitle.textContent = taskObj.title;
  taskElementTitle.classList.add('task');

  const taskElementDescription = document.createElement('h4');
  taskElementDescription.textContent = taskObj.description;
  taskElementDescription.classList.add('task-long');

  const taskElementDate = document.createElement('h4');
  taskElementDate.textContent = taskObj.dueDate;
  taskElementDate.classList.add('task');

  const taskElementPriority = document.createElement('h4');
  taskElementPriority.textContent = taskObj.priority;
  taskElementPriority.classList.add('task');

  const taskNoteButton = document.createElement('button');
  taskNoteButton.innerHTML = 'Notes';
  taskNoteButton.setAttribute('id', 'notes');
  taskNoteButton.setAttribute('value', `${taskObj.id}`);
  taskNoteButton.addEventListener('click', ()=>{
    const noteModal = document.getElementById('noteModal');
    const noteDetails = document.getElementById('noteDetails');
    noteDetails.innerHTML = '';
    noteDetails.textContent = taskObj.notes;
    noteModal.show();
  })
  
  const deleteTaskButton = document.createElement('button');
  deleteTaskButton.setAttribute('id','delete-task')
  const deleteTaskIcon = document.createElement('box-icon');
  deleteTaskIcon.setAttribute('name', 'trash');
  deleteTaskIcon.setAttribute('color', '#e76f51');
  deleteTaskIcon.setAttribute('value', `${taskObj.id}`)
  deleteTaskButton.appendChild(deleteTaskIcon);
  deleteTaskButton.addEventListener('click', (e)=>{
    const project = document.getElementById('project-main').textContent;
    deleteTask(e.target.getAttribute('value'));
    clearTaskList();
    createTaskList(project);
  });

  taskBox.append(taskCheck, taskElementTitle, taskElementDescription, taskElementDate, taskElementPriority, taskNoteButton, deleteTaskButton)
  
  return taskBox
}

//create main pages
  //build details main
function createDetailsMain(pageName, projectID){
  const detailsMain = document.getElementById('details-main');

  const pageTitle = document.createElement('h2');
  pageTitle.setAttribute('id', 'project-main');
  pageTitle.setAttribute('value',`${pageName}`);
  pageTitle.setAttribute('data', `${projectID}`)
  pageTitle.textContent = pageName;
  detailsMain.appendChild(pageTitle);

  const deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.setAttribute('id', 'delete-project');
  deleteProjectBtn.setAttribute('title', 'Delete Project');
  deleteProjectBtn.setAttribute('value', `${projectID}`);

  const deleteIcon = document.createElement('box-icon');
  deleteIcon.setAttribute('name', 'trash');
  deleteIcon.setAttribute('color', '#e76f51')
  deleteIcon.setAttribute('value', `${projectID}`)
  
  deleteProjectBtn.appendChild(deleteIcon);

  deleteProjectBtn.addEventListener('click', (e)=>{
    deleteProject(e.target.getAttribute('value'))
      //clear project list
    clearProjectList()
      //load project list
    let allProjects = getProjects()
    for (let i = 0; i < allProjects.length; i++) {
      createProjectList(allProjects[i]);
    }
      //clear task list
    clearTaskList();
      //clear details main
    clearMainPage();
      //hide new task button
    removeTaskInputFields();
    removeTaskBtn();
  })

  if(pageName === "All Tasks" || pageName === "Today" || pageName === "This Week"){
    return detailsMain;
  }
  else{
    detailsMain.appendChild(deleteProjectBtn);
  }
  
  return detailsMain;
}

//main page clear function
function clearMainPage(){
  const detailsMain = document.getElementById('details-main');
  detailsMain.innerHTML = "";
}

export { createTaskInputFields, clearMainPage, 
        clearTaskList, createDetailsMain, removeTaskInputFields, 
        createTaskList, createTaskBtn,
        removeTaskBtn }