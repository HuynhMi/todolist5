/*
    1.render list-to-do
    1. ad new
    2. show tasks
    3. filter
    4. edit
    5. delete a tasks
    6. delete all tasks
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputElement = $('.todo__input-text');
const listElement = $('.todo__list');
const APP_STORAGE_KEY = 'MYTODOS';

const app = {
    tasksList:  JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || [],
    renderTasks: function() {
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
                return `
                    <li class="todo__item">
                        <div class="todo__item-inner">
                            <input type="checkbox" class="todo__input-checkbox" id="${index}">
                            <label for="${index}" class="toto__input-label">${task.content}</label>
                        </div>
                        <div class="todo__options">
                            <span class="material-symbols-outlined todo__edit">edit</span>
                            <span class="material-symbols-outlined todo__delete">delete</span>
                        </div>
                    </li>
                `
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
                _this.tasksList.push(task);
                _this.renderTasks();
                _this.setDataToLocal();
                this.value = '';
            }
        }
    },
    setDataToLocal: function() {
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(this.tasksList));
    },
    start: function() {
        this.renderTasks();
        this.handleEvents();
    }
}

app.start();