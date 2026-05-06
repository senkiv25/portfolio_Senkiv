"use strict";

// Елементи DOM
const taskList = document.getElementById('taskList');
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const loader = document.getElementById('loader');
const activeCount = document.getElementById('activeCount');
const searchInput = document.getElementById('searchInput');
const userInfo = document.getElementById('user-info');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

// --- 1. Ініціалізація (Promise.all) ---
async function loadInitialData() {
    showLoader();
    try {
        const [todosRes, userRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=20'),
            fetch('https://jsonplaceholder.typicode.com/users/1')
        ]);

        if (!todosRes.ok || !userRes.ok) throw new Error("Помилка при завантаженні");

        tasks = await todosRes.json();
        const user = await userRes.json();

        userInfo.textContent = `Користувач: ${user.name} (@${user.username})`;
        renderTasks();
    } catch (error) {
        showError("Не вдалося завантажити дані.");
    } finally {
        hideLoader();
    }
}

// --- 2. Рендеринг (Маніпуляція DOM) ---
function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = 
            currentFilter === 'all' || 
            (currentFilter === 'active' && !task.completed) || 
            (currentFilter === 'completed' && task.completed);
        
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');
        li.dataset.id = task.id;

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-title">${task.title}</span>
            <button class="task-delete">Видалити</button>
        `;
        taskList.appendChild(li);
    });

    updateStats();
}

// --- 3. Додавання завдання (POST) ---
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;

    showLoader();
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({ title, completed: false, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        const newTask = await response.json();
        newTask.id = Date.now(); // Для унікальності в DOM
        tasks.unshift(newTask);
        
        todoInput.value = '';
        addBtn.disabled = true;
        renderTasks();
    } catch (error) {
        showError("Не вдалося додати завдання.");
    } finally {
        hideLoader();
    }
});

// --- 4. Делегування подій (PATCH та DELETE) ---
taskList.addEventListener('click', async (e) => {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;
    const id = Number(taskItem.dataset.id);

    // Видалення
    if (target.classList.contains('task-delete')) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' });
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        } catch (error) { showError("Помилка при видаленні."); }
    }

    // Зміна статусу
    if (target.classList.contains('task-checkbox')) {
        try {
            const completed = target.checked;
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            const task = tasks.find(t => t.id === id);
            if (task) task.completed = completed;
            renderTasks();
        } catch (error) { showError("Помилка при оновленні."); }
    }
});

// --- 5. Пошук з Debounce ---
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

searchInput.addEventListener('input', debounce((e) => {
    searchQuery = e.target.value;
    renderTasks();
}, 300));

// --- 6. Фільтрація та UX ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

todoInput.addEventListener('input', () => {
    addBtn.disabled = !todoInput.value.trim();
});

// Очищення по Esc
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        todoInput.value = '';
        addBtn.disabled = true;
    }
});

function updateStats() {
    const count = tasks.filter(t => !t.completed).length;
    activeCount.textContent = count;
}

function showLoader() { loader.classList.remove('hidden'); }
function hideLoader() { loader.classList.add('hidden'); }
function showError(msg) { alert(msg); }

// Запуск
loadInitialData();