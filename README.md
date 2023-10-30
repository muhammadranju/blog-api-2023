# Blog API Documentation

This repository contains a Node.js API for managing blog posts. The API provides endpoints for creating, retrieving, updating, and deleting blog posts. Below, you will find detailed information on how to install, use, and interact with the API.

Installation
To get started with the Blog API, follow these steps:

Clone the repository:

sh
Copy code
git clone <repository-url>
Navigate to the project directory:

sh
Copy code
cd blog-api-nodejs
Install dependencies:

sh
Copy code
npm install
Configure the database:

Update the database configuration in config.js with your database credentials.
Start the server:

sh
Copy code
npm start
The API server will start running at http://localhost:3000.

API Endpoints
Create a Blog Post
Endpoint:

bash
Copy code
POST /api/posts
Save to grepper
Request Body:

json
Copy code
{
"title": "Sample Blog Post",
"content": "This is the content of the blog post."
}
Save to grepper
Response:

json
Copy code
{
"id": 1,
"title": "Sample Blog Post",
"content": "This is the content of the blog post.",
"createdAt": "2023-10-29T12:00:00.000Z"
}
Save to grepper
Get All Blog Posts
Endpoint:

bash
Copy code
GET /api/posts
Save to grepper
Response:

json
Copy code
[
{
"id": 1,
"title": "Sample Blog Post",
"content": "This is the content of the blog post.",
"createdAt": "2023-10-29T12:00:00.000Z"
},
{
"id": 2,
"title": "Another Blog Post",
"content": "This is another blog post.",
"createdAt": "2023-10-29T12:30:00.000Z"
}
]
Save to grepper
Get a Blog Post
Endpoint:

bash
Copy code
GET /api/posts/:id
Save to grepper
Response:

json
Copy code
{
"id": 1,
"title": "Sample Blog Post",
"content": "This is the content of the blog post.",
"createdAt": "2023-10-29T12:00:00.000Z"
}
Save to grepper
Update a Blog Post
Endpoint:

bash
Copy code
PUT /api/posts/:id
Save to grepper
Request Body:

json
Copy code
{
"title": "Updated Blog Post",
"content": "This is the updated content of the blog post."
}
Save to grepper
Response:

json
Copy code
{
"id": 1,
"title": "Updated Blog Post",
"content": "This is the updated content of the blog post.",
"createdAt": "2023-10-29T12:00:00.000Z",
"updatedAt": "2023-10-29T12:45:00.000Z"
}
Save to grepper
Delete a Blog Post
Endpoint:

bash
Copy code
DELETE /api/posts/:id
Save to grepper
Response:

json
Copy code
{
"message": "Blog post deleted successfully."
}
Save to grepper
Error Handling
The API returns appropriate HTTP status codes and error messages in case of invalid requests or failures.

400 Bad Request: Invalid request format or parameters.
404 Not Found: Resource not found.
500 Internal Server Error: Unexpected server error.
Contributing
Contributions are welcome! Please follow the contribution guidelines when making changes to the project.

License
This project is licensed under the MIT License.
