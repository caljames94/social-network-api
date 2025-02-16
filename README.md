# Social Network API

## Description

This project is a RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, MongoDB as the database, and Mongoose as the ODM (Object Document Mapper).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Ensure MongoDB is installed and running on your machine
4. Run  `npm run build` to compile the project
5. Run `npm run seed` to seed the database (optional)
6. Run `npm start` to start the server

## Usage

Once the server is running, you can use a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test the API routes.

## API Routes

### Users
- GET /api/users - get all users
- GET /api/users/:userId - get a single user by ID
- POST /api/users - create a new user
- PUT /api/users/:userId - update a user
- DELETE /api/users/:userId - delete a user

### Thoughts
- GET /api/thoughts - get all thoughts
- GET /api/thoughts/:thoughtId - get a single thought by ID
- POST /api/thoughts - create a new thought
- PUT /api/thoughts/:thoughtId - update a thought
- DELETE /api/thoughts/:thoughtId - delete a thought

### Reactions
- POST /api/thoughts/:thoughtId/reactions - add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - remove a reaction from a thought

### Friends
- POST /api/users/:userId/friends/:friendId - add a friend
- DELETE /api/users/:userId/friends/:friendId - remove a friend

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Walkthrough Video

https://drive.google.com/file/d/1vJZOLhXRcNMZZQkhP-cw3k2kOky5lXxY/view?usp=sharing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or email me on caljames94@gmail.com.

## License

This project is licensed under the MIT License.
