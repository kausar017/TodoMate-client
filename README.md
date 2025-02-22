# 📝 TodoMate - Task Management App

TodoMate is a **Task Management Application**, where users can manage tasks by **Add, Edit, Delete, and Drag & Drop**.

---

🚀 **Live Link:** [https://todometeapp.netlify.app]

---

## 📢 **Features**

✅ **Firebase Authentication** (Google Sign-In)  
✅ **Add, Edit, Delete & Drag & Drop Tasks**  
✅ **Tasks Categorized: To-Do, In Progress, Done**  
✅ **Real-time Updates (WebSockets / Change Streams)**  
✅ **Fully Responsive (Mobile & Desktop)**  
✅ **Dark Mode Toggle (Bonus Feature)**

---

## 🛠 **Technologies Used**

| Technology                     | Description         |
| ------------------------------ | ------------------- |
| **React.js (Vite)**            | Frontend Framework  |
| **Firebase Auth**              | User Authentication |
| **Express.js**                 | Backend API         |
| **MongoDB Atlas**              | Database            |
| **Socket.io / Change Streams** | Real-time Sync      |
| **Tailwind CSS**               | UI Design           |
| **react-beautiful-dnd**        | Drag & Drop System  |

---

## 📦 **Dependencies**

👉 **Frontend:**

```json
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.11.2",
  "firebase": "^9.0.0",
  "axios": "^1.4.0",
  "react-beautiful-dnd": "^13.1.0"
}
```

## 🏗 Backend

🔥 API Endpoints (Backend)
Method | Endpoint |Description
POST   | /tasks   | Add a new task
GET    |/tasks    |Get all tasks
PUT    | /tasks/:id | Update task
DELETE | /tasks/:id | Delete task
