# Task Manager

A full-stack task management application built with Next.js, TypeScript, React, Firebase Authentication, and Firestore.

## Features

* User registration
* User login and logout
* Firebase Authentication
* User-specific tasks
* Create tasks
* Read and display tasks
* Edit tasks
* Delete tasks
* Persistent task storage with Firestore
* Protected tasks page
* Responsive dark UI
* Bootstrap styling

## Tech Stack

* Next.js
* React
* TypeScript
* Firebase Authentication
* Firebase Firestore
* Bootstrap

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

## CRUD Operations

The application currently supports the complete CRUD cycle for tasks:

* **Create** — users can create new tasks
* **Read** — tasks are loaded from Firestore
* **Update** — users can edit existing tasks
* **Delete** — users can delete tasks

## Current Architecture

The application separates responsibilities between:

* **Pages** — application screens and page-level logic
* **Components** — reusable UI components
* **Hooks** — application logic and Firebase operations
* **lib** — Firebase configuration

## Future Improvements

* Task completion status
* Better loading states
* Form validation
* Improved error handling
* Improved Firestore security rules
* Task filtering and searching
* Task priorities
* Due dates
* Task categories
* Better UI/UX
* User profile management

## Security Testing

After the application is completed and deployed, the project will be used as a legal personal web security testing environment.

Planned testing areas include:

* Authentication security
* Authorization and access control
* Firestore security rules
* Input validation
* XSS
* API and request handling
* Session and cookie security
* Information disclosure
* Security headers
* Business logic vulnerabilities

## Author

Aleksandar Nedic
