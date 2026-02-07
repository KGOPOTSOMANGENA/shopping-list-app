🛒 Shopping List App — React + TypeScript

Title: Task 5 – Shopping List App
Submission Date: 26 August 2025
Time: 09:00 AM
Student: Kgopotso Remember
Tech Stack: React, TypeScript, Redux, JSON Server

📌 Project Overview

This project is a Shopping List Web Application built with React and TypeScript, using Redux for state management and JSON Server for data persistence.

The application allows users to register, login, manage their profile, and create, update, delete, search, and sort shopping lists while maintaining proper authentication, protected routing, and URL-based filtering.

🎯 Objective

Build a shopping list application that allows users to:

Register and login securely

Manage their profile and credentials

Create and manage multiple shopping lists

Search and sort items dynamically

Persist data using JSON Server

Use Redux for global state management

Follow proper navigation and protected routing practices

📄 Pages Implemented

✅ Login Page

✅ Registration Page

✅ Home / Dashboard Page

✅ Profile Page

✅ 404 Not Found Page

🔐 User Management Features
Authentication

Users can register with:

Email

Password

Name

Surname

Cell Number

Login with encrypted credentials

Password encryption for security

Authorization

Protected routes prevent unauthorized access

Logged-in users cannot access login/register pages

Profile Management

View profile

Update personal details

Update login credentials

Success notifications after profile updates

🛍️ Shopping List Features
CRUD Operations

➕ Add shopping list items

📄 View shopping lists

✏️ Edit shopping lists

❌ Delete shopping lists and items

Item Details

Name

Quantity

Optional notes

Category

Item images

Search & Filtering

Search by item name

Search keyword syncs with URL

UI updates when URL search changes

Sorting

Sort items by:

Name

Category

Date added

Sorting updates URL dynamically
Users can edit URL to update sorting view

🏷️ Categories & Tags

Items can be categorized

Categories improve list organization

🔗 Sharing Feature

Users can share shopping lists with others

📦 Data Management
Persistence

JSON Server stores user and shopping list data

State Management

Redux manages global application state

Performance

Optimized UI rendering

Efficient Redux state updates

🔒 Security & Privacy

Protected routes

Encrypted credentials

Secure user data handling

🎨 UI & UX Features

Responsive design

Interactive hover effects

Cursor changes on clickable elements

Visual feedback and notifications

Smooth navigation between pages

Consistent typography and colors

📱 Responsiveness Breakpoints

Optimized for:

320px

480px

768px

1024px

1200px

🧩 React Best Practices Used

Reusable components

Props-based customization

Redux state management

Modular project structure

Class components included

Clean and readable code

🗂️ Project Structure (Example)
src/
 ├── app/
 ├── components/
 ├── features/
 ├── hooks/
 ├── pages/
 ├── routes/
 ├── services/
 ├── styles/
 ├── types/
 └── App.tsx

⚙️ How to Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/KGOPOTSOMANGENA/shopping-list-app.git

2️⃣ Navigate Into the Project Folder
cd shopping-list-app

3️⃣ Install Dependencies
npm install

4️⃣ Start JSON Server (Backend)

Make sure your db.json file exists, then run:

npx json-server --watch db.json --port 5000


Your API will run on:

http://localhost:5000

5️⃣ Start the React App (Frontend)

Open a new terminal and run:

npm run dev


The app will run on:

http://localhost:5173
