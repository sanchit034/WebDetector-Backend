# Microbus Quiz App Readme

This is a README for the Microbus Quiz App, which is a web application built with Node.js, Express.js, and MongoDB. The application allows users to register, login, create or join teams, participate in quizzes, and view leaderboards. Below is a detailed explanation of the project structure, files, and functionalities.

## Project Structure

The project follows a standard Node.js project structure with the following main directories:

- **routes:** Contains route definitions for different API endpoints.
- **controllers:** Contains controller functions that handle the business logic for each route.
- **models:** Contains Mongoose models for MongoDB schema definitions.
- **index.js:** Entry point of the application.
- **.env:** Environment variables configuration file.

## Files Overview

### `index.js`

- This file serves as the entry point for the application.
- It sets up the Express server, connects to the MongoDB database, configures routes, and starts the server.

### `routes` Directory

- **UserRoutes.js:** Defines routes for user-related operations such as registration, login, and profile update.
- **QuesRoutes.js:** Defines routes for managing quiz questions, including adding and updating questions.
- **QuizRoutes.js:** Defines routes for handling quiz-related operations such as fetching questions and checking answers.
- **TeamRoutes.js:** Defines routes for team management, including creating and joining teams.
- **LeaderRoutes.js:** Defines routes for leaderboard functionalities.

### `controllers` Directory

- **UserController.js:** Contains controller functions for user-related operations like registration, login, and profile update.
- **QuesController.js:** Contains controller functions for managing quiz questions.
- **QuizController.js:** Contains controller functions for handling quiz operations such as fetching questions and checking answers.
- **TeamController.js:** Contains controller functions for team-related operations like creating and joining teams.
- **LeaderController.js:** Contains controller functions for leaderboard functionalities.

### `models` Directory

- **UserModel.js:** Defines the Mongoose schema for user data.
- **QuestionModel.js:** Defines the Mongoose schema for quiz questions.
- **QuizModel.js:** Defines the Mongoose schema for storing quiz answers.
- **TeamModel.js:** Defines the Mongoose schema for team data.

## Functionalities

- **User Management:** Users can register, login, and update their profiles.
- **Team Management:** Users can create teams with unique team codes and join existing teams.
- **Quiz Participation:** Users can participate in quizzes by answering questions.
- **Leaderboard:** The application maintains a leaderboard to display the scores of teams.

## Setting Up the Environment

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Create a `.env` file and configure environment variables like `PORT`, `MONGO_URL`, and `JWT_KEY`.
4. Start the server using `npm start`.
5. Access the application through `http://localhost:<PORT>`.

## Dependencies

The project utilizes the following main dependencies:

- **Express.js:** A minimalist web framework for Node.js.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt:** A library for hashing passwords.
- **jsonwebtoken:** A library for generating JSON Web Tokens (JWT) for user authentication.

## API Documentation

This section provides detailed documentation for the API endpoints available in the Microbus Quiz App.

### User Routes

#### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `email`: User's email address.
  - `password`: User's password.
  - `confirmPassword`: Confirm password to ensure accuracy.
- **Response:** Returns a success message and user data upon successful registration.

#### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Login an existing user.
- **Request Body:**
  - `email`: User's email address.
  - `password`: User's password.
- **Response:** Returns a JWT token upon successful login.

#### Update User Profile

- **URL:** `/api/auth/profile`
- **Method:** `PUT`
- **Description:** Update user profile details.
- **Request Body:** Can include any of the following:
  - `username`: User's username.
  - `rollNo`: User's roll number.
  - `mobileNo`: User's mobile number.
  - `email`: User's email address.
  - `password`: User's password.
- **Response:** Returns a success message and updated user profile data.

### Question Routes

#### Add New Question

- **URL:** `/api/que/queData`
- **Method:** `POST`
- **Description:** Add a new question to the quiz.
- **Request Body:**
  - `set`: Quiz set number.
  - `queNo`: Question number.
  - `queUrl`: URL of the question.
  - `queAns`: Answer to the question.
- **Response:** Returns a success message and the added question data.

#### Update Question

- **URL:** `/api/que/queData`
- **Method:** `PUT`
- **Description:** Update an existing question in the quiz.
- **Request Body:**
  - `set`: Quiz set number.
  - `queNo`: Question number.
  - `queUrl`: Updated URL of the question.
  - `queAns`: Updated answer to the question.
- **Response:** Returns a success message and the updated question data.

### Quiz Routes

#### Fetch Question

- **URL:** `/api/dashboard/contest/:set`
- **Method:** `GET`
- **Description:** Fetch the next question for the quiz.
- **Parameters:** 
  - `set`: Quiz set number.
- **Response:** Returns the next question details.

#### Check Answer and Fetch Next Question

- **URL:** `/api/dashboard/contest/:set`
- **Method:** `PUT`
- **Description:** Check the user's answer, update score, and fetch the next question.
- **Parameters:** 
  - `set`: Quiz set number.
- **Request Body:**
  - `answer`: User's answer to the question.
- **Response:** Returns feedback on the answer and the next question details.

### Team Routes

#### Create Team

- **URL:** `/api/teamdetails/createTeam`
- **Method:** `POST`
- **Description:** Create a new team.
- **Request Body:**
  - `teamName`: Name of the team.
- **Response:** Returns a success message and details of the newly created team.

#### Join Team

- **URL:** `/api/teamdetails/joinTeam`
- **Method:** `PUT`
- **Description:** Join an existing team.
- **Request Body:**
  - `teamCode`: Team code to join.
- **Response:** Returns a success message and details of the joined team.

### Leaderboard Routes

#### Get Winners

- **URL:** `/api/leaderboard/winners`
- **Method:** `GET`
- **Description:** Retrieve the list of teams sorted by score.
- **Response:** Returns a list of teams ordered by score.

## Note

- Ensure to include appropriate JWT tokens in the headers for authorized requests.
- Certain routes may require authentication to access. Use the provided JWT token upon successful login.
- Error responses will include relevant error messages for troubleshooting purposes.

This API documentation provides a comprehensive guide to the endpoints available in the Microbus Quiz App, facilitating usage and integration with other applications.

## Contributing

Contributions to the project are welcome. Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

Keshav Garg
Raghav Garg