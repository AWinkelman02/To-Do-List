import moment from 'moment';
import uniqid from 'uniqid';

class Project{
    constructor(title){
        this.id = uniqid();
        this.title = title
    }
}

class Task{
    constructor(project, projectID, title, description, dueDate, priority, notes, completed){
        this.project = project,
        this.projectID = projectID
        this.id = uniqid();
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.notes = notes,
        this.completed = completed
    }
}

function createProject(name){
    let allProjects = [];
    let newProject = new Project(name);

    let get = JSON.parse(localStorage.getItem('projects'));

    if(get === null){
        allProjects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(allProjects.flat()));
    }
    else{
        allProjects = get
        allProjects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(allProjects.flat()));
    }
}

function getProjects(){
    var get = JSON.parse(localStorage.getItem('projects'));
    return get
}

function deleteProject(id){
    var getP = JSON.parse(localStorage.getItem('projects'));
    let projectIndex = getP.map(e => e.id).indexOf(id);
    getP.splice(projectIndex, 1);
    localStorage.setItem('projects', JSON.stringify(getP.flat()));
    
    var getT = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = [];
    for (let i = 0; i < getT.length; i++) {

        if(getT[i].projectID === id){
            taskIndex.push(i);
        }
    }
    let reverseTaskIndex = taskIndex.reverse();
    for (let j = 0; j < reverseTaskIndex.length; j++) {
        getT.splice(reverseTaskIndex[j],1);
    }
    localStorage.setItem('tasks', JSON.stringify(getT.flat()));
}

//task creation function
function createTask(project, title, description, dueDate, priority, notes, completed){
    let allTasks = [];
    let newTask = new Task(project, title, description, dueDate, priority, notes, completed);

    let get = JSON.parse(localStorage.getItem('tasks'));

    if(get === null){
        allTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks.flat()));
    }
    else{
        allTasks = get
        allTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks.flat()));
    }
}

//gets all tasks
function getTasks(){
    var get = JSON.parse(localStorage.getItem('tasks'));
    return get
}

//filters tasks for a specific project
function projectTasks(project){
    var get = JSON.parse(localStorage.getItem('tasks'));
    let filteredTasks = get.filter(function(task){
        return task.projectID === project;
    })
    return filteredTasks
}

function clearStorage(){
    localStorage.clear();
}

//task deletion function
function deleteTask(id){
    //get all tasks
    var get = JSON.parse(localStorage.getItem('tasks'));
    //index of task
    let taskIndex = get.map(e => e.id).indexOf(id)

    //splice task at index
    get.splice(taskIndex, 1);

    //send task list back to memory
    localStorage.setItem('tasks', JSON.stringify(get.flat()));
}

function completeTask(id, complete){
    var get = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = get.map(e => e.id).indexOf(id);
    get[taskIndex].completed = complete;
    localStorage.setItem('tasks', JSON.stringify(get.flat()));
}

function dateTodayTasks(){
    let date = moment().format('YYYY-MM-DD');
    var get = JSON.parse(localStorage.getItem('tasks'));
    let filteredTasks = get.filter(function(task){
        return task.dueDate === date;
    })
    return filteredTasks;
}

function dateWeekTasks(){
    var get = JSON.parse(localStorage.getItem('tasks'));
    let filteredTasks = [];
    let today = moment().format('d');
    let firstDate = "";
    let secondDate = "";
    console.log(today);
    switch (today){
        case '0':
            firstDate = moment().day(-1).format('YYYY-MM-DD');
            secondDate = moment().day(7).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break;
        case '1': 
            firstDate = moment().day(-2).format('YYYY-MM-DD');
            secondDate = moment().day(6).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break;   
        case '2':
            firstDate = moment().day(-3).format('YYYY-MM-DD');
            secondDate = moment().day(5).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break; 
        case '3':
            firstDate = moment().day(-4).format('YYYY-MM-DD');
            secondDate = moment().day(4).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break; 
        case '4':
            firstDate = moment().day(-5).format('YYYY-MM-DD');
            secondDate = moment().day(3).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break; 
        case '5':
            firstDate = moment().day(-6).format('YYYY-MM-DD');
            secondDate = moment().day(2).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break; 
        case '6':
            firstDate = moment().day(-7).format('YYYY-MM-DD');
            secondDate = moment().day(1).format('YYYY-MM-DD');
            console.log(firstDate, secondDate);
            break; 
    }

    get.forEach(task => {
        if(moment(task.dueDate).isBetween(firstDate,secondDate)){
            filteredTasks.push(task);
        }
    });
    return filteredTasks;
}

export { createProject, getProjects, deleteProject, 
    createTask, getTasks, projectTasks, 
    dateTodayTasks, clearStorage, deleteTask,
    completeTask, dateWeekTasks }