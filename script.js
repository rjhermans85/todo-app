// Simple ToDo App JavaScript
// This file handles all the interactive functionality

// Wait for the DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to the HTML elements we'll be working with
    const addTaskForm = document.getElementById('addTaskForm');
    const taskInput = document.getElementById('taskInput');
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    const tasksHeader = document.getElementById('tasksHeader');
    const clearAllSection = document.getElementById('clearAllSection');
    const clearAllButton = document.getElementById('clearAllButton');
    
    // Array to store all our tasks in memory
    // Each task will be an object with: { id, text, completed }
    let tasks = [];
    
    // Initialize the app when the page loads
    init();
    
    // Main initialization function
    function init() {
        // Load any existing tasks from localStorage
        loadTasksFromStorage();
        
        // Display the tasks on the page
        renderTasks();
        
        // Set up event listeners for user interactions
        setupEventListeners();
    }
    
    // Set up all the event listeners for user interactions
    function setupEventListeners() {
        // Listen for form submission (when user adds a new task)
        addTaskForm.addEventListener('submit', handleAddTask);
        
        // Listen for clicks on the tasks list (for checkboxes and delete buttons)
        tasksList.addEventListener('click', handleTaskListClick);
        
        // Listen for clear all button clicks
        clearAllButton.addEventListener('click', handleClearAllTasks);
    }
    
    // Handle adding a new task when the form is submitted
    function handleAddTask(event) {
        // Prevent the form from submitting normally (which would reload the page)
        event.preventDefault();
        
        // Get the text from the input field and remove extra whitespace
        const taskText = taskInput.value.trim();
        
        // Only add the task if there's actually some text
        if (taskText) {
            // Create a new task object
            const newTask = {
                id: generateUniqueId(), // Create a unique ID for this task
                text: taskText,
                completed: false
            };
            
            // Add the new task to our tasks array
            tasks.push(newTask);
            
            // Clear the input field for the next task
            taskInput.value = '';
            
            // Save the updated tasks to localStorage
            saveTasksToStorage();
            
            // Update the display to show the new task
            renderTasks();
            
            // Focus back on the input field for quick successive additions
            taskInput.focus();
        }
    }
    
    // Handle clicks on the tasks list (checkboxes and delete buttons)
    function handleTaskListClick(event) {
        // Get the clicked element
        const clickedElement = event.target;
        
        // Find the parent task item element
        const taskItem = clickedElement.closest('.task-item');
        
        // If we can't find a task item, ignore the click
        if (!taskItem) return;
        
        // Get the task ID from the data attribute
        const taskId = parseInt(taskItem.dataset.taskId);
        
        // Handle different types of clicks
        if (clickedElement.classList.contains('task-checkbox')) {
            // User clicked the checkbox - toggle completion status
            toggleTaskCompletion(taskId);
        } else if (clickedElement.classList.contains('delete-button')) {
            // User clicked the delete button - remove the task
            deleteTask(taskId);
        }
    }
    
    // Toggle whether a task is completed or not
    function toggleTaskCompletion(taskId) {
        // Find the task in our array
        const task = tasks.find(t => t.id === taskId);
        
        // If we found the task, toggle its completed status
        if (task) {
            task.completed = !task.completed;
            
            // Save the updated tasks to localStorage
            saveTasksToStorage();
            
            // Update the display
            renderTasks();
        }
    }
    
    // Delete a task completely
    function deleteTask(taskId) {
        // Remove the task from our array by filtering it out
        tasks = tasks.filter(task => task.id !== taskId);
        
        // Save the updated tasks to localStorage
        saveTasksToStorage();
        
        // Update the display
        renderTasks();
    }
    
    // Clear all tasks (with confirmation)
    function handleClearAllTasks() {
        // Ask for confirmation before clearing all tasks
        const confirmed = confirm('Are you sure you want to delete all tasks? This cannot be undone.');
        
        if (confirmed) {
            // Clear the tasks array
            tasks = [];
            
            // Clear localStorage completely
            localStorage.removeItem('todoTasks');
            
            // Update the display
            renderTasks();
        }
    }
    
    // Update the display to show all current tasks
    function renderTasks() {
        // Clear the current display
        tasksList.innerHTML = '';
        
        // If there are no tasks, show the empty state message and hide the header/clear section
        if (tasks.length === 0) {
            emptyState.classList.remove('hidden');
            tasksHeader.classList.add('hidden');
            clearAllSection.classList.add('hidden');
            return;
        }
        
        // Hide the empty state message and show the header/clear section since we have tasks
        emptyState.classList.add('hidden');
        tasksHeader.classList.remove('hidden');
        clearAllSection.classList.remove('hidden');
        
        // Create HTML elements for each task
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            tasksList.appendChild(taskElement);
        });
    }
    
    // Create the HTML element for a single task
    function createTaskElement(task) {
        // Create the main list item element
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.taskId = task.id; // Store the task ID for later reference
        
        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        
        // Create the text span
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        
        // Create the delete button with trashcan icon
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '🗑️'; // Trashcan emoji icon
        deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
        deleteButton.setAttribute('title', 'Delete task'); // Tooltip on hover
        
        // Assemble all the pieces
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        
        return li;
    }
    
    // Save tasks to browser's localStorage for persistence
    function saveTasksToStorage() {
        try {
            // Convert our tasks array to JSON and save it
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        } catch (error) {
            // If saving fails (storage full, etc.), log the error
            console.error('Failed to save tasks to localStorage:', error);
        }
    }
    
    // Load tasks from browser's localStorage
    function loadTasksFromStorage() {
        try {
            // Get the saved tasks from localStorage
            const savedTasks = localStorage.getItem('todoTasks');
            
            // If we found saved tasks, parse them and use them
            if (savedTasks) {
                tasks = JSON.parse(savedTasks);
            }
        } catch (error) {
            // If loading fails (corrupted data, etc.), start with empty array
            console.error('Failed to load tasks from localStorage:', error);
            tasks = [];
        }
    }
    
    // Generate a unique ID for new tasks
    function generateUniqueId() {
        // Simple method: use current timestamp + random integer
        // This is sufficient for our single-user PoC
        return Date.now() + Math.floor(Math.random() * 1000);
    }
    
    // Optional: Add keyboard shortcuts for power users
    document.addEventListener('keydown', function(event) {
        // Press 'n' to focus on the new task input (when not already typing)
        if (event.key === 'n' && event.target.tagName !== 'INPUT') {
            event.preventDefault();
            taskInput.focus();
        }
    });
});