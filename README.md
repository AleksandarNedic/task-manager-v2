# Task Manager

A full-stack task management application built with Next.js, TypeScript, React, Firebase Authentication, and Firestore.

The project is being developed as a practical full-stack learning project, with a focus on authentication, database operations, application architecture, validation, error handling, and web security.

## Features

* User registration
* User login and logout
* Firebase Authentication
* Persistent authentication
* Protected tasks page
* User-specific tasks
* Create tasks
* Read and display tasks
* Edit tasks
* Delete tasks
* Persistent task storage with Firestore
* Task count
* Form validation
* Basic error messaging
* Firebase error handling
* Saving state during form submission
* Registration success feedback
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

This structure allows tasks to be associated with the authenticated user.

## CRUD Operations

The application currently supports the complete CRUD cycle for tasks:

* **Create** — users can create new tasks
* **Read** — tasks are loaded from Firestore
* **Update** — users can edit existing tasks
* **Delete** — users can delete tasks

## Validation

The task form currently validates the task title before submission.

* Task title is required
* Whitespace-only input is rejected
* Description is optional
* Validation errors are displayed to the user
* Validation is applied to both creating and editing tasks

Example validation message:

```text
Task is required.
```

Registration also includes basic validation:

* Email must contain `@`
* Password must contain at least 6 characters

## Error Handling

Basic Firebase error handling has been implemented for task operations.

Current operations using `try/catch`:

* Task creation
* Task retrieval
* Task editing
* Task deletion

The application logs technical errors to the console while displaying user-friendly messages in the UI.

Examples:

```text
Failed to add task. Please try again.
Failed to load tasks. Please try again.
Failed to update task. Please try again.
Failed to delete task. Please try again.
```

Further improvements are planned for more detailed Firebase-specific error handling.

## Loading States

The application currently includes a saving state for task creation and editing.

Current behavior:

* Submit button becomes disabled while saving
* Button text changes to `Saving...`
* Duplicate submissions are prevented while the operation is in progress

Planned improvements:

* Task loading state
* Delete loading state
* Authentication loading states
* Better visual feedback during Firebase operations

## Registration Feedback

The registration flow currently provides feedback after successful account creation.

After Firebase successfully creates the account:

```text
Account created successfully. You can now log in.
```

The user can then select:

```text
Go to login →
```
