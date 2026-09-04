# Aiconmac Backend API

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/JKSANJAY27/aiconmac-backend)

This repository contains the backend service for the Aiconmac Models Central application. It is a Node.js and Express-based API that handles data management for projects, clients, testimonials, and user interactions. It uses Prisma as an ORM for a PostgreSQL database and integrates with Cloudinary for media asset management.

Freelance Project Link: https://aiconmac.com/en

## Features

*   **RESTful API:** A structured API for managing application data.
*   **User Authentication & Authorization:** JWT-based authentication with role-based access control (Admin, Editor, Viewer).
*   **Project Management:** Full CRUD operations for portfolio projects, including multi-language support (English, Arabic, Russian) and image uploads.
*   **Media Handling:** Seamless image and file (PDF resumes) uploads to Cloudinary, with automatic image optimization to WebP format.
*   **Form Submission Management:** Endpoints to handle contact inquiries and career applications.
*   **Client & Testimonial Management:** Functionality to manage company clients and their testimonials.
*   **Database Keep-Alive:** A scheduled cron job pings the database every 12 hours to prevent it from sleeping on free-tier hosting services.
*   **Structured & Scalable:** Organized codebase with a service-oriented architecture, middleware for common tasks, and comprehensive routing.

## Technology Stack

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authentication:** JSON Web Tokens (JWT), bcrypt
*   **File Storage:** Cloudinary
*   **File Uploads:** Multer with a custom Cloudinary storage engine
*   **Scheduling:** `node-cron` for keep-alive tasks

## Database Schema

The application relies on a PostgreSQL database managed by Prisma. The schema includes the following models:

| Model               | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `User`              | Manages admin panel users with roles (`ADMIN`, `EDITOR`, `VIEWER`).               |
| `Project`           | Stores portfolio projects with details, categories, and multi-language fields.  |
| `Image`             | Manages project images, linking them to a `Project` and storing Cloudinary URLs.|
| `Testimonial`       | Stores client testimonials with an approval status and multi-language fields.   |
| `Client`            | Contains information about company clients, including their logos.                |
| `ContactSubmission` | Captures submissions from the website's contact form.                           |
| `CareerSubmission`  | Captures job applications, including a link to the uploaded resume.             |
| `BrochureRequest`   | Logs and counts email requests for the company brochure.                        |

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   A PostgreSQL database instance
*   A Cloudinary account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jksanjay27/aiconmac-backend.git
    cd aiconmac-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # Server Configuration
    PORT=5000
    NODE_ENV=development

    # Database
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # JWT
    JWT_SECRET="your_jwt_secret_key"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME="your_cloud_name"
    CLOUDINARY_API_KEY="your_api_key"
    CLOUDINARY_API_SECRET="your_api_secret"

    # CORS Allowed Origins
    CLIENT_MAIN_URL="http://localhost:3000"
    CLIENT_COMPANY_URL="http://localhost:3001"
    ```

4.  **Apply the database schema:**
    This command will sync your Prisma schema with the database.
    ```bash
    npx prisma db push
    ```

5.  **Generate the Prisma Client:**
    ```bash
    npx prisma generate
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

### Available Scripts

*   `npm start`: Starts the production server.
*   `npm run dev`: Starts the server in development mode with Nodemon for auto-reloading.
*   `npm run build`: Generates the Prisma client.
*   `npm run prisma:push`: Pushes the current Prisma schema state to the database.
*   `npm run db:init`: A convenience script that runs `prisma:push` and `prisma:generate`.

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint                    | Description                                         | Access          |
| :----- | :-------------------------- | :-------------------------------------------------- | :-------------- |
| POST   | `/auth/register`            | Register a new user.                                | Admin           |
| POST   | `/auth/login`               | Authenticate a user and get a token.                | Public          |
| GET    | `/auth/me`                  | Get the profile of the currently logged-in user.    | Authenticated   |
| GET    | `/auth/users`               | Get a list of all users.                            | Admin           |
| POST   | `/projects`                 | Create a new project with images.                   | Admin, Editor   |
| GET    | `/projects`                 | Get all projects (can be filtered by `category`).   | Public          |
| GET    | `/projects/:id`             | Get a single project by its ID.                     | Public          |
| PUT    | `/projects/:id`             | Update a project.                                   | Admin, Editor   |
| DELETE | `/projects/:id`             | Delete a project.                                   | Admin, Editor   |
| GET    | `/clients`                  | Get all clients.                                    | Public          |
| POST   | `/clients`                  | Create a new client with a logo.                    | Admin, Editor   |
| DELETE | `/clients/:id`              | Delete a client.                                    | Admin, Editor   |
| GET    | `/testimonials`             | Get testimonials (can be filtered by `isApproved`). | Public          |
| POST   | `/testimonials`             | Submit a new testimonial.                           | Public          |
| PUT    | `/testimonials/:id`         | Update a testimonial (e.g., to approve it).         | Admin, Editor   |
| DELETE | `/testimonials/:id`         | Delete a testimonial.                               | Admin, Editor   |
| POST   | `/contact`                  | Submit a contact form inquiry.                      | Public          |
| GET    | `/contact`                  | View all contact submissions.                       | Authenticated   |
| POST   | `/careers`                  | Submit a career application with a resume.          | Public          |
| GET    | `/careers`                  | View all career submissions.                        | Authenticated   |
| POST   | `/brochure-request`         | Log a request for the company brochure.             | Public          |
| GET    | `/brochure-request`         | View all brochure requests.                         | Authenticated   |
| GET    | `/health`                   | Health check endpoint to verify the API is running. | Public          |
| GET    | `/keep-alive`               | Manually trigger the database keep-alive ping.      | Public          |
