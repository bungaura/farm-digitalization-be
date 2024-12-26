# farm-digitalization-be

This is a backend system for Ternakku, designed to support the digitalization of farm management. Built with Node.js, Express.js, and MySQL, it provides features to manage farms, livestock, and daily operations with ease.

# Features
1. User Authentication (Owner and Operator roles)
2. Farm Management (Add, update, delete farms)
3. Livestock Management (Add, update, delete livestock with detailed data)
4. Milk Production Tracking
5. Lactation History
6. Disease and Medication Records
7. Logging for accountability

Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js (v16 or later)
- MySQL
- npm

# Installation

1. Clone the Repository
```bash
git clone https://github.com/bungaura/farm-digitalization-be.git
```

2. Install Dependencies
```bash
npm install [dependencies]
```
Dependencies
- mysql2: Database integration for Node.js
- dotenv: Manage environment variables
- express: Backend framework
- nodemon: Auto-restart server during development


3. Set Up the Database
Run the SQL scripts provided in the scripts/ folder to create and populate the database schema:
```bash
mysql -u root -p farm_management < scripts/schema.sql
```

5. Start the Server
```bash
npm run dev
```
The server will start on http://localhost:3000.

4. Test API Endpoints
Use tools like Postman to test the API endpoints.

5. Test the database connection:
GET http://localhost:3000/test-db

6. Start Development Server:
```bash
npm run dev
```

License
This project is licensed under the MIT License.