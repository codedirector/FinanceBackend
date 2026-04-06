# 💰 Finance Data Processing & Access Control Backend

## 📌 Overview
This project is a backend system for a finance dashboard that manages financial records and provides summary analytics based on user roles.

It supports user and role management with role-based access control (RBAC), allowing different levels of access for admins, analysts, and viewers. The system enables secure handling of financial data and provides aggregated insights for dashboard visualization.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## ⚙️ Features

### 👤 User & Role Management
- Create and manage users (Admin only)
- Assign roles: `admin`, `analyst`, `viewer`
- Manage user status (active/inactive)

### 🔐 Role-Based Access Control
- Admin: Full access (users + records)
- Analyst: Read access + dashboard insights
- Viewer: Read-only access

### 💰 Financial Records
- Create, update, delete records (Admin only)
- View records (All roles)
- Filter records by:
  - Date
  - Category
  - Type (income/expense)

### 📊 Dashboard APIs
- Total income
- Total expenses
- Net balance
- Category-wise breakdown
- Recent transactions
- Monthly trends (optional)

### 🛡️ Validation & Error Handling
- Input validation
- Proper HTTP status codes
- Error handling middleware

---

## 🔗 API Documentation
Public API documentation (Postman):

👉 https://documenter.getpostman.com/view/45102921/2sBXiqG9MH

---

## 🧪 API Testing

A Postman collection is included in the repository.

### Steps:
1. Import the collection into Postman
2. Run the backend locally
3. Set base URL:
