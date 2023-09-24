import './style.css';
import { toggleAddProjectButton, createProjectInputFields, clearProjectList, createProjectList } from './sidebar';
import { createProject, getProjects, clearStorage } from '../classes';
import { removeTaskBtn, clearMainPage, clearTaskList, createDetailsMain, createTaskList, removeTaskInputFields } from '../main';

//sidebar buttons - all tasks, today, this week
  //build main page and display these tasks
    //need to filter the tasks to show correct ones
  
//same for project specific buttons

const addProjectButton = document.getElementById('add-project');
const addTaskButton = document.getElementById('add-task');
const allTasks = document.getElementById('inbox');
const today = document.getElementById('today');
const week = document.getElementById('week');
const closeNoteModal = document.getElementById('closeNote');

allTasks.addEventListener('click', (e) => {
  //clear main
  clearMainPage();
  clearTaskList();
  removeTaskInputFields();
  removeTaskBtn();
  //change main to all task page
  createDetailsMain(e.target.name, e.target.value);
  //filter all tasks
  createTaskList(e.target.value);
})

today.addEventListener('click', (e)=>{
  //clear main
  clearMainPage();
  clearTaskList();
  removeTaskInputFields();
  removeTaskBtn();
  //change main to all task page
  createDetailsMain(e.target.name, e.target.value);
  //filter all tasks
  createTaskList(e.target.value);
})

week.addEventListener('click', (e)=>{
  //clear main
  clearMainPage();
  clearTaskList();
  removeTaskInputFields();
  removeTaskBtn();
  //change main to all task page
  createDetailsMain(e.target.name, e.target.value);
  //filter all tasks
  createTaskList(e.target.value);
})

addProjectButton.addEventListener('click', () => {
  toggleAddProjectButton();
  createProjectInputFields();
})

closeNoteModal.addEventListener('click', ()=>{
  const noteModal = document.getElementById('noteModal');
  const noteDetail = document.getElementById('noteDetails');
  noteDetail.innerHTML = "";
  noteModal.close();
})

document.addEventListener('DOMContentLoaded', () => {
  let allProjects = getProjects();
  clearProjectList();

  //for loop for objects
  //call create project list
  allProjects.forEach(project => {
    createProjectList(project);
});

  //clear main
  clearMainPage();
  clearTaskList();
  removeTaskInputFields();
  removeTaskBtn();
  //change main to all task page
  createDetailsMain('All Tasks', 'All Tasks');
  //filter all tasks
  createTaskList('All Tasks')
})