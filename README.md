# Todo Web App

## Overview

Todo Web App is a simple and efficient task management application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The app allows users to create, update, delete, and manage their daily tasks. It features a user-friendly interface and secure user authentication, ensuring that only authorized users can access their personal task lists.

## Features

- **User Authentication**: Secure login and logout functionality using JWT tokens.
- **CRUD Operations**: Users can create, read, update, and delete tasks.
- **Task Management**: Organize tasks based on priority, due date, and status.
- **Responsive Design**: Fully responsive UI for optimal use on both desktop and mobile devices.
- **Data Persistence**: Uses MongoDB Atlas to store and manage task data.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Token)
- **State Management**: React Context and RTK Query

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tim-Asher/TodoWebApp.git
   cd TodoWebApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_DB_ATLAS=mongodb+srv://<username>:<password>@<your-cluster-url>/todoDb?retryWrites=true&w=majority&appName=Cluster0
   MONGO_DB_ATLAS_USERNAME=<your-username>
   MONGO_DB_ATLAS_PASSWORD=<your-password>
   JWT_SECRET=<your-jwt-secret-key>
   JWT_EXPIRES_IN=14d
   ```

   Replace the placeholders with your actual values.

4. **Run the application**:
   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

1. **Sign Up/Login**: Start by signing up or logging in with your credentials.
2. **Create a Task**: Use the input field to create a new task.
3. **Manage Tasks**: Edit, mark as complete, or delete tasks as needed.
4. **Log Out**: Securely log out when you're done.

## API Endpoints

- **`GET /api/todos`**: Retrieve all tasks.
- **`GET /api/todos/user`**: Retrieve tasks for the authenticated user.
- **`POST /api/todos`**: Create a new task.
- **`PATCH /api/todos/:id`**: Update an existing task by ID.
- **`DELETE /api/todos/:id`**: Delete a task by ID.
- **`DELETE /api/todos`**: Delete all tasks.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact Tim Asher via [ashert358@gmail.com](mailto:email@example.com).
