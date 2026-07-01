# RESTful Social Media Feed API (Stateless Backend)

A production-ready, stateless REST API backend designed for a social blogging platform. Built using **Node.js**, **Express.js**, and **MongoDB/Mongoose**, this application shifts away from traditional session-based authentication to fully implement token-based security and real-time, bidirectional client-server communication.

---

## 🚀 Core Features & Backend Competencies

* **Stateless REST Architecture:** Fully decoupled backend providing structured JSON responses, clean HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`), and endpoint scalability.

* **Real-Time Data Sync (WebSockets):** Integrated **Socket.io** to establish persistent, low-latency connections. The server actively emits events to push real-time updates (such as newly created, edited, or deleted posts) to all active frontends instantly.

* **Token-Based Authentication (JWT):** Secure user authorization powered by **JSON Web Tokens**. The API issues cryptographic tokens upon successful verification (`bcryptjs`), decoupling user states from server memory.

* **Image Upload Pipelines:** Handled multi-part form data uploads natively using **Multer**, assigning uniquely generated file paths for user-submitted post images and dynamically managing server disk storage.

* **Server-Side Data Sanitation:** Implemented strict input validation using **express-validator** to sanitize registration fields, content thresholds, and enforce strict database integrity before data entry.

* **Centralized Async Error Handling:** Built custom middleware chains to catch synchronous and asynchronous errors throughout the Express lifecycle, ensuring the server always responds with predictable, descriptive JSON payloads instead of crashing.

---

## 🛠️ Tech Stack & Dependencies

### Core Backend & Real-Time
* **Runtime Environment:** Node.js (CommonJS)
* **Framework:** Express.js (v5.x ecosystem)
* **Real-Time Layer:** Socket.io
* **Database ODM:** Mongoose / MongoDB Atlas

### Security & Utilities
* **Authentication:** `jsonwebtoken` (JWT), `bcryptjs`
* **Validation:** `express-validator`
* **File Uploads:** `multer`
* **CORS Management:** Custom Express Headers Configuration

---

## 📂 Project Structure

```text
node-js-rest-api/
├── app.js                  # App initialization, Express pipeline, & Socket.io socket connection
├── controllers/            # Pure business logic returning JSON payloads
│   ├── auth.js             # User onboarding, authentication gates, and JWT generation
│   └── feed.js             # Feed CRUD operations, asset management, and socket emission triggers
├── models/                 # Mongoose schemas representing database collections
│   ├── user.js             # User credentials and relational tracking to authored posts
│   └── post.js             # Post layout schema containing content strings and image URLs
├── routes/                 # Decoupled REST Endpoint mappings
│   ├── auth.js             # Sign-up and Login route gates
│   └── feed.js             # Post management routes mapped to HTTP verbs
├── middleware/             # Functional request verification layers
│   └── is-auth.js          # Custom JWT extraction and verification middleware guard
├── images/                 # Storage repository for incoming uploaded post graphics
└── package.json            # Scripts, project dependencies, and backend operational nodes
```

---

## 🔧 Installation & Environment Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/nooremeel/node-js-rest-api.git](https://github.com/nooremeel/node-js-rest-api.git)
cd node-js-rest-api
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of the project and populate it with your keys:

```ini
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/messages?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_signing_string
```

---

## 跑 Running the Application

The environment includes predefined script execution blocks configured inside `package.json`:

* **Production Start:** Standard single-run instance.
  ```bash
  npm start
  ```

* **Development Boot Mode:** Automated workspace reloading using `nodemon`.
  ```bash
  npm run start:dev
  ```

---

## 🎓 Acknowledgements

This application was constructed as an extensive operational extension of the **NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)** curriculum by Academind (Maximilian Schwarzmüller), focusing heavily on constructing decoupled REST architectures, managing stateless JWT authentications, implementing WebSockets via Socket.io, and delivering structured JSON api standards.
