const taskList = document.querySelector('.tarefa-lista');
const menuBtn = document.querySelector('.menu-btn');
const menuOptions = document.querySelector('.menu-options');
const newTaskBtn = document.querySelector('.new-task-btn');
const saveTasksOption = document.getElementById('save-tasks');
const loadTasksOption = document.getElementById('load-tasks');
const deleteAllOption = document.getElementById('delete-all');
const changeThemeOption = document.getElementById('change-theme');
const languageSelect = document.getElementById('language-select');

const modal = document.getElementById('taskModal');
const closeModal = document.querySelector('.close');
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');

let menuVisible = false;

// Função para mostrar o menu com fade-in
function showMenu() {
  menuOptions.classList.add('show');
  menuOptions.classList.remove('hide');
  menuVisible = true;
}

// Função para ocultar o menu com fade-out
function hideMenu() {
  menuOptions.classList.add('hide');
  setTimeout(() => {
    menuOptions.classList.remove('show');
  }, 300);
  menuVisible = false;
}

// Alternar o menu quando o botão é clicado
menuBtn.addEventListener('click', function() {
  if (!menuVisible) {
    showMenu();
  } else {
    hideMenu();
  }
});

// Abrir o modal ao clicar no botão de nova tarefa
newTaskBtn.addEventListener('click', function() {
  modal.style.display = 'block';
  taskInput.focus(); // Focar automaticamente na caixa de texto
});

// Fechar o modal ao clicar no "X"
closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Adicionar nova tarefa e fechar o modal
addTaskButton.addEventListener('click', addTask);

// Permitir a adição da tarefa ao pressionar "Enter"
taskInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Função para adicionar a tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
      <input type="checkbox">
      <label>${taskText}</label>
      <button class="delete-btn">🗑</button>
    `;
    taskList.appendChild(newTask);
    taskInput.value = ''; // Limpa o campo de entrada
    modal.style.display = 'none'; // Fecha o modal
  }
}

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Deletar tarefas individualmente
taskList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    e.target.nextElementSibling.classList.toggle('completed');
  }
});

// Função para salvar a lista de tarefas
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.tarefa-lista li').forEach((task) => {
    const taskText = task.querySelector('label').innerText;
    const completed = task.querySelector('input').checked;
    tasks.push({ text: taskText, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  alert('Tarefas salvas com sucesso!');
  hideMenu(); // Ocultar o menu após salvar as tarefas
}

// Função para carregar a lista de tarefas salvas
function loadTasks() {
  taskList.innerHTML = ''; // Limpa a lista antes de carregar
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks && savedTasks.length > 0) {
    savedTasks.forEach((task) => {
      const newTask = document.createElement('li');
      newTask.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <label>${task.text}</label>
        <button class="delete-btn">🗑</button>
      `;
      taskList.appendChild(newTask);
    });
    alert('Tarefas carregadas com sucesso!');
  } else {
    alert('Nenhuma tarefa salva encontrada.');
  }
  hideMenu(); // Ocultar o menu após carregar as tarefas
}

// Função para excluir todas as tarefas
function deleteAllTasks() {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
  alert('Todas as tarefas foram excluídas!');
  hideMenu(); // Ocultar o menu após excluir todas as tarefas
}

// Função para mudar o idioma com base na seleção
languageSelect.addEventListener('change', function() {
  const selectedLang = languageSelect.value;

  switch (selectedLang) {
    case 'pt-br':
      document.querySelector('h1').innerText = 'Lista de Tarefas';
      newTaskBtn.innerText = '+ Adicionar';
      loadTasksOption.innerText = 'Carregar Tarefas Salvas';
      saveTasksOption.innerText = 'Salvar Tarefas';
      deleteAllOption.innerText = 'Excluir Todas as Tarefas';
      changeThemeOption.innerText = 'Mudar Tema';
      break;
    case 'en':
      document.querySelector('h1').innerText = 'Task List';
      newTaskBtn.innerText = '+ Add Task';
      loadTasksOption.innerText = 'Load Saved Tasks';
      saveTasksOption.innerText = 'Save Tasks';
      deleteAllOption.innerText = 'Delete All Tasks';
      changeThemeOption.innerText = 'Change Theme';
      break;
    case 'zh':
      document.querySelector('h1').innerText = '任务列表';
      newTaskBtn.innerText = '+ 添加任务';
      loadTasksOption.innerText = '加载保存的任务';
      saveTasksOption.innerText = '保存任务';
      deleteAllOption.innerText = '删除所有任务';
      changeThemeOption.innerText = '更改主题';
      break;
    case 'hi':
      document.querySelector('h1').innerText = 'कार्य सूची';
      newTaskBtn.innerText = '+ कार्य जोड़ें';
      loadTasksOption.innerText = 'सहेजे गए कार्यों को लोड करें';
      saveTasksOption.innerText = 'कार्य सहेजें';
      deleteAllOption.innerText = 'सभी कार्यों को हटाएं';
      changeThemeOption.innerText = 'थीम बदलें';
      break;
    case 'es':
      document.querySelector('h1').innerText = 'Lista de Tareas';
      newTaskBtn.innerText = '+ Añadir Tarea';
      loadTasksOption.innerText = 'Cargar Tareas Guardadas';
      saveTasksOption.innerText = 'Guardar Tareas';
      deleteAllOption.innerText = 'Eliminar Todas las Tareas';
      changeThemeOption.innerText = 'Cambiar Tema';
      break;
    case 'fr':
      document.querySelector('h1').innerText = 'Liste des Tâches';
      newTaskBtn.innerText = '+ Ajouter Tâche';
      loadTasksOption.innerText = 'Charger les Tâches Enregistrées';
      saveTasksOption.innerText = 'Enregistrer les Tâches';
      deleteAllOption.innerText = 'Supprimer Toutes les Tâches';
      changeThemeOption.innerText = 'Changer le Thème';
      break;
    case 'ar':
      document.querySelector('h1').innerText = 'قائمة المهام';
      newTaskBtn.innerText = '+ إضافة مهمة';
      loadTasksOption.innerText = 'تحميل المهام المحفوظة';
      saveTasksOption.innerText = 'حفظ المهام';
      deleteAllOption.innerText = 'حذف كل المهام';
      changeThemeOption.innerText = 'تغيير السمة';
      break;
    case 'de':
      document.querySelector('h1').innerText = 'Aufgabenliste';
      newTaskBtn.innerText = '+ Aufgabe hinzufügen';
      loadTasksOption.innerText = 'Gespeicherte Aufgaben laden';
      saveTasksOption.innerText = 'Aufgaben speichern';
      deleteAllOption.innerText = 'Alle Aufgaben löschen';
      changeThemeOption.innerText = 'Thema ändern';
      break;
    case 'it':
      document.querySelector('h1').innerText = 'Elenco Attività';
      newTaskBtn.innerText = '+ Aggiungi Attività';
      loadTasksOption.innerText = 'Carica Attività Salvate';
      saveTasksOption.innerText = 'Salva Attività';
      deleteAllOption.innerText = 'Elimina Tutte le Attività';
      changeThemeOption.innerText = 'Cambia Tema';
      break;
  }
  hideMenu(); // Ocultar o menu após mudar o idioma
});


// Eventos para os itens do menu
loadTasksOption.addEventListener('click', loadTasks);
saveTasksOption.addEventListener('click', saveTasks);
deleteAllOption.addEventListener('click', deleteAllTasks);
changeThemeOption.addEventListener('click', changeTheme);
