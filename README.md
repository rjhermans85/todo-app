# Simple ToDo App

A clean, responsive ToDo application built with vanilla HTML, CSS, and JavaScript. Features localStorage persistence and a mobile-first design.

## 🚀 Live Demo

**[View Live App](https://rjhermans85.github.io/todo-app/)**

## ✨ Features

- ✅ Add new tasks quickly
- ✅ Mark tasks as complete with checkboxes
- ✅ Delete individual tasks with trashcan icons
- ✅ Clear all tasks with confirmation dialog
- ✅ Data persists between browser sessions (localStorage)
- ✅ Responsive design works on mobile and desktop
- ✅ Keyboard shortcut: Press 'n' to focus input field
- ✅ Accessible with proper ARIA labels

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Mobile-first responsive design
- **Persistence**: Browser localStorage
- **Deployment**: GitHub Pages with automated CI/CD

## 🚀 Automated Deployment

This project uses GitHub Actions for automated CI/CD:

### CI Pipeline
Every push to the `main` branch triggers:
1. **HTML Validation** - Validates HTML5 structure and CSS
2. **JavaScript Linting** - Checks for code quality and errors
3. **File Verification** - Ensures all required files exist
4. **Structure Testing** - Verifies required DOM elements are present

### CD Pipeline
After successful validation:
1. **Artifact Creation** - Packages the static site
2. **GitHub Pages Deployment** - Automatically deploys to live site
3. **Deployment Verification** - Confirms successful deployment

### Workflow Status
![Deploy Status](https://github.com/rjhermans85/todo-app/actions/workflows/deploy.yml/badge.svg)

## 📁 Project Structure

```
todo-app/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── .gitignore          # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions CI/CD pipeline
└── README.md           # Project documentation
```

## 🏗️ Local Development

1. **Clone the repository**
   ```bash
   git clone git@github.com:rjhermans85/todo-app.git
   cd todo-app
   ```

2. **Open locally**
   - Simply open `index.html` in your browser, or
   - Use a local server: `python -m http.server 8000`
   - Visit: `http://localhost:8000`

3. **Make changes**
   - Edit HTML, CSS, or JavaScript files
   - Test locally in browser
   - Commit and push to trigger automatic deployment

## 🚀 Deployment Process

1. **Push changes** to the `main` branch
2. **GitHub Actions** automatically triggers
3. **Validation** runs (HTML, CSS, JavaScript)
4. **Deployment** happens automatically if validation passes
5. **Live site** updates in 1-2 minutes

## 🎨 Design Features

- **Purple gradient header** with clean typography
- **Mobile-first responsive design** with breakpoints
- **Interactive hover states** for better UX
- **Trashcan icons** for delete actions
- **Visual feedback** for completed tasks
- **Clean, minimal interface** focused on usability

## 🧠 Learning Goals

This project serves as a learning exercise for:
- Modern web development fundamentals
- Responsive CSS design patterns
- JavaScript DOM manipulation
- Data persistence with localStorage
- Git workflow and version control
- CI/CD pipeline implementation
- GitHub Pages deployment

## 📈 Future Enhancements

- [ ] Drag and drop task reordering
- [ ] Task categories and filtering
- [ ] Due dates and reminders
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA) features
- [ ] Backend API integration
- [ ] User accounts and sync

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).