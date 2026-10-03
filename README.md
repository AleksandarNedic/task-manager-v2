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
* Loading state while fetching tasks
* Saving state during form submission
* Registration success feedback
* Delete confirmation modal
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

* Email format is validated
* Password length is validated
* Password confirmation is validated

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

Firebase-specific registration errors are also handled, including:

* Email already in use
* Invalid email
* Weak password
* Network errors
* Too many requests
* Firebase configuration issues

Further improvements are planned for more detailed Firebase-specific error handling.

## Loading States

The application currently includes loading and saving states.

### Task Loading

While tasks are being retrieved from Firestore:

```text
Loading tasks...
```

is displayed instead of the task list.

### Saving State

During task creation or editing:

* Submit button becomes disabled
* Button text changes to `Saving...`
* Duplicate submissions are prevented while the operation is in progress

Future improvements may include more detailed loading feedback for individual operations.

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

## Delete Confirmation

Deleting a task now requires user confirmation.

When the user selects **Delete**, a custom confirmation modal is displayed:

```text
Delete task?

Are you sure you want to delete this task?

[ No ] [ Yes, delete ]
```

The modal uses the application's existing dark UI design and is displayed in the center of the screen.

The selected task ID is temporarily stored so the correct task can be deleted after confirmation.

## Future Improvements

Planned improvements include:

* Refactor `TasksPage` into smaller reusable components
* Extract task list into a dedicated `TaskList` component
* Extract individual tasks into a `TaskItem` component
* Extract the delete confirmation into a reusable `DeleteConfirmation` component
* Improve Firebase-specific error handling
* Add stronger Firestore Security Rules
* Improve authentication security
* Add additional form validation
* Improve loading and error feedback
* Deploy the application
* Perform authorized security testing on the deployed application
* Test for common web security issues such as broken access control, XSS, authentication issues, and information disclosure
