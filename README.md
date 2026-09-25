# Task Manager

A full-stack task management application built with Next.js, TypeScript, React, Firebase Authentication, and Firestore.

## Features

- User registration
- User login and logout
- Firebase Authentication
- User-specific tasks
- Create tasks
- Delete tasks
- Persistent task storage with Firestore
- Protected tasks page
- Responsive dark UI
- Bootstrap styling

## Tech Stack

- Next.js
- React
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Bootstrap

## Project Structure

```text
app/
├── page.tsx
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
└── tasks/
    └── page.tsx

components/
└── TaskForm.tsx

hooks/
├── useLogin.ts
├── useRegister.ts
└── useTask.ts

lib/
└── firebase.ts
```

## Firebase Structure

Each user's tasks are stored separately using their Firebase Authentication UID:

```text
users/
└── {userId}/
    └── tasks/
        └── {taskId}/
            ├── task
            └── description
```

## Current Architecture

The application separates responsibilities between:

- **Pages** — application screens and page-level logic
- **Components** — reusable UI components
- **Hooks** — application logic and Firebase operations
- **lib** — Firebase configuration

## Future Improvements

- Edit tasks
- Task completion status
- Better loading states
- Form validation
- Improved Firestore security rules
- Better error handling
- Task filtering and searching

## Author

Aleksandar Nedic