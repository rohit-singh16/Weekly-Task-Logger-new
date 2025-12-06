🌌 Meteoros — Weekly Task Logger

A premium Aurora-themed productivity app with animated neon UI, task management, and geolocation-powered login tracking.

Project Demo Link - https://sprightly-eclair-a731b8.netlify.app/

✨ Overview

Meteoros is a beautifully crafted, modern task logging application built with React + TypeScript + Vite, designed with a premium Aurora-inspired UI, neon-glass components, smooth animations, and professional-quality UX.

It logs:

🕒 Login Time

💻 Device Information

📍 Geolocation + Reverse Address Lookup

Users can then create, edit, delete, and view their weekly tasks in a stunning, reactive interface.

🚀 Features
🎨 Premium Aurora UI

Dynamic Aurora background waves

Reactive neon borders

Animated cursor glow

Particle effects

Glassmorphism containers

📝 Task Management

Add tasks

Edit tasks

Delete tasks (with slide-away animations)

Category tag support

Auto-sort animation

📦 Stored Data Modal

Collapsible sections

Premium neon-boxed cards

Timeline-like login info

Smooth open/close transitions

🌍 Smart Login Tracking

Timestamp

Device user agent

Latitude & longitude

Reverse geocoded location name

⚡ Tech Stack

React 18

TypeScript

Vite

CSS Aurora UI + Neon Glass Effects

LocalStorage

OpenStreetMap Nominatim API (Reverse Geocode)

🖥️ Live Demo

👉 Netlify Deployment:

https://YOUR-NETLIFY-URL.netlify.app/


👉 GitHub Repository:

https://github.com/YOUR-USERNAME/meteoros-task-logger

📸 Screenshots
🔐 Login Page

Neon glass card

Aurora effects

Animated preview icons

📋 Task Manager

Add/edit/delete tasks

Hover glow animations

Slide-in task entry motion

📦 Stored Data Modal

Timeline layout for login information

Task cards with neon reactive glow

Collapsible sections

(Add actual screenshots after deployment)

🛠️ Installation
git clone https://github.com/YOUR-USERNAME/meteoros-task-logger
cd meteoros-task-logger
npm install
npm run dev

📦 Build for Production
npm run build


Your production-ready output will appear in:

dist/

🌐 Deploy on Netlify (No GitHub Required)

Build first:

npm run build


Then drag & drop dist/ to:

👉 https://app.netlify.com/drop

Your site goes live instantly.

⚙️ Vite Config Fix (Required for Deployment)
export default defineConfig({
  base: "./",
  plugins: [react()]
})


This ensures all assets load correctly on Netlify or GitHub Pages.

📁 Project Structure
src/
 ├─ components/
 │   ├─ Login.tsx
 │   ├─ TaskManager.tsx
 ├─ utils/
 │   ├─ geocode.ts
 │   ├─ storage.ts
 ├─ App.tsx
 ├─ main.tsx
 ├─ index.css
public/
dist/ (after build)

🧠 Core Concepts Used

React state management

Component architecture

Collapsible UI elements

CSS animations + transitions

Geolocation API

Reverse geocoding

LocalStorage persistence

Vite bundling & asset pipeline

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page
.

📄 License

This project is licensed under the MIT License.

⭐ Support

If you like this project…

Give it a star ⭐ on GitHub!
It motivates future UI upgrades, animations, and more Aurora effects.
