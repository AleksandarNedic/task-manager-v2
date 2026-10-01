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
* Saving state during form submission
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
Task title is required.
```

## Error Handling

Basic error handling is currently being implemented.

Planned improvements include:

* `try/catch` around Firebase operations
* `finally` for reliable loading/saving state cleanup
* User-friendly Firebase error messages
* Handling failed task creation
* Handling failed task updates
* Handling failed task deletion
* Handling failed task loading
* Preventing the UI from becoming stuck after an error

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

## Current Architecture

The application separates responsibilities between:

* **Pages** — application screens and page-level UI logic
* **Components** — reusable UI components
* **Hooks** — application logic and Firebase operations
* **lib** — Firebase configuration

The `useTask` hook currently handles:

* Task state
* Task creation
* Task retrieval
* Task editing
* Task deletion
* Task validation errors

## Current Development Status

The core task management functionality is complete.

### Completed

* [x] User registration
* [x] User login
* [x] User logout
* [x] Protected tasks page
* [x] Firebase Authentication
* [x] Firestore integration
* [x] Create tasks
* [x] Read tasks
* [x] Edit tasks
* [x] Delete tasks
* [x] User-specific task storage
* [x] Basic form validation
* [x] Basic saving state
* [x] Dark responsive UI

### In Progress

* [ ] Complete Firebase error handling
* [ ] Improve loading states
* [ ] Improve validation UX
* [ ] Improve Firestore Security Rules
* [ ] Clean up task hook responsibilities
* [ ] Improve edge-case handling

## Planned Features

### Task Management

* Task completion status
* Mark tasks as completed
* Task priorities
* Due dates
* Task categories
* Task filtering
* Task searching
* Task sorting
* Confirmation before deleting
* Better empty states

### User Features

* User profile
* Display current user information
* Profile editing
* Password management
* Account deletion
* Better authentication error messages

### UI/UX

* Improved responsive design
* Better mobile experience
* Improved form feedback
* Loading indicators
* Success notifications
* Confirmation dialogs
* Better accessibility
* Improved keyboard navigation

### Application Architecture

* Reusable task form component
* Further separation of UI and business logic
* Stronger TypeScript types
* Better error handling architecture
* Cleaner Firebase service abstraction
* Improved state management where necessary

## Security

Security is an important part of this project.

The application will eventually be deployed and used as a legal personal web security testing environment.

### Planned Security Improvements

* Firestore Security Rules
* Authentication and authorization checks
* User isolation
* Input validation
* Server-side validation where applicable
* Security headers
* Protection against unauthorized Firestore access
* Protection against IDOR / broken access control
* XSS testing
* Injection testing
* Session and authentication security
* Information disclosure testing
* Rate limiting considerations
* API/request security
* CORS configuration review
* Business logic security

## Personal Security Testing

After the application is sufficiently complete and deployed, it will be used as an authorized personal penetration-testing laboratory.

Testing areas will include:

* Authentication security
* Authorization and access control
* Firestore Security Rules
* IDOR / broken access control
* Input validation
* XSS
* Injection vulnerabilities
* API and request handling
* Session and authentication behavior
* Security headers
* Information disclosure
* Rate limiting and abuse resistance
* Business logic vulnerabilities

The testing will be performed only against systems and environments that are owned by or explicitly authorized for testing.

## Learning Goals

This project is being used to practice real-world development concepts rather than simply completing isolated exercises.

The main learning goals are:

* Build a complete application from frontend to database
* Understand React state and component architecture
* Understand Next.js application structure
* Work with TypeScript
* Understand authentication
* Understand database CRUD operations
* Understand asynchronous JavaScript
* Handle loading and error states
* Practice input validation
* Learn secure database access
* Learn authorization and access control
* Eventually perform security testing against the application

## Future Development Roadmap

```text
Current CRUD
     ↓
Validation
     ↓
Error Handling
     ↓
Loading States
     ↓
Firestore Security Rules
     ↓
Task Completion / Priorities / Due Dates
     ↓
Filtering / Searching / Sorting
     ↓
User Profile
     ↓
UI/UX Improvements
     ↓
Deployment
     ↓
Security Review
     ↓
Authorized Penetration Testing
     ↓
Security Report
     ↓
Fix Vulnerabilities
     ↓
Retest
```

## Author

Aleksandar Nedic
