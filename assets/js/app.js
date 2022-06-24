/*
    1.render list-to-do
    1. ad new
    2. show tasks
    2.  updateState: handle when clicks to list
    3. filter
    4. edit
    5. delete a tasks
    6. delete all tasks
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputElement = $('.todo__input-text');
const listElement = $('.todo__list');
let btnFilters = $$('.todo__filter');

const APP_STORAGE_KEY = 'MYTODOS';

const app = {
    tasksList:  JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || [],
    isUpdating: {state: false, id: undefined},
    renderTasks: function(type) {
        let htmls;
        if(this.tasksList.length === 0) {
            htmls = `
                        <li class="todo__item">
                            <div class="todo__item-inner">
                                <label class="toto__input-label toto__input-label--note">You have not added any tasks.</label>
                            </div>
                        </li>
                    `
        } else {
            htmls = this.tasksList.map(function(task, index) {
                if(task.state == type || type == 'all') {
                    return `
                        <li class="todo__item">
                            <div class="todo__item-inner">
                                <input type="checkbox" class="todo__input-checkbox" id="${index}" ${task.state === 'completed' ? 'checked' :''}>
                                <label for="${index}" class="toto__input-label">${task.content}</label>
                            </div>
                            <div class="todo__options">
                                <span class="material-symbols-outlined todo__edit">edit</span>
                                <span class="material-symbols-outlined todo__delete">delete</span>
                            </div>
                        </li>
                    `
                }
                
            });
            htmls = htmls.join('\n');
        }

        listElement.innerHTML = htmls;
    },
    handleEvents: function() {
        _this = this;
        inputElement.onkeyup = function(e) {
            let task;
            let content = this.value;
            if(e.key === 'Enter' && content) {
                task = {
                    content,
                    state: 'pending'
                }

                if (_this.isUpdating.state) {
                    _this.tasksList[_this.isUpdating.id] = task;
                } else {
                    _this.tasksList.push(task);
                }
                
                _this.renderTasks('all');
                _this.setDataToLocal();
                this.value = '';
            }
        }

        //update state
        listElement.onclick = function(e) {
            let element = e.target;
            if (element.classList.contains('todo__input-checkbox')) {
                _this.updateState(element.id);
            } else if (element.classList.contains('todo__edit')) {
                element = element.closest('li').querySelector('input');
                _this.editTask(element.id, _this.tasksList[element.id].content);
            } else if (element.classList.contains('todo__delete')) {
                
            }
            
        }

        // filter
        btnFilters.forEach(function(btn) {
            btn.onclick = function() {
                $('.todo__filter.active').classList.remove('active');
                this.classList.add('active');
                const type = this.dataset.type;
                _this.renderTasks(type);
            }
        })

    },
    setDataToLocal: function() {
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(this.tasksList));
    },
    editTask: function(id, content) {
        inputElement.value = content;
        this.isUpdating = {
            state: true,
            id
        }
    },
    updateState: function(id) {
        _this.tasksList[id].state  = element.checked ? 'completed' : 'pending';
        _this.setDataToLocal();

    },
    start: function() {
        this.renderTasks('all');
        this.handleEvents();
    }
}

app.start();