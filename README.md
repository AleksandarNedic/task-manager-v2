# Task Manager

A full-stack task management application built with Next.js, TypeScript, React, Firebase Authentication, and Firestore.

The project is being developed as a practical full-stack learning project, with a focus on authentication, database operations, application architecture, validation, error handling, and web security.

## Features

- User registration
- User login and logout
- Firebase Authentication
- Persistent authentication
- Protected tasks page
- User-specific tasks
- Create tasks
- Read and display tasks
- Edit tasks
- Delete tasks
- Persistent task storage with Firestore
- Task count
- Task status management
- Task priority management
- Form validation
- Basic error messaging
- Firebase error handling
- Loading state while fetching tasks
- Saving state during form submission
- Registration success feedback
- Delete confirmation modal
- Responsive dark UI
- Bootstrap styling
- Component-based task architecture
- Reusable Firebase error handling

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
└── (auth)/
    ├── login/
    │   └── page.tsx
    ├── register/
    │   └── page.tsx
    └── tasks/
        └── page.tsx

components/
├── TaskCard.tsx
├── TaskForm.tsx
├── ConfirmModal.tsx
└── TaskHeader.tsx

hooks/
├── useLogin.ts
├── useRegister.ts
├── useTask.ts
└── useAuthGuard.ts

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
            ├── description
            ├── status
            └── priority
```

The `userId` is taken from the authenticated Firebase user.

This structure allows each task to be associated with the correct authenticated user.

## Task Status

Tasks currently support three statuses:

- 🟡 Pending
- 🔵 In Progress
- 🟢 Completed

The selected status is stored in Firestore and can be changed when editing a task.

When a task is completed, its priority is hidden from the task card because priority is no longer relevant to a completed task.

## Task Priority

Tasks currently support three priority levels:

- 🟢 Low
- 🟡 Medium
- 🔴 High

Priority is stored in Firestore and can be selected when creating or editing a task.

Priority is displayed on active tasks and hidden when the task status is `completed`.

## CRUD Operations

The application currently supports the complete CRUD cycle for tasks:

- **Create** — users can create new tasks
- **Read** — tasks are loaded from Firestore
- **Update** — users can edit existing tasks, including status and priority
- **Delete** — users can delete tasks

## Component Architecture

The tasks page has been refactored into smaller reusable components to improve readability, maintainability, and separation of responsibilities.

### Tasks Page

Responsible for coordinating the task management page and connecting the different parts of the application.

It manages page-level state such as:

- Editing state
- Saving state
- Task deletion confirmation
- Task status
- Task priority

### TaskForm

Handles:

- Creating tasks
- Editing tasks
- Task title input
- Description input
- Status selection
- Priority selection
- Form submission
- Saving state
- Validation error display

### TaskCard

Represents an individual task and handles the UI for a single task.

It displays:

- Task title
- Description
- Status
- Priority
- Edit button
- Delete/Cancel button

### ConfirmModal

Provides reusable confirmation UI for destructive actions such as deleting a task.

### TaskHeader

Contains the main tasks page header and logout functionality.

## Custom Hooks

### useTask

Handles the main task-related functionality:

- Creating tasks
- Loading tasks
- Editing tasks
- Deleting tasks
- Task state
- Loading state
- Error state
- Firebase error handling

### useLogin

Handles Firebase user login functionality and login-related errors.

### useRegister

Handles Firebase account registration and registration-related validation and errors.

### useAuthGuard

Protects the tasks page by checking the current authentication state and redirecting unauthenticated users.

## Validation

The task form validates user input before submitting tasks.

Current task validation includes:

- Task title is required
- Whitespace-only input is rejected
- Task title length is limited
- Description length is limited
- Validation is applied to both creating and editing tasks
- Validation errors are displayed to the user

Example validation message:

```text
Task is required.
```

Registration also includes basic validation:

- Email format is validated
- Password length is validated
- Password confirmation is validated

## Error Handling

Basic Firebase error handling has been implemented for task operations.

Current task operations using `try/catch`:

- Task creation
- Task retrieval
- Task editing
- Task deletion

Firebase errors are converted into user-friendly messages before being displayed in the UI.

Examples:

```text
Failed to add this task. Please try again.

Failed to load your tasks. Please try again.

Failed to update this task. Please try again.

Failed to delete this task. Please try again.
```

Specific Firebase errors such as permission errors and network errors are also handled where applicable.

Registration also handles Firebase-specific errors including:

- Email already in use
- Invalid email
- Weak password
- Network errors
- Too many requests
- Firebase configuration issues

## Loading States

The application includes loading and saving states.

### Task Loading

While tasks are being retrieved from Firestore:

```text
Loading tasks...
```

is displayed instead of the task list.

### Saving State

During task creation or editing:

- Submit button becomes disabled
- Button text changes to `Saving...`
- Duplicate submissions are prevented while the operation is in progress

## Registration Feedback

The registration flow provides feedback after successful account creation.

After Firebase successfully creates the account:

```text
Account created successfully. You can now log in.
```

The user can then select:

```text
Go to login →
```

## Delete Confirmation

Deleting a task requires user confirmation.

When the user selects **Delete**, a custom confirmation modal is displayed:

```text
Delete task?

Are you sure you want to delete this task?

[ No ] [ Yes, delete ]
```

The selected task ID is temporarily stored so the correct task can be deleted after confirmation.

## Firestore Security

Firestore Security Rules are configured so authenticated users can only access tasks belonging to their own Firebase Authentication UID.

Current rule structure:

```text
request.auth != null
&& request.auth.uid == userId
```

This prevents one authenticated user from directly accessing another user's tasks.

The authorization behavior has also been manually tested by attempting to access another user's task while authenticated as a different user. Firestore correctly rejected the unauthorized request.

## Current Development Status

The main task management functionality is implemented, including:

- Firebase Authentication
- Persistent authentication
- Protected routes
- Firestore CRUD operations
- User-specific tasks
- Task status
- Task priority
- Validation
- Error handling
- Loading and saving states
- Delete confirmation
- Component-based architecture
- Firestore authorization

The project is currently moving from the development phase toward final functionality testing, deployment, and authorized security testing.

## Next Development Steps

Planned improvements include:

- Search tasks
- Filter tasks
- Additional task organization features
- Final UI and functionality testing
- Deploy the application to Vercel
- Perform authorized security testing on the deployed application
- Identify vulnerabilities through practical testing
- Fix discovered vulnerabilities
- Retest the application after security fixes

## Security Testing Plan

After deployment, the application will be used as an authorized personal security-testing target.

The testing process will follow a practical penetration-testing workflow:

```text
Find
  ↓
Understand
  ↓
Test / Exploit
  ↓
Fix
  ↓
Retest
```

The goal is not to secure the application before every vulnerability is encountered.

Instead, the application will be used to learn how vulnerabilities work in practice by first identifying and testing them, then implementing the appropriate fix and verifying that the vulnerability has been resolved.

Planned security testing areas include:

- Broken access control
- IDOR
- Authentication issues
- Authorization issues
- XSS
- Information disclosure
- Improper Firestore access
- Input validation weaknesses
- Client-side security assumptions
- Other common web application vulnerabilities

## Security Learning Goal

The main purpose of the project is not only to build a functional task manager, but also to understand how a modern web application works from both the development and security perspectives.

The project provides practical experience with:

- Frontend architecture
- React and Next.js
- TypeScript
- Authentication
- Authorization
- Firestore databases
- API/database interactions
- Input validation
- Error handling
- Application security
- Web penetration testing

After completing the application, the same application will be tested from an attacker's perspective in an authorized environment.

This creates a complete learning cycle:

```text
Build → Deploy → Test → Find Vulnerabilities → Fix → Retest
```
