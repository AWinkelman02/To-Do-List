import { createProject, getProjects } from "../classes";
import { clearMainPage, clearTaskList, createTaskBtn, removeTaskBtn, createDetailsMain, removeTaskInputFields, resetTaskInputButton, createTaskList } from "../main";

const projectInput = document.getElementById('project-input');
const projectList = document.getElementById('project-list');
const addTaskButton = document.getElementById('add-task');
let projectButtonHidden = false;

//functions for project input fields
function toggleAddProjectButton(){
    if(projectButtonHidden === false){
        document.getElementById('add-project').style.visibility = 'hidden';
        projectButtonHidden = true;
    }
    else{
        document.getElementById('add-project').style.visibility = 'visible';
        projectButtonHidden = false;
    }
}

function createProjectInputFields(){
    const projectName = document.createElement('input');
    projectName.setAttribute('type', 'text');
    projectName.setAttribute('id', 'project-name');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-container');

    const sumbitProject = document.createElement('button');
    sumbitProject.classList.add('submit');
    sumbitProject.innerHTML = 'Create'
    sumbitProject.addEventListener('click', () =>{        
        //get input
        let project = projectName.value;
        if(project === "") return

        //create project object
        createProject(project);

        //get all project objects
        let allProjects = getProjects()

        clearProjectList();

        //for loop for objects
        //call create project list
        allProjects.forEach(project => {
            createProjectList(project);
        });

        projectName.innerHTML = '';
        removeProjectInputFields();
        toggleAddProjectButton();
    })

    const cancelInput = document.createElement('button');
    cancelInput.classList.add('cancel');
    cancelInput.innerHTML = 'Cancel';
    cancelInput.addEventListener('click', () => {
        removeProjectInputFields();
        toggleAddProjectButton();
    })

    buttonContainer.append(sumbitProject, cancelInput)
    projectInput.append(projectName, buttonContainer);
}

function removeProjectInputFields(){
    projectInput.innerHTML = "";
}

function createProjectList(projectObj){
    let id = projectObj.id;
    let projectName = projectObj.title;
    const project = document.createElement('button');
    project.setAttribute('value', id)
    project.setAttribute('id', projectName);
    project.classList.add('nav');
    project.textContent = projectName

    //eventlisteners
    project.addEventListener('click', (e)=>{
        //clear main
        clearMainPage();
        clearTaskList();
        removeTaskInputFields();
        removeTaskBtn();
        createTaskBtn();
        //change main to all task page
        createDetailsMain(e.target.id, e.target.value);
        //filter all tasks
        createTaskList(id);
    })

    const icon = document.createElement('box-icon');
    icon.setAttribute('name', 'list-ul');
    icon.setAttribute('color', '#e9c46a');

    project.prepend(icon);

    projectList.appendChild(project);
}

function clearProjectList(){
    projectList.innerHTML = "";
}

export { toggleAddProjectButton, createProjectInputFields, clearProjectList, createProjectList }