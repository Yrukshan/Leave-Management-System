# 📘 Leave Management System

A full-stack Leave Management System built using **Golang, React, and PostgreSQL** to automate employee leave requests and approvals.

---

## 🚀 Features :

### 👤 User Management :
- Register users (Admin / Manager / Employee)
- View, update, and delete users

### 📝 Leave Management :
- Apply for leave
- View personal leave history
- View all leaves (Admin/Manager)
- Search leaves

### ✅ Leave Approval :
- Approve or reject leave requests
- Track leave status (Pending / Approved / Rejected)

### 📊 Dashboard :
- Total users
- Total leaves
- Pending leaves
- Approved leaves

### 🔐 Authentication :
- JWT-based authentication
- Role-based access control

---

## 🛠️ Tech Stack :

### Backend :
- Golang (Gin Framework)
- JWT Authentication

### Frontend :
- React (Vite)
- Axios

### Database :
- PostgreSQL

---

## 📂 Project Structure :

leave-management-system/
│
├── backend/ # Golang API
├── frontend/ # React App
└── database/ # PostgreSQL (pgAdmin 4) 


---

## ⚙️ Installation & Setup :

### Clone Repository :

- git clone <your-repo-link>
- cd leave-management-system

### 🗄️ Database Setup :

- CREATE DATABASE leave_system;
- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

- CREATE TABLE leaves (
  id SERIAL PRIMARY KEY,
  user_id INT,
  leave_type TEXT,
  from_date TIMESTAMP,
  to_date TIMESTAMP,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  approved_by INT

);

### 🚀 Backend Setup :

- cd backend
- go mod tidy
- go run main.go
- http://localhost:8081

### 🌐 Frontend Setup :

- cd frontend
- npm install
- npm start
- http://localhost:3000

### 🔐 Authentication Flow :

1. User logs in via /login
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in headers: Authorization: Bearer <token>

### 🔌 API Endpoints :

-Example :

- Auth:
- POST /register
- POST /login
  
- Users :
- GET /users
- PUT /users/:id
- DELETE /users/:id
  
- Leaves : 
- POST /leaves
- GET /leaves
- GET /leaves/my
- GET /leaves/search?q=
- PUT /leaves/:id
- DELETE /leaves/:id
  
- Admin :
- PUT /admin/approve/:id
- PUT /admin/reject/:id

### 📸 Screenshot :
<br/>
<img width="1907" height="902" alt="Screenshot 2026-03-21 140412" src="https://github.com/user-attachments/assets/1e9d8802-6202-47d1-9a11-c92d944b5421" />
<br />

### ⚠️ Common Issues :

- Database Connection Error
- Ensure PostgreSQL is running
- Check credentials
- AllowOrigins : []string{"http://localhost:3000"}
- Token Issues : Ensure token is stored in localStorage, Check Authorization header

## 🎯 Future Improvements :

- Email notifications
- Calendar view
- File uploads (medical leave)
- Advanced analytics dashboard
- Responsive UI

## 👨‍💻 Author

- Rukshan Ekanayake...

## 📄 License

- This project is for educational and assessment purposes.

   
