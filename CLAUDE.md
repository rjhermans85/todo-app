# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Simple To Do App designed to help users capture and complete tasks without forgetting important items. The project focuses on simplicity and speed over complex features.

### Target User
- Primary user: Jessica, 34, busy mom managing household, kids' activities, and freelance work  
- Needs quick task capture (under 10 seconds)
- Values simplicity and intuitive interfaces
- No time for complex setup or account creation

### Core Requirements
- Add new tasks quickly
- Mark tasks as complete 
- Remove completed/unwanted tasks
- Persist tasks between sessions
- Clean, focused interface

## Technical Foundation

### Tech Stack
**Frontend**: Vanilla HTML/CSS/JavaScript (ES6+)
- No frameworks initially - focus on learning fundamentals
- Responsive design with CSS Grid/Flexbox
- Progressive Web App features can be added later

**Backend**: Python-based progression
- Phase 1: Client-side only with localStorage
- Phase 2: Python Flask or FastAPI with SQLite
- Phase 3: PostgreSQL for scaling

**Deployment**:
- Phase 1: GitHub Pages (static hosting)
- Phase 2: Railway, Render, or PythonAnywhere (Python hosting)

### Implementation Phases

**Phase 1 (Proof of Concept)**:
- Three files: `index.html`, `style.css`, `script.js`
- Browser localStorage for task persistence
- Focus on core functionality and learning fundamentals

**Phase 2 (Backend Integration)**:
- Python Flask/FastAPI REST API server
- SQLite database with Python integration
- Frontend communicates via HTTP requests
- Learn full-stack development concepts

**Phase 3 (Production Ready)**:
- User authentication system
- PostgreSQL database migration
- Advanced features and optimizations

## Development Setup

### Phase 1 Requirements
- Modern web browser (Chrome, Firefox, Safari)
- Text editor (VS Code recommended)
- Local web server for testing (Python `http.server` or Live Server extension)

### Phase 2 Requirements (Future)
- Python 3.8+
- pip package manager
- Virtual environment setup
- Flask or FastAPI framework

## Architecture

### Phase 1 Architecture
```
Browser
├── index.html (structure)
├── style.css (styling)  
├── script.js (logic)
└── localStorage (persistence)
```

### Phase 2 Architecture (Future)
```
Frontend (HTML/CSS/JS) ←→ REST API ←→ Python Backend ←→ SQLite Database
```

## Coding Standards
- Add comments for complex business logic
- No external dependencies without approval
- Mobile-first responsive design

## Architecture Principles
- Keep components small and focused
- Separate business logic from UI components
- Use consistent error handling patterns
- Follow RESTful API conventions

## AI Instructions

### Developer Context
This project is designed as a **learning experience for a beginner developer**. The primary goal is to learn how to code with the help of Claude Code, with the ToDo app serving as a practical learning vehicle.

### Code Generation
- Always explain architectural decisions and why specific approaches were chosen
- Ask clarifying questions if requirements are ambiguous
- Suggest improvements but don't implement without approval
- Generate complete, working code blocks (no placeholders)
- **Write highly readable code with clear variable names and structure**
- **Include comprehensive comments explaining what each section does**
- **Explain any coding concepts, patterns, or syntax that might be unfamiliar**

### Problem Solving
- Start with the simplest solution that works
- Only add complexity when specifically requested
- Highlight potential issues or edge cases
- Suggest testing approaches for new features
- **Break down complex problems into smaller, understandable steps**
- **Explain the reasoning behind each solution approach**

### Communication
- Use clear, structured explanations appropriate for a beginner
- Provide extensive code comments in generated files
- Flag when you're making assumptions
- Offer alternatives when multiple approaches exist
- **Explain technical terminology and concepts**
- **Provide learning context: why this approach, what alternatives exist, what to learn next**
- **Offer guidance on best practices and common patterns**

## Project Files

- `0_vision.md` - Contains the complete project vision, user profiles, success metrics, and requirements. Read this file to understand the project goals and user needs before making any implementation decisions.
- `1_success.md` - Defines success criteria for the Proof of Concept, including core features, user experience goals, and technical requirements appropriate for a PoC implementation.