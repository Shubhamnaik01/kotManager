# 🍽️ KOT Manager (Kitchen Order Ticket)

A Full-stack MERN application built for real-time restaurant order management. The system streamlines communication between the front-of-house (Counter) and the back-of-house (Kitchen) to eliminate manual errors and delay.

---

## 🚀 Core Functionalities

- **Real-time Order Flow:** Utilizes **WebSockets (`ws`)** to push orders from the Counter to the Kitchen display instantly without polling or page refreshes.
- **Dual-Role Dashboard:** \* **Counter:** Interface for placing orders and monitoring status and creating new Items.
  - **Kitchen:** Interface for viewing pending orders and marking them as completed.
- **Automatic Reconnection & Sync:** When the Kitchen role connects, the system automatically fetches all `pending` orders from the database to ensure no order is missed.
- **Smart Network Logic:** \* **Dynamic Protocol:** Switches between `ws://` and `wss://` based on the environment (SSL/Production).
  - **Axios Interceptors:** Handles JWT authentication globally and redirects to login on `401 Unauthorized` sessions.

---

## 🛠️ Tech Stack

**Frontend:**

- **React.js (Vite)** - Fast, modern UI library.
- **Zustand** - Lightweight state management for Auth and Role tracking.
- **Axios** - Used interceptors for attaching token with every request.
- **React Toastify** - Real-time UI notifications for order updates.

**Backend:**

- **Node.js & Express** - Scalable server architecture.
- **MongoDB & Mongoose** - Document-based database for flexible order schemas.
- **WebSockets (`ws` library)** - Bi-directional communication for live updates.

---

## 📦 Local Installation & Setup

Follow these steps to run the project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shubhamnaik01/kotManager
cd kotManager
```

---

### 2️⃣ Install Dependencies

Install dependencies for both frontend and backend:

```bash
npm install --prefix backend
npm install --prefix frontend
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

### 4️⃣ Run the Application

Start backend and frontend in separate terminals:

#### ▶️ Start Backend

```bash
npm run start --prefix backend
```

#### ▶️ Start Frontend

```bash
npm run dev --prefix frontend
```

---

### 5️⃣ Access the App

Open your browser and go to:

```
http://localhost:5173
```

---

## 🔐 Default Roles (Example)

- **Admin** → Manage users
- **Counter** → Create orders
- **Kitchen** → Process orders (Default on Registration)

---

## ⚠️ Notes

- Frontend runs on `http://localhost:5173`
- WebSockets will automatically connect based on environment

---
