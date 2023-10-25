# Sprint Planner Backend

This is a Node.js backend for teams to plan sprints. It provides basic functionality for managing tasks and sprints.

## Features

- Create, read, update, and delete tasks.
- Plan and manage sprints.
- RESTful API for easy integration with frontend applications.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ralphvw/sprint-planner.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables by creating a `.env` file with the content in the .env.sample file:


4. Start the server:

   ```bash
   npm start
   ```

The server will run on the port specified in your `.env` file (default is 4000).

## API Endpoints

- `GET /api/tasks`: Get a list of all tasks.
- `GET /api/tasks/:id`: Get a specific task by ID.

For more details about the API endpoints and request/response formats, please refer to the source code and documentation.

## Technology Stack

- TypeScript
- Express.js
- PostgreSQL(You can use any database of your choice)

## Contributing

Feel free to contribute to this project by submitting issues and pull requests.
You can contact project owners: @ralphvw @AmmDuncan

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
