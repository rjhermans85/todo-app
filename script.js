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
    const completedTasksSection = document.getElementById('completedTasksSection');
    const completedTasksList = document.getElementById('completedTasksList');
    const completedEmptyState = document.getElementById('completedEmptyState');
    const clearAllSection = document.getElementById('clearAllSection');
    const clearAllButton = document.getElementById('clearAllButton');
    
    // Constants for CSS classes and other magic strings
    const CSS_CLASSES = {
        TASK_ITEM: 'task-item',
        COMPLETED_TASK_ITEM: 'completed-task-item',
        TASK_CHECKBOX: 'task-checkbox',
        TASK_TEXT: 'task-text',
        EDIT_BUTTON: 'edit-button',
        DELETE_BUTTON: 'delete-button',
        SAVE_EDIT_BUTTON: 'save-edit-button',
        CANCEL_EDIT_BUTTON: 'cancel-edit-button',
        EDIT_INPUT: 'edit-input'
    };
    
    const ICONS = {
        EDIT: '✏️',
        DELETE: '🗑️',
        SAVE: '✅',
        CANCEL: '❌'
    };
    
    const STORAGE_KEY = 'todoTasks';
    
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
        
        // Listen for clicks on both task lists (for checkboxes and delete buttons)
        tasksList.addEventListener('click', handleTaskListClick);
        completedTasksList.addEventListener('click', handleTaskListClick);
        
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
        
        // Find the parent task item element (could be active or completed)
        const taskItem = clickedElement.closest('.task-item, .completed-task-item');
        
        // If we can't find a task item, ignore the click
        if (!taskItem) return;
        
        // Get the task ID from the data attribute
        const taskId = parseInt(taskItem.dataset.taskId);
        
        // Handle different types of clicks
        if (clickedElement.classList.contains(CSS_CLASSES.TASK_CHECKBOX)) {
            // User clicked the checkbox - toggle completion status
            toggleTaskCompletion(taskId);
        } else if (clickedElement.classList.contains(CSS_CLASSES.EDIT_BUTTON)) {
            // User clicked the edit button - enter edit mode
            enterEditMode(taskItem, taskId);
        } else if (clickedElement.classList.contains(CSS_CLASSES.DELETE_BUTTON)) {
            // User clicked the delete button - remove the task
            deleteTask(taskId);
        } else if (clickedElement.classList.contains(CSS_CLASSES.SAVE_EDIT_BUTTON)) {
            // User clicked save - save the edit
            saveTaskEdit(taskItem, taskId);
        } else if (clickedElement.classList.contains(CSS_CLASSES.CANCEL_EDIT_BUTTON)) {
            // User clicked cancel - cancel the edit
            cancelTaskEdit(taskItem, taskId);
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
            localStorage.removeItem(STORAGE_KEY);
            
            // Update the display
            renderTasks();
        }
    }
    
    // Update the display to show all current tasks
    function renderTasks() {
        // Clear both task lists
        tasksList.innerHTML = '';
        completedTasksList.innerHTML = '';
        
        // Separate active and completed tasks
        const activeTasks = tasks.filter(task => !task.completed);
        const completedTasks = tasks.filter(task => task.completed);
        
        // Handle active tasks section
        if (activeTasks.length === 0) {
            emptyState.classList.remove('hidden');
            tasksHeader.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            tasksHeader.classList.remove('hidden');
            
            // Create HTML elements for each active task
            activeTasks.forEach(task => {
                const taskElement = createTaskElement(task, false);
                tasksList.appendChild(taskElement);
            });
        }
        
        // Handle completed tasks section
        if (completedTasks.length === 0) {
            completedEmptyState.classList.remove('hidden');
            completedTasksSection.classList.add('hidden');
        } else {
            completedEmptyState.classList.add('hidden');
            completedTasksSection.classList.remove('hidden');
            
            // Create HTML elements for each completed task
            completedTasks.forEach(task => {
                const taskElement = createTaskElement(task, true);
                completedTasksList.appendChild(taskElement);
            });
        }
        
        // Show clear all button if there are any tasks (active or completed)
        if (tasks.length === 0) {
            clearAllSection.classList.add('hidden');
        } else {
            clearAllSection.classList.remove('hidden');
        }
    }
    
    // Helper function to create a DOM element with attributes
    function createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'textContent' || key === 'innerHTML' || key === 'checked') {
                element[key] = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        return element;
    }
    
    // Helper function to create a button with icon and accessibility attributes
    function createButton(className, icon, ariaLabel, title) {
        return createElement('button', className, {
            innerHTML: icon,
            'aria-label': ariaLabel,
            title: title
        });
    }
    
    // Unified function to create task elements (both active and completed)
    function createTaskElement(task, isCompleted = false) {
        // Configuration based on task state
        const config = {
            containerClass: isCompleted ? CSS_CLASSES.COMPLETED_TASK_ITEM : CSS_CLASSES.TASK_ITEM,
            checkboxChecked: isCompleted,
            showEditButton: !isCompleted,
            deleteAriaPrefix: isCompleted ? 'Delete completed task' : 'Delete task'
        };
        
        // Create the main container
        const li = createElement('li', config.containerClass, {
            'data-task-id': task.id
        });
        
        // Create checkbox
        const checkbox = createElement('input', CSS_CLASSES.TASK_CHECKBOX, {
            type: 'checkbox',
            checked: config.checkboxChecked
        });
        
        // Create text span
        const textSpan = createElement('span', CSS_CLASSES.TASK_TEXT, {
            textContent: task.text
        });
        
        // Assemble basic elements
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        
        // Add edit button only for active tasks
        if (config.showEditButton) {
            const editButton = createButton(
                CSS_CLASSES.EDIT_BUTTON,
                ICONS.EDIT,
                `Edit task: ${task.text}`,
                'Edit task'
            );
            li.appendChild(editButton);
        }
        
        // Add delete button
        const deleteButton = createButton(
            CSS_CLASSES.DELETE_BUTTON,
            ICONS.DELETE,
            `${config.deleteAriaPrefix}: ${task.text}`,
            'Delete task'
        );
        li.appendChild(deleteButton);
        
        return li;
    }
    
    // Save tasks to browser's localStorage for persistence
    function saveTasksToStorage() {
        try {
            // Convert our tasks array to JSON and save it
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            // If saving fails (storage full, etc.), log the error
            console.error('Failed to save tasks to localStorage:', error);
        }
    }
    
    // Load tasks from browser's localStorage
    function loadTasksFromStorage() {
        try {
            // Get the saved tasks from localStorage
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            
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
    
    // Enter edit mode for a task
    function enterEditMode(taskItem, taskId) {
        // Find the task in our array
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        // Get the text span and hide it
        const textSpan = taskItem.querySelector(`.${CSS_CLASSES.TASK_TEXT}`);
        const editButton = taskItem.querySelector(`.${CSS_CLASSES.EDIT_BUTTON}`);
        const deleteButton = taskItem.querySelector(`.${CSS_CLASSES.DELETE_BUTTON}`);
        
        // Hide the original text and buttons
        textSpan.style.display = 'none';
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';
        
        // Create the edit input
        const editInput = createElement('input', CSS_CLASSES.EDIT_INPUT, {
            type: 'text',
            value: task.text
        });
        
        // Create save button
        const saveButton = createButton(
            CSS_CLASSES.SAVE_EDIT_BUTTON,
            ICONS.SAVE,
            'Save changes',
            'Save changes'
        );
        
        // Create cancel button
        const cancelButton = createButton(
            CSS_CLASSES.CANCEL_EDIT_BUTTON,
            ICONS.CANCEL,
            'Cancel edit',
            'Cancel edit'
        );
        
        // Insert the edit elements after the text span
        textSpan.parentNode.insertBefore(editInput, editButton);
        textSpan.parentNode.insertBefore(saveButton, editButton);
        textSpan.parentNode.insertBefore(cancelButton, editButton);
        
        // Focus the input and select all text
        editInput.focus();
        editInput.select();
        
        // Add keyboard event listeners
        editInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveTaskEdit(taskItem, taskId);
            } else if (event.key === 'Escape') {
                event.preventDefault();
                cancelTaskEdit(taskItem, taskId);
            }
        });
    }
    
    // Save the edited task
    function saveTaskEdit(taskItem, taskId) {
        // Get the edit input value
        const editInput = taskItem.querySelector(`.${CSS_CLASSES.EDIT_INPUT}`);
        const newText = editInput.value.trim();
        
        // Don't save if the text is empty
        if (!newText) {
            // Focus back on the input
            editInput.focus();
            return;
        }
        
        // Find the task and update its text
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.text = newText;
            
            // Save to localStorage
            saveTasksToStorage();
            
            // Re-render the tasks to show the updated text
            renderTasks();
        }
    }
    
    // Cancel the edit and return to view mode
    function cancelTaskEdit(taskItem, taskId) {
        // Simply re-render the tasks to reset the view
        renderTasks();
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