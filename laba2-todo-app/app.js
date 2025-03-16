// Инициализация состояния приложения
let state = {
    tasks: [],          // Все задачи
    filter: 'all'       // Текущий фильтр
};

// Чистая функция для создания новой задачи
const createTask = (text) => ({
    id: Date.now(),
    text,
    completed: false
});

// Чистая функция для фильтрации задач
const filterTasks = (tasks, filter) => {
    switch(filter) {
        case 'completed': return tasks.filter(t => t.completed);
        case 'active': return tasks.filter(t => !t.completed);
        default: return tasks;
    }
};

// Функция высшего порядка для создания обработчика событий
const handleTaskUpdate = (updateFn) => (taskId) => {
    state = {
        ...state,
        tasks: updateFn(state.tasks, taskId)
    };
    render();
};

// Иммутабельное обновление задач
const toggleTask = (tasks, taskId) => 
    tasks.map(task => 
        task.id === taskId 
            ? {...task, completed: !task.completed} 
            : task
    );

const deleteTask = (tasks, taskId) => 
    tasks.filter(task => task.id !== taskId);

// Обработчики с частичным применением
const handleToggle = handleTaskUpdate(toggleTask);
const handleDelete = handleTaskUpdate(deleteTask);

// Рендеринг задач (чистая функция)
const renderTasks = (tasks, filter) => {
    const filtered = filterTasks(tasks, filter);
    const taskList = document.getElementById('taskList');
    
    taskList.innerHTML = filtered.map(task => `
        <li class="task ${task.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="handleToggle(${task.id})"
            >
            <span>${task.text}</span>
            <button 
                class="delete-btn"
                onclick="handleDelete(${task.id})"
            >Удалить</button>
        </li>
    `).join('');
};

// Общий рендер
const render = () => {
    renderTasks(state.tasks, state.filter);
};

// Обработка добавления задачи
const addTaskFromInput = () => {
    const input = document.getElementById('taskInput');
    if (input.value.trim()) {
        state = {
            ...state,
            tasks: [...state.tasks, createTask(input.value.trim())]
        };
        input.value = '';
        render();
    }
};

// Установка фильтра
const setFilter = (filter) => {
    state = {...state, filter};
    render();
};

// Первоначальный рендер
render();