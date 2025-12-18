# Corelia Frontend Assessment

A contact management web application built with React and TypeScript. This project demonstrates a robust frontend with authentication, state management, and a custom data table implementation.

## Features

### Authentication

- **User Registration & Login**: Secure access to the application.
- **Protected Routes**: Ensures only authenticated users can access the contact management features.
- **Route Guards**: Redirects unauthenticated users to login and authenticated users away from auth pages.

### Contact Management

- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Data Persistence**: Contacts and user sessions are persisted using `localStorage`.
- **User-Specific Data**: Contacts are isolated per user.

### Advanced Data Table

- **Pagination**: Efficiently browse through large lists of contacts.
- **Sorting**: Sort contacts by columns Name.
- **Custom Implementation**: Built with a custom `useDataTable` hook.

## Technical Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Form and Validation**: React Hook Form with Zod
- **UI Components**: Shadcn UI

## 📘 Technical Documentation

### Architecture Overview

The application follows a **Client-Side Rendering (CSR)** architecture. Since there is no real backend, the application simulates a server-database environment using the browser's `localStorage`. The architecture is designed to be easily scalable to a real API integration by isolating data access logic in the `store` and `lib/storage` layers.

### State Management & Persistence Strategy

**Redux Toolkit** is the backbone of the application's state.

- **Store Structure**:
  - `auth`: Manages `currentUser`, authentication status, and registration/login actions.
  - `contacts`: Manages the list of contacts, including add, edit, and delete operations.
- **Persistence Layer**:
  - A dedicated utility `src/lib/storage.ts` acts as the "Database Adapter".
  - Redux slices initialize their state by getting data from `localStorage`.
  - Actions (like `addContact` or `register`) update both the Redux state (for UI reactivity) and `localStorage` (for persistence).

### Authentication & Security

Authentication is handled with Redux state and React Router guards.

- **Flow**:
  1.  User registers/logs in -> `auth-slice` updates state and saves `userId` to storage.
  2.  `ProtectedRoute` checks `currentUserId`. If not exists, redirects to `/login`.
  3.  `AuthRoute` checks `currentUserId`. If exist, redirects to `/` (prevents logged-in users from entering auth pages).
- **Data Isolation**: Contacts are filtered by `userId`. A user can only see and manipulate contacts linked to their unique ID.

### Custom Hook: `useDataTable`

A custom headless hook `useDataTable` was implemented for table handling, inspired by TanstackTable package.

- **Design Pattern**: Headless UI. The hook handles logic, then the component handles rendering.
- **Capabilities**:
  - **Sorting**: Implements a tri-state sort (Ascending -> Descending -> Reset).
  - **Pagination**: Calculates slice indices and manages `currentPage` state with switcing between pages easily.
  - **Type Safety**: Fully typed with Generics `<T>` to work with any data shape.

### Form Handling & Validation

- **React Hook Form**: Manages form state, submission, and error tracking efficiently without re-renders.
- **Zod Schemas**: Defined in `src/schema` for ensuring that data following the validation rules.

## 📦 Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/usefmahmud/corelia-frontend-assessment
    cd corelia-frontend-assessment
    ```

2.  **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```
