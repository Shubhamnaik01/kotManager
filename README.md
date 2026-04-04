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
