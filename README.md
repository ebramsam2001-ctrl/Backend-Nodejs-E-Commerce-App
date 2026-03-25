# Product Management API System

A comprehensive RESTful backend API designed to manage users, products, and categories. This system serves as a robust foundation for e-commerce or inventory management applications, featuring secure authentication, role-based access control, and image upload capabilities.

---

## 🚀 Features

* **User Management**: Registration and login with JWT-based authentication.
* **Role-Based Access Control (RBAC)**: Defined permissions for `admin` and `user` roles.
* **Category Management**: Full CRUD operations to organize products.
* **Product Management**: Comprehensive CRUD operations for managing items.
* **File Uploads**: Support for uploading and serving product images.
* **Middleware Integration**: Request logging, JWT validation, and global error handling.
* **Security**: Input validation and data sanitization.

---

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (NoSQL)
* **Security**: JSON Web Tokens (JWT), Bcrypt
* **Validation**: Joi / Express-validator
* **File Handling**: Multer (or equivalent)
* **Logging**: Morgan

---

## 📂 Project Structure

The project follows a Clean Architecture pattern to separate concerns and ensure scalability:

```text
src/
├── config/         # Environment variables and DB configuration
├── controllers/    # Request handling and response logic
├── middleware/     # Auth, logging, and error handling
├── models/         # Database schemas (User, Product, Category)
├── routes/         # API endpoint definitions
├── services/       # Business logic
└── utils/          # Helper functions and constants
```

---

## 🛰 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate and get JWT token |

### Categories
| Method | Endpoint | Access |
| :--- | :--- | :--- |
| GET | `/categories` | Public/User |
| GET | `/categories/:id` | Public/User |
| POST | `/categories` | Admin |
| PUT | `/categories/:id` | Admin |
| DELETE | `/categories/:id` | Admin |

### Products
| Method | Endpoint | Access |
| :--- | :--- | :--- |
| GET | `/products` | Public/User |
| GET | `/products/:id` | Public/User |
| POST | `/products` | Admin |
| PUT | `/products/:id` | Admin |
| DELETE | `/products/:id` | Admin |
| POST | `/products/:id/upload-image` | Admin |

---

## 🔧 Database Schema

### User
* `id`: Unique Identifier
* `name`: String
* `email`: String (Unique)
* `password`: String (Hashed)
* `role`: Enum (`admin`, `user`)
* `createdAt`: Date

### Category
* `id`: Unique Identifier
* `name`: String
* `description`: String
* `createdAt`: Date

### Product
* `id`: Unique Identifier
* `name`: String
* `description`: String
* `price`: Number
* `image`: String (File path)
* `categoryId`: Reference to Category
* `createdBy`: Reference to User
* `createdAt`: Date

---

## 📝 Setup and Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env` file and add:
    * `PORT=5000`
    * `MONGO_URI=your_mongodb_connection_string`
    * `JWT_SECRET=your_secret_key`
4.  **Start the server**:
    ```bash
    npm start
    ```

Would you like me to generate the **User Model** code or perhaps the **Authentication Middleware** to get the coding started?
