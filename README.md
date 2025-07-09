# YakTalk - Real-time Chat Application

## 🚀 Live Demo

Experience YakTalk live: **https://yaktalk-chatapp-1.onrender.com**

## ✨ Overview

YakTalk is a modern, real-time chat application built to demonstrate full-stack web development skills, leveraging Node.js for the backend and React for the dynamic user interface. It provides users with a seamless experience for instant messaging, including private chats and an online user presence indicator.

This project was built to deepen my understanding of real-time communication with WebSockets, robust user authentication, and full-stack deployment.

## 🌟 Features

* **User Authentication:** Secure registration and login functionalities using JWT (JSON Web Tokens) and `bcrypt` for password hashing.
* **Real-time Chat:** Instant messaging capabilities powered by Socket.IO for seamless communication.
* **Private Messaging:** Send direct messages to specific online users.
* **Online User List:** Dynamically displays all currently connected users.
* **Session Management:** Secure, HTTP-only cookie-based session handling.
* **Cross-Origin Resource Sharing (CORS):** Properly configured for secure communication between frontend and backend on different domains.
* **Full-Stack Deployment:** Both frontend and backend are deployed and fully operational on Render.

## 🛠️ Technologies Used

### Frontend (Client-Side)

* **React.js:** A JavaScript library for building user interfaces.
* **Socket.IO Client:** For real-time, bidirectional communication with the server.
* **React Router DOM:** For declarative routing in React applications.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Axios / Fetch API:** For making HTTP requests to the backend.
* **`jwt-decode`:** To decode JWTs on the client-side (for display purposes).

### Backend (Server-Side)

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **Socket.IO:** For real-time, event-based communication.
* **MongoDB Atlas:** Cloud-hosted NoSQL database for storing user data.
* **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
* **JSON Web Tokens (JWT):** For secure, stateless user authentication.
* **Bcrypt.js:** For password hashing and security.
* **`cookie-parser`:** Middleware to parse cookies attached to the client request.
* **`cors`:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* **`dotenv`:** For loading environment variables from a `.env` file.

## 🌐 Deployment

Both the frontend and backend of YakTalk are deployed on [Render](https://render.com/).

* **Frontend Deployment:** Hosted as a Static Site.
* **Backend Deployment:** Hosted as a Web Service.

## 🚀 Getting Started (Local Development)

To run this project locally, follow these steps:

### Prerequisites

* Node.js (v14 or higher recommended)
* npm or Yarn
* MongoDB Atlas Account (or local MongoDB instance)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SanamRai001/YakTalk-chatapp.git](https://github.com/SanamRai001/YakTalk-chatapp.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file in the `server` directory:**
    ```
    MONGODB_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
    PRIVATE_TOKEN="YOUR_JWT_SECRET_KEY" 
    PORT=5000
    FRONTEND_URL="http://localhost:5173" #
    NODE_ENV="development"
    ```
    * **MONGODB_URI:** Get this from your MongoDB Atlas dashboard.
    * **PRIVATE_TOKEN:** Generate a strong, random string (e.g., using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
    * **FRONTEND_URL:** This should be the URL where your React dev server runs.
4.  **Start the backend server:**
    ```bash
    npm start # Or node server.js
    ```
    The server should be running on `http://localhost:5000` (or your specified PORT).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../client # Assuming 'client' is your frontend folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure `BACKEND_URL`:** In your frontend code (e.g., `Socket.jsx` or a config file), ensure `BACKEND_URL` points to your local backend if you plan to run frontend and backend locally for development.
    ```javascript
    // Example in Socket.jsx or a config file:
    const BACKEND_URL = "http://localhost:5000"; // For local development
    // For production, this should point to your deployed backend URL on Render:
    // const BACKEND_URL = "[https://yaktalk-chatapp.onrender.com](https://yaktalk-chatapp.onrender.com)";
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The React app should open in your browser, typically at `http://localhost:5173` or similar.

## 🐞 Challenges Faced & Solutions

Developing YakTalk involved tackling several common, yet critical, full-stack challenges:

* **CORS Configuration:** Ensuring secure communication between distinct frontend and backend origins, especially with `credentials: true` for cookies, required careful setup of `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers`. Debugging subtle mismatches (like trailing slashes in URLs) was key.
* **Cookie Management with JWTs:** Properly setting `HttpOnly`, `Secure`, and `SameSite=None` attributes for cross-site cookie handling was crucial for maintaining secure user sessions across different domains on Render. Initial issues with cookies not being set were resolved by verifying `NODE_ENV` and ensuring the `domain` attribute was correctly omitted.
* **Real-time WebSocket Authentication:** Integrating JWT-based authentication with Socket.IO required parsing cookies from the `socket.handshake.headers` and verifying the token before allowing a connection, ensuring only authenticated users could join the chat. Debugging early disconnections highlighted the importance of this step.
* **Deployment-Specific Issues:** Overcoming hurdles related to environment variable configuration on Render, understanding cold starts, and ensuring proper build commands for both services were vital for a successful live application.

## 🚀 Future Enhancements

* **Message Persistence:** Store chat messages in the database so history is available upon reconnecting.
* **Group Chat Functionality:** Implement rooms for multiple users to chat simultaneously.
* **User Profiles & Avatars:** Allow users to customize their profiles and add avatars.
* **Typing Indicators:** Show when another user is typing.
* **Read Receipts:** Indicate when messages have been read.
* **Notifications:** Implement desktop or mobile push notifications for new messages.
* **More Robust Error Handling & UI Feedback:** Provide clearer error messages to users.

## 🤝 Contributing

Feel free to fork this repository, open issues, or submit pull requests.
