School Directory Mini Project

This is a Next.js
 project bootstrapped with create-next-app
 and integrated with MySQL to manage school data.

Features (CRUD)

This project implements full CRUD functionality for school data:

Add School – Input and store school data in the database, including image upload.

Show Schools – Fetch and display schools in a card layout similar to an e-commerce product listing.

Update School – Edit existing school details.

Delete School – Remove a school from the database.

Tech Stack

Frontend: Next.js, React

Backend & Database: MySQL

Form Handling: react-hook-form

Image Storage: Local folder /public/schoolImages

Deployment: MySQL database hosted on Railway, Next.js hosted on Vercel

MySQL Table Structure
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT,
    email_id TEXT NOT NULL
);

Getting Started

First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open http://localhost:3000
 in your browser to see the app.

You can start editing the page by modifying app/page.js or any page under pages/. The page auto-updates as you edit the file.

Live Demo

Deployed on Vercel: https://data-school.vercel.app



Learn More

To learn more about Next.js, check out the following resources:

Next.js Documentation

Learn Next.js
 - interactive tutorial

Next.js GitHub Repository

Deployment

Next.js App: Deployed on Vercel

MySQL Database: Hosted on Railway
