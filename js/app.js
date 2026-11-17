// ==========================================
// 1. SELETORES DOM
// ==========================================
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority'); // Seletor da prioridade
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Contadores
const countTotal = document.getElementById('count-total');
const countPending = document.getElementById('count-pending');
const countCompleted = document.getElementById('count-completed');

// ==========================================
// 2. ESTADO DA APLICAÇÃO (Dados)
// ==========================================
// Tenta buscar as tarefas do localStorage. Se não houver, inicia um array vazio.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // all, pending, completed

// ==========================================
// 3. EVENTOS PRINCIPAIS
// ==========================================

// Evento de submissão do formulário (Adicionar)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página
    
    const text = taskInput.value.trim();
    const priority = taskPriority.value; // Captura a prioridade escolhida

    // Evita tarefas vazias ou sem prioridade selecionada
    if (text === '' || priority === '') {
        alert('Por favor, preencha a tarefa e escolha uma prioridade!');
        return; 
    }

    addTask(text, priority); // Passa o texto e a prioridade
    taskInput.value = ''; // Limpa o input
    taskPriority.value = ''; // Reseta o select para "Prioridade?"
    taskInput.focus();
});

// Eventos de Filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões e adiciona no clicado
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Atualiza o filtro atual e renderiza novamente
        currentFilter = this.dataset.filter;
        renderTasks();
    });
});

// ==========================================
// 4. FUNÇÕES DE CRUD E LÓGICA
// ==========================================

// Função para adicionar uma nova tarefa
function addTask(text, priority) {
    const newTask = {
        id: Date.now(), // Gera um ID único baseado na data
        text: text,
        priority: priority, // Salva a prioridade no objeto
        completed: false
    };
    
    tasks.push(newTask);
    saveData();
    renderTasks();
}

// Função para excluir uma tarefa
function deleteTask(id) {
    // Filtra o array, mantendo apenas as tarefas com ID diferente do clicado
    tasks = tasks.filter(task => task.id !== id);
    saveData();
    renderTasks();
}

// Função para marcar/desmarcar como concluída
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed }; // Inverte o status
        }
        return task;
    });
    saveData();
    renderTasks();
}

// Função para editar o texto de uma tarefa
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Usamos um prompt simples para focar na lógica Vanilla JS sem complicar o DOM
    const newText = prompt("Edite sua tarefa:", task.text);
    
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveData();
        renderTasks();
    }
}

// Salva o array de tarefas no LocalStorage do navegador
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Atualiza os painéis de contagem
function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    countTotal.textContent = total;
    countCompleted.textContent = completed;
    countPending.textContent = pending;
}

// ==========================================
// 5. RENDERIZAÇÃO NA TELA
// ==========================================

// Monta as tarefas na tela baseando-se no array e no filtro atual
function renderTasks() {
    // Limpa a lista atual no HTML
    taskList.innerHTML = '';

    // Aplica o filtro selecionado
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // Cria os elementos HTML para cada tarefa filtrada
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Define qual classe de cor usar baseada na palavra da prioridade
        let badgeClass = '';
        if (task.priority === 'Urgente') badgeClass = 'urgente';
        else if (task.priority === 'Média') badgeClass = 'media';
        else if (task.priority === 'Leve') badgeClass = 'leve';

        // Usamos innerHTML para estruturar o card da tarefa e os botões
        li.innerHTML = `
            <div class="task-content">
                <span>${task.text}</span>
                <!-- A prioridade entra aqui em forma de etiqueta (badge) -->
                ${task.priority ? `<span class="badge ${badgeClass}">${task.priority}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn-icon btn-toggle" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Desfazer' : '✔ Concluir'}
                </button>
                <button class="btn-icon btn-edit" onclick="editTask(${task.id})">Editar</button>
                <button class="btn-icon btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });

    updateCounters();
}

// Inicia a aplicação renderizando as tarefas salvas
renderTasks();