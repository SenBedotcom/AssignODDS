# Sorting Hat API on Express Application
This is Node.js Express with REST API for Sorting Students into four different houses, including, Gryffindor, Slytherin, Ravenclaw and Hufflepuff

## Prerequisites
- Node.js and npm
- Postman at port:3000

## API Endpoints
- GET `/knockknock` Returns a message and status to confirm that API is working
- GET student Get all students
- GET student/:studentId Get a student with id
- POST `/sorting-hat/sort` Sort students into houses
    example
    "studentAmount": 1,
    "students": [
    
    {
       "name": "SenBe"
    },
    {
       "name": "Tum"
    }
    // studentAmount and amount of student in students must be the same.
    ]
- DELETE `/student/delete` Delete All Sudent and return the effect rows.
