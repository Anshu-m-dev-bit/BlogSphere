# 📝 BlogSphere

## 🌐 Overview
**BlogSphere** is a modern blogging platform built using **React.js**, designed to allow users to create, publish, and manage blog posts through a clean and intuitive interface. The project simulates a real-world blogging application by integrating authentication, database management, file storage, rich text editing, and form handling using modern tools and best practices.

BlogSphere focuses on scalability, maintainability, and user experience, making it a strong foundation for a full-stack web application.

---
## 🌐 Live Website
👉 [Click here](https://blogsphere.appwrite.network/)


## 🚀 Features
- User authentication (sign up, login, logout)
- Create, edit, and delete blog posts
- Rich text editor for writing blog content
- Image upload and storage
- Clean and responsive UI
- Smooth client-side navigation
- Secure backend services using BaaS

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – Component-based UI development
- **JavaScript (ES6+)** – Application logic
- **HTML5 & CSS3** – Structure and styling
- **Tailwind CSS** *(if applicable)* – Utility-first responsive styling

### Backend (BaaS)
- **Appwrite** – Authentication, database, and file storage

---

## 📦 Dependencies & Why They Are Used

### 🔐 Appwrite (Backend-as-a-Service)
Appwrite is used as the backend to handle:
- User authentication and authorization
- Database operations for storing blog posts
- File storage for blog images
- Secure API-based backend services without managing a custom server

---

### ✍️ TinyMCE
- Provides a powerful **rich text editor** for writing blogs
- Supports formatting, headings, links, lists, and media
- Improves the overall writing experience significantly

---

### 🧾 react-hook-form
- Efficient form state management and validation
- Minimizes re-renders for better performance
- Used for authentication forms and blog creation/editing forms

---

### 🧭 react-router-dom
- Enables client-side routing
- Allows smooth navigation between pages without full reloads
- Improves user experience and application flow

---

### 📚 Other Supporting Tools
- **@appwrite/sdk** – JavaScript SDK to interact with Appwrite services
- **dotenv** – Securely manages environment variables
- **Vite / CRA** – Fast development environment and optimized builds

---

## 📁 Project Structure
```txt
BlogSphere/
│── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── services/         # Appwrite service logic
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Application entry point
│── public/
│── .env
│── package.json
│── README.md
---
```
### ⚠️ Important Note (Appwrite Limitation)

- Currently, blog images are **not visible in the post preview cards**.  
- This is due to a limitation of **Appwrite’s free tier**, which does not support the `getFilePreview` feature required for rendering images in preview mode.

**Additional Details:**
- Image uploads and storage work correctly.
- The limitation only affects preview rendering.
- This behavior is expected under the free plan.

To address this limitation and improve scalability, the project is planned to be migrated to **Firebase** or **Supabase** in a future update.

---

## 📚 What This Project Demonstrates
- Real-world React application architecture  
- Integration of Backend-as-a-Service (Appwrite)  
- Secure authentication and database usage  
- Rich content creation using TinyMCE  
- Efficient form handling with react-hook-form  
- Clean, scalable, and maintainable codebase  

---

## 🔮 Future Enhancements
- Migration to **Firebase** or **Supabase**
- Image preview support in blog cards
- Comment system
- Like and bookmark functionality
- Role-based access control
- SEO optimization
- Dark mode support

---

