# Video Course Platform

## About the project

## Tools and Technologies used
- React.js
- Express
- Postgres
- Mantine UI Library
- Axios
- YouTube Data API

## DB Schema
### Users Table
```
users
    user_id : random generated string by postgres
    user_name : name of the user
    user_email : email of the user
    user_password : hashed password by bcrypt
    courses : array containing the id of the courses subscribed by the user

```
### Courses Table
```
courses
    course_id : random generated string by postgres
    course_name : name of the course
    course_instructor : instructor of the course
    course_price : price of the course
    enrolled_members : no of users subscribed to the course
    course_link : YouTube playlist link of the courses

```
## Steps to run the project

- copy the main directory to any location
- ``cd`` into the directory of the project 
- Run ``npm install`` in the root directory of the project for the client libraries
- ``cd`` into the ``server`` directory
- Run ``npm install`` in the server directory for the server dependencies
- Consult the README in server directory for info about the database
- ``cd`` to the root directory and run the client server by ``npm start``
- ``cd`` to the server directory and start the local server by running ``npm run dev``
- Navigate to ``http://localhost:3000/register`` for registering if not automatically redirected
- After registering and loggin in, navigate to ``http://localhost:3000`` if not automatically redirected
