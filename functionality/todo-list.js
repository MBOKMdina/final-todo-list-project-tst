let userInUse = JSON.parse(localStorage.getItem('userInUse'))
let list = JSON.parse(localStorage.getItem('list')) || [];
let intervalId;
let alertSound = new Audio('audio/02. Src1 Se Morpheus Noti.mp3');
let firstTimeArray = [];
let automateLists = JSON.parse(localStorage.getItem('automateLists')) || [];

/*let list =[
    {
        date: '2024-06-20', 
        todoList:[
            {
                name:'breakfast',
                time:'19:46',
                complete: false
            },
            {
                name:'walk dog', 
                time:'17:36',
                complete: true
            }]
    },
    {
        date: '2024-06-26',
        todoList:[
            {
                name:'Go out with friends',
                time:'19:47',
                complete: false
            }]
    }];*/

let audio = new Audio('audio/14. Src20 Se Log Login.mp3');
audio.play();

document.querySelector('.js-greeting').innerHTML = 
`
    Good day, ${userInUse}
`;


document.querySelector('.js-addToDoList').addEventListener('click', ()=>
{
    document.querySelector('.js-add-procedure').innerHTML = `
        <div class="background2"></div>
        <div class="ui-new-todo">
        <div class="close-contain">
            <div class="close js-close">
                <img class="x" src="images/x.svg">
            </div>
        </div>
        <div class="contents">
            <input type="date" class="js-input" placeholder="new todo list date">
            <button class="js-enter">Enter</button>
        </div>
        </div>
    `;
    document.querySelector('.js-close').addEventListener('click', ()=>
    {
        document.querySelector('.js-add-procedure').innerHTML = ``
    });

    document.querySelector('.js-enter').addEventListener('click', ()=>
    {
        let dateTodo = document.querySelector('.js-input');
        document.querySelector('.js-add-procedure').innerHTML = ``;
        addList(dateTodo.value);
        saveToStorage();
        saveToStorageAuto();
    });

    document.addEventListener('keydown', (event)=>
    {
        if(event.key === 'Enter')
        {
            let dateTodo = document.querySelector('.js-input');
            document.querySelector('.js-add-procedure').innerHTML = ``;
            addList(dateTodo.value);
            saveToStorage();
            saveToStorageAuto();
        }
    });
    checkBox();
    description();
    time();
});
    
renderList();

function renderTodoList(indexMain, todoList, list)
{
    let automated = findMatchingItem(list);
    let todoListHTML = '';
    let count = -1;
    todoList.forEach((todoObject, index) =>
    {
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        count++;
        let rowId = `${indexMain}${count}`;
        const { name, time, complete} = todoObject;
        let checked = '';
        if(complete)
        {
            checked = '<img class="check" src="images/check-mark.png">';
        }
        else
        {
            
        }
        const html = `
        <div class="description js-description" data-description-id="${rowId}">
            ${name}
            <div class="alert js-alert" data-alert-id="${rowId}">
                
            </div>
        </div>
        <div class="js-time time" data-time-id="${rowId}">${time}</div>
        <button class="delete-todo-button js-delete-todo-button${indexMain}">Delete</button>
        <div class="checkBox js-checkBox" data-check-id="${rowId}">${checked}</div>
        `; 
        todoListHTML += html;

    });
    document.querySelector(`.js-todo-list${indexMain}`).innerHTML = todoListHTML;
    document.querySelectorAll(`.js-delete-todo-button${indexMain}`).forEach((deleteButton, index)=>
    {
        deleteButton.addEventListener('click', ()=>
        {
            todoList.splice(index, 1);

            if(!automated)
            {
                /*console.log('Item not found');*/
            }
            else
            {
                automated.todoList = todoList;
            }
            /*console.log(automateLists);*/
            renderTodoList(indexMain, todoList);
            saveToStorage();
        });
    });
};

/*document.querySelector('.js-add-todo-button').addEventListener('click', ()=>
{
    addTodo();
});*/

function addTodo(index, todoList)
{
    const inputElement = document.querySelector(`.js-name-input${index}`);
    const name = inputElement.value;

    const timeInputElement = document.querySelector(`.js-due-time-input${index}`);
    const time = timeInputElement.value;

    todoList.push(
    {
        //name: name, 
        //dueDate: dueDate
        name,
        time,
        complete: false
    });
    /*renderTodoList(index, todoList);*/
}

function  renderList()
{
    let listHTML = '';
    let date = '';
    let todoList = [];
    let objectList = [];
    let count = 0;
    list.forEach((listObject, index)=>
    {
        date = listObject.date;
        todoList = listObject.todoList;
        let html = `
        <div class="todo-block">
            <p class="todo-heading">${date}</p>
            <div class="todo-input-grid">
                <input placeholder="Task" class="js-name-input${index} name-input">
                <input type="time" class="js-due-time-input${index} due-time-input">
                <button class="add-todo-button js-add-todo-button">Add</button>
                <div class="subtractList js-subtract-list"><img class="add" src="images/subtraction.png"></div>
            </div>
            <div class="js-todo-list${index} todo-grid"></div>
        </div>`;
        document.querySelector('.js-block').innerHTML = html;
        renderTodoList(index, todoList, listObject);
        listHTML += document.querySelector('.js-block').innerHTML;
    });
    document.querySelector('.js-block').innerHTML = listHTML;
    document.querySelectorAll('.js-add-todo-button').forEach((addbtn, indexMain)=>
    {
        let automated = findMatchingItem(list[indexMain]);
        addbtn.addEventListener('click', ()=>
        {
            addTodo(indexMain, list[indexMain].todoList);
            /*findMatchingItem(list[indexMain]);*/
            if (!automated)
            {
                /*console.log('Item not found');*/
            }
            else
            {
                automated.todoList = list[indexMain].todoList; 
                /*console.log(automateLists);*/
            }
            renderList();
            saveToStorage();
            saveToStorageAuto();
        });
        document.querySelectorAll(`.js-delete-todo-button${indexMain}`).forEach((deleteButton, index)=>
        {
            deleteButton.addEventListener('click', ()=>
            {
                list[indexMain].todoList.splice(index, 1);
                automated.todoList.splice(index, 1);
                if(!automated)
                {
                    /*console.log('Item not found');*/
                }
                else
                {
                    automated.todoList = list[indexMain].todoList;
                }
                /*console.log(automateLists);*/
                renderList();
                saveToStorage();
            });
        });
    });
    document.querySelectorAll('.js-subtract-list').forEach((subtractbtn, index)=>
    {
        subtractbtn.addEventListener('click',()=>
        {
            list.splice(index, 1);
            renderList();
            saveToStorage();
        });
    });
    /*document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index)=>
    {
        deleteButton.addEventListener('click', ()=>
        {
            todoList.splice(index, 1);
            renderTodoList(index, todoList);
        });
    });*/
    checkBox();
    description();
    time();
};

function addList(todoDate)
{
    list.push(
    {
        date: todoDate,
        todoList: []
    });
    if(automateLists.length < 4)
    {
        automateLists.push(
        {
            date: todoDate,
            todoList: []
        });
    }
    else
    {
        automateLists.splice(0, 1);
        automateLists.push(
        {
            date: todoDate,
            todoList: []
        });
    }
    renderList();
}

function saveToStorage()
{
    localStorage.setItem('list', JSON.stringify(list));
    /*console.log('Saved to local storage');*/
}

function saveToStorageAuto()
{
    localStorage.setItem('automateLists', JSON.stringify(automateLists));
}

function checkBox()
{
    document.querySelectorAll('.js-checkBox').forEach((checkBox)=>
    {
        let specified = checkBox.dataset.checkId;
        let listIndex = specified.substring(0, 1);
        let checkBoxIndex = specified.substring(specified.length - 1);
        checkBox.addEventListener('click',()=>
        {
            if(checkBox.innerHTML === '')
            {
                list[listIndex].todoList[checkBoxIndex].complete = true;
                automateLists[listIndex].todoList[checkBoxIndex].complete = true
                checkBox.innerHTML =`
                <img class="check" src="images/check-mark.png">
                `;
            }
            else
            {
                list[listIndex].todoList[checkBoxIndex].complete = false;
                automateLists[listIndex].todoList[checkBoxIndex].complete = false;
                checkBox.innerHTML = '';
            }
            saveToStorage();
            saveToStorageAuto();
        });
    });
}

function description()
{
    document.querySelectorAll('.js-description').forEach((description)=>
    {
        description.addEventListener('click',()=>
        {
            let enhanced = description.innerText;
            document.querySelector('.js-enhanced-description').innerHTML = `
                <div class="background2 js-background2"></div>
                <div class="enhanced-description-ui js-enhanced-ui">
                    <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
                    <div class="js-description-text">${enhanced}</div>
                </div>
            `;
            editDescription(enhanced, description);
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-description').innerHTML = ``;
            });
        });
    });
}

function time()
{
    document.querySelectorAll('.js-time').forEach((time)=>
    {
        time.addEventListener('click',()=>
        {
            let enhanced = time.innerHTML;
            document.querySelector('.js-enhanced-time').innerHTML = `
                <div class="background2 js-background2"></div>
                <div class="enhanced-time-ui js-enhanced-ui">
                    <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
                    <div class="js-time-text">${enhanced}</div>
                </div>
            `;
            editTime(enhanced, time);
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-time').innerHTML = ``;
            });
        });
    });
}

document.querySelector('.js-log-out').addEventListener('click',()=>
{
    localStorage.removeItem('userInUse');
    window.open('login-signUp.html');
    window.close('mainPage.html');
});

function enhancedEventListener()
{
    document.querySelector('.js-enhanced-ui').addEventListener('click',()=>
    {
        document.querySelector('.js-edit-control').innerHTML =
        `
        <div class="edit-description-conatainer js-edit-container">
            <div class="edit-contents">
                <input class="edit-description js-edit-description">
                <button class="edit-enter">Enter</button>
            </div>
        </div>
        `;
        let edit = document.querySelector('.js-edit-description');
        edit.value = enhanced;
    });
}

function editDescription(description, element)
{
    document.querySelector('.js-description-text').addEventListener('click',()=>
    {
        document.querySelector('.js-enhanced-ui').innerHTML =
        `
        <div class="background2 js-background2"></div>
        <div class="enhanced-description-ui js-enhanced-ui">
            <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
            <div class="js-description-text">${description}</div>
            <div class="edit-description-conatainer js-edit-container">
                <div class="edit-contents">
                    <input class="edit-description js-edit-description">
                    <button class="edit-enter js-edit-enter">Enter</button>
                </div>
            </div>
        </div>
        `;
        let edit = document.querySelector('.js-edit-description');
        edit.value = description;
        document.querySelector('.js-edit-enter').addEventListener('click', ()=>
        {
            let newDescriptionInput = document.querySelector('.js-edit-description');
            let newDescription = newDescriptionInput.value;
            document.querySelector('.js-enhanced-description').innerHTML = 
            `
            <div class="background2 js-background2"></div>
            <div class="enhanced-description-ui js-enhanced-ui">
                <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
                <div class="js-description-text">${newDescription}</div>
            </div>
            `;
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-description').innerHTML = ``;
            });
            element.innerHTML = newDescription;
            let specified = element.dataset.descriptionId;
            let listIndex = specified.substring(0, 1);
            let descriptionIndex = specified.substring(specified.length - 1);
            list[listIndex].todoList[descriptionIndex].name = newDescription;
            saveToStorage();
            editDescription(newDescription);
        })

    })
}

function editTime(time, element)
{
    document.querySelector('.js-time-text').addEventListener('click',()=>
    {
        document.querySelector('.js-enhanced-ui').innerHTML =
        `
        <div class="background2 js-background2"></div>
        <div class="enhanced-time-ui js-enhanced-ui">
            <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
            <div class="js-time-text">${time}</div>
            <div class="edit-time-container js-edit-container">
                <div class="edit-contents">
                    <input type="time" class="edit-time js-edit-time">
                    <button class="edit-enter js-edit-enter">Enter</button>
                </div>
            </div>
        </div>
        `;
        
        let edit = document.querySelector('.js-edit-time');
        edit.value = time;
        document.querySelector('.js-edit-enter').addEventListener('click', ()=>
        {
            let newTimeInput = document.querySelector('.js-edit-time');
            let newTime = newTimeInput.value;
            document.querySelector('.js-enhanced-time').innerHTML = 
            `
            <div class="background2 js-background2"></div>
            <div class="enhanced-time-ui js-enhanced-ui">
                <div class="x2 js-x2"><img class="x2-img" src="images/x.svg"></div>
                <div class="js-time-text">${newTime}</div>
            </div>
            `;
            document.querySelector('.js-x2').addEventListener('click', ()=>
            {
                document.querySelector('.js-enhanced-time').innerHTML = ``;
            });
            element.innerHTML = newTime;
            let specified = element.dataset.timeId;
            let listIndex = specified.substring(0, 1);
            let timeIndex = specified.substring(specified.length - 1);
            list[listIndex].todoList[timeIndex].time = newTime;
            automateLists[listIndex].todoList[timeIndex].time = newTime;
            saveToStorage();
            saveToStorageAuto();
            editTime(newTime);
        })

    })
}

setInterval(()=>
{
    list.forEach((object)=>
    {
        let day = dayjs().format('YYYY-MM-DD');
        /*console.log(object.date)*/
        if(day === object.date)
        {

            object.todoList.forEach((event)=>
            {
                let firstTime = true;
                let alertId = 0;
                const dateOfEvent = new Date(`${object.date}T${event.time}`);
                const currentDate = new Date();
                let eventTime = dateOfEvent.getTime();
                let currentTime = currentDate.getTime();
                let timeBeforeEvent = eventTime - currentTime;
                firstTimeArray.forEach((circumstance)=>
                {
                    if(event === circumstance)
                    {
                        firstTime = false;
                    }
                });
                if(timeBeforeEvent <= 600010 && timeBeforeEvent >= 599990 && firstTime)
                {
                    document.querySelectorAll('.js-time').forEach((element)=>
                    {
                        if(element.innerHTML === event.time)
                        {
                            alertId = element.dataset.timeId;
                        }
                    });
                    document.querySelectorAll('.js-alert').forEach((element)=>
                    {
                        if(element.dataset.alertId === alertId)
                        {
                            element.innerHTML = 
                            `
                            <div class="pointer"></div>
                            <div class="alertDiv">
                                <div class="alertDiv-contents">
                                    <img class="bell js-bell" src="images/notification-bell.png">
                                    <div class="alertMessage">Event will start in just about 10 minutes ${userInUse}!</div>
                                </div>
                            </div>
                            `;
                            bellRing();
                            setTimeout(()=>
                            {
                                alertSound.pause();
                                clearInterval(intervalId);
                                element.innerHTML = ``;
                            }, 10000);
                        }
                    });
                    firstTimeArray.push(event);
                }
            });
        }
    });
},1);

function bellRing()
{
    alertSound.play();
    let bell = document.querySelector('.js-bell');
    bell.classList.add('bellRing');
    setTimeout(()=>
    {
        bell.classList.remove('bellRing');
    }, 1000);
    intervalId = setInterval(()=>
    {
        alertSound.play();
        let bell = document.querySelector('.js-bell');
        bell.classList.add('bellRing');
        setTimeout(()=>
        {
            bell.classList.remove('bellRing');
        }, 1000);
    }, 2000);
}

document.querySelector('.js-automate-list').addEventListener('click',()=>
{
    let html = '';
    automateLists.forEach((listItem, index)=>
    {
        html = html + `
        <div class="list-date js-list-date" data-automate-id="${index}">${listItem.date}</div>`;
    });

    if(html === '')
    {
        document.querySelector('.js-list-history').innerHTML = 
        `
            <div class="background2"></div>
            <div class="select-list-UI">
                <div class="list-history-heading">
                    Select previosuly created lists
                    <div class="x-div js-x-div"><img class="x2-img" src="images/x.svg"></div>
                </div>
                <div class="list-history-content">
                    <div class="no-list-history">you currently have no list history.</div>
                </div>
            </div> 
        `;

    }
    else
    {
        document.querySelector('.js-list-history').innerHTML = 
        `
            <div class="background2"></div>
            <div class="select-list-UI">
                <div class="list-history-heading">
                    Select previosuly created lists
                    <div class="x-div js-x-div"><img class="x2-img" src="images/x.svg"></div>
                </div>
                <div class="list-history-content">
                    ${html}
                </div>
            </div> 
        `;
    }

    document.querySelector('.js-x-div').addEventListener('click',()=>
    {
        document.querySelector('.js-list-history').innerHTML = ``;
    });

    document.querySelectorAll('.js-list-date').forEach((listDateDiv)=>
    {
        listDateDiv.addEventListener('click', ()=>
        {
            let listIndex = listDateDiv.dataset.automateId;
            let day = dayjs().format('YYYY-MM-DD');
            automateLists[listIndex].date = day;
            list.push(automateLists[listIndex]);
            renderList();
        })
    })
});

function findMatchingItem(list)
{
    let matchingList;
    automateLists.forEach((automicList)=>
    {
        if(list.date === automicList.date)
        {
            matchingList = automicList;
            /*console.log('The item was found');*/
        }
    });
    return matchingList;
}

