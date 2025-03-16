let state = {
    tasks: [],          // Все задачи
    filter: 'all'       // Текущий фильтр
};

const createTask = (text) => ({
    id: Date.now(),
    text,
    completed: false
});

const filterTasks = (tasks, filter) => {
    switch(filter) {
        case 'completed': return tasks.filter(t => t.completed);
        case 'active': return tasks.filter(t => !t.completed);
        default: return tasks;
    }
};

const handleTaskUpdate = (updateFn) => (taskId) => {
    state = {
        ...state,
        tasks: updateFn(state.tasks, taskId)
    };
    render();
};

const toggleTask = (tasks, taskId) => 
    tasks.map(task => 
        task.id === taskId 
            ? {...task, completed: !task.completed} 
            : task
    );

const deleteTask = (tasks, taskId) => 
    tasks.filter(task => task.id !== taskId);

const handleToggle = handleTaskUpdate(toggleTask);
const handleDelete = handleTaskUpdate(deleteTask);

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

const render = () => {
    renderTasks(state.tasks, state.filter);
};

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

const setFilter = (filter) => {
    state = {...state, filter};
    render();
};

// Первоначальный рендер
render();