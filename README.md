# MyDiary

MyDiary is a React-based personal note-taking app. Users sign up with OTP email verification, log in, and manage notes with tags, colors, and bookmarks.

## Features

- **Authentication** — signup with OTP email verification, login with JWT-style auth tokens stored in `localStorage`.
- **Notes CRUD** — create, edit, and delete notes.
- **Tags & colors** — categorize notes as General, To-Do, Critical, Schedule, or Resource, each with a distinct color.
- **Bookmarking** — pin important notes to the top of the list.
- **Note details drawer** — click a note to view its full description and last-edited date in a side drawer.
- **Responsive UI** — built with Material UI (MUI) components and a dark theme.

## Tech Stack

- React (with `react-router-dom` v5 for routing)
- Material UI (`@mui/material`, `@mui/icons-material`)
- Fetch API for backend communication

## Project Structure

```
src/
├── App.js                  # Root component, routing, auth state
├── App.css
├── index.js                # Entry point
├── index.css
├── env_variables.js         # Backend URL config
├── Components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── LoginForm/
│   │   └── LoginForm.js
│   ├── SignupForm/
│   │   └── SignupForm.js
│   └── NoteCard/
│       ├── AddNote/
│       │   ├── AddNoteCard.js
│       │   └── AddNoteCard.css
│       ├── EditNote/
│       │   ├── EditNoteCard.js
│       │   └── EditNoteCard.css
│       └── ShowNoteCard/
│           ├── NoteCard.js
│           └── NoteCard.css
└── Pages/
    ├── Login/
    │   ├── Login.js
    │   └── Login.css
    └── Home/
        ├── Home.js
        └── Home.css
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/Ronyparmar2107/MyDiary-frontend.git
cd mydiary
npm install
npm start
```

The app runs at `http://localhost:3000`.

### Backend

This app expects a companion backend API (see `src/env_variables.js` for the configured URL). Endpoints used:

- `POST /api/auth/getotp` — request signup OTP
- `POST /api/auth/createuser` — create account
- `POST /api/auth/login` — log in
- `POST /api/auth/getuser` — fetch logged-in user
- `GET /api/note/fetchallnotes` — fetch notes
- `POST /api/note/createnote` — create a note
- `PUT /api/note/updatenote` — update/bookmark a note
- `POST /api/note/deletenote` — delete a note

To point at a local backend, uncomment the `localhost:3001` line in `env_variables.js` and comment out the deployed URL.
