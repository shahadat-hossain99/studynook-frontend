<div align="center">

<img src="https://studynook-frontend-go-beyound.vercel.app/_next/image?url=%2Fnavbar.png&w=384&q=75" alt="StudyNook Logo" height="60" />

# StudyNook — Smart Study Room Booking Platform

**Where Focus Finds its Place. Book your study room in seconds.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-studynook.vercel.app-4F46E5?style=for-the-badge&logo=vercel&logoColor=white)](https://studynook-frontend-go-beyound.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**StudyNook** is a modern library study room booking platform built for students, researchers, and academic collaborators. It eliminates the hassle of walk-in queues and double bookings by letting users discover, filter, and reserve fully-equipped study spaces in real time — all in under a minute.

> 120+ Study Rooms · 5,000+ Active Students · 24/7 Room Access

---

## ✨ Features

### 👤 For Users

- 🔑 **Google OAuth Authentication** via BetterAuth with JWT verification
- 🔍 **Browse & Search Rooms** — search by name, filter by amenities, sort by price or newest
- ⚡ **Real-time Booking** — select date, start/end time with automatic cost calculation
- 🚫 **Conflict Detection** — prevents double bookings on the same room and time slot
- 📋 **My Bookings** — view all personal bookings with status badges
- ❌ **Cancel Booking** — confirm cancellation with instant UI update

### 🏠 For Room Owners

- ➕ **Add Rooms** — create listings with name, image, floor, capacity, hourly rate, amenities
- 📁 **My Listings** — view and manage all rooms you've created
- ✏️ **Edit Room** — update room details with pre-filled form
- 🗑️ **Delete Room** — confirmation modal with cascade deletion of associated bookings
- 🔢 **Booking Count** — live counter that increments/decrements with bookings

### 🌐 General

- 🏷️ **Dynamic Page Titles** — every route has a meaningful browser tab title
- 📱 **Responsive Design** — works on mobile, tablet, and desktop
- 🪹 **Empty States** — friendly UI when no rooms or bookings are found
- 🔔 **Toast Notifications** — success and error feedback on every action
<!-- - 🔍 **Browse & Filter Rooms** — Search by capacity, floor, amenities (Wi-Fi, projector, whiteboard, AC), and hourly rate
- ⚡ **Real-Time Slot Booking** — Live availability calendar with zero double-booking conflicts
- 🏢 **Room Listings Management** — Add your own rooms, manage listings, and track occupancy
- 📅 **My Bookings Dashboard** — View, cancel, or reschedule upcoming and past reservations
- 🔐 **Secure Authentication** — Powered by [Better Auth](https://better-auth.com/) with MongoDB adapter (login, register, session management)
- 🎟️ **Membership & Subscription Plans** — Monthly and semester plans with discounted rates and priority access
- 💬 **Testimonials & FAQ** — Real student reviews and a comprehensive 7-question FAQ section
- 📱 **Fully Responsive UI** — Seamless experience across mobile, tablet, and desktop -->

---

## 🛠️ Tech Stack

### 🎨 Frontend

| 🔧 Technology         | 📦 Version | 🎯 Purpose                          |
| --------------------- | ---------- | ----------------------------------- |
| ⚛️ Next.js            | 16.2.6     | React framework with App Router     |
| 🖼️ React              | 19.2.4     | UI library                          |
| 🎨 Tailwind CSS       | v4         | Utility-first styling               |
| 🧩 HeroUI             | 3.0.5      | Component library                   |
| 🔐 BetterAuth         | 1.6.11     | Authentication (Google OAuth + JWT) |
| 🎞️ Framer Motion      | 12.40.0    | Animations & transitions            |
| 🌊 Lenis              | 1.3.23     | Smooth scroll experience            |
| 🖱️ Swiper             | 12.1.4     | Carousel / slider                   |
| 🔔 React Toastify     | 11.1.0     | Toast notifications                 |
| 🏃 React Fast Marquee | 1.6.5      | Scrolling marquee                   |
| 🎭 React Icons        | 5.6.0      | Icon library                        |

### 🖥️ Backend

| 🔧 Technology        | 🎯 Purpose                      |
| -------------------- | ------------------------------- |
| 🟢 Node.js + Express | REST API server                 |
| 🍃 MongoDB (Atlas)   | Database                        |
| 🔑 jose-cjs          | JWT verification via JWKS       |
| 🌐 CORS              | Cross-origin request handling   |
| 📦 dotenv            | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+** recommended
- npm, yarn, pnpm, or bun
- A MongoDB instance (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahadat-hossain99/studynook-frontend.git
cd studynook-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your MongoDB URI and Better Auth secrets (see Environment Variables below)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env.local` file. It is already listed in `.gitignore`.

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run the production build
npm run lint     # Run ESLint checks
```

---

## 📁 Project Structure

```
studynook-frontend/
├── public/               # Static assets (images, icons, fonts)
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   │   ├── (auth)/       # Login & Register routes
│   │   ├── rooms/        # Room listing & detail pages
│   │   ├── add-room/     # Add new room page
│   │   ├── my-listings/  # User's room management
│   │   ├── my-bookings/  # User's booking history
│   │   └── ...           # About, Contact, Support, Privacy, Terms
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities, auth config, DB connection
│   └── styles/           # Global CSS / Tailwind config
├── .env.local            # Environment variables (not committed)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.mjs   # Tailwind CSS configuration
└── package.json
```

---

## 🌐 Live Demo

Visit the live site: **[https://studynook-frontend-go-beyound.vercel.app](https://studynook-frontend-go-beyound.vercel.app/)**

| Page         | URL            |
| ------------ | -------------- |
| Home         | `/`            |
| Browse Rooms | `/rooms`       |
| Room Detail  | `/rooms/[id]`  |
| Add a Room   | `/add-room`    |
| My Listings  | `/my-listings` |
| My Bookings  | `/my-bookings` |
| About        | `/about`       |
| Contact      | `/contact`     |
| Support      | `/support`     |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code passes the ESLint checks (`npm run lint`) before submitting.

---

## 📬 Contact

Have questions or feedback? Reach out:

- 📧 **Email:** support@studynook.com
- 📞 **Phone:** +880 1234-567890
- 🌍 **Website:** [studynook-frontend-go-beyound.vercel.app](https://studynook-frontend-go-beyound.vercel.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Shahadat Hossain](https://github.com/shahadat-hossain99)

⭐ If you find this project helpful, please consider giving it a star!

</div>
