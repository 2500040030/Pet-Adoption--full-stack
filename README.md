# PS40 — Pet Adoption Platform

A full-stack pet adoption platform built with React + Vite, Node.js + Express, MongoDB, JWT authentication, and responsive CSS.

## Features

- User registration/login/logout
- Browse, search and filter pets
- Pet details and health information
- Favorites
- Adoption applications
- Application status tracking
- Shelter dashboard for pet management
- Shelter application review
- Admin dashboard
- LocalStorage for token/session and favorites
- MongoDB persistence
- Responsive UI using CSS Grid/Flexbox
- GitHub Actions CI workflow

## Requirements

- Node.js 18+
- MongoDB 6+ (local) or MongoDB Atlas
- npm

## 1. Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

On Linux/macOS:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pet_adoption
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

The API runs at `http://localhost:5000`.

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## 3. Seed demo data

After MongoDB is running and the backend is configured:

```bash
cd backend
npm run seed
```

Demo accounts:

- Admin: `admin@petadopt.com` / `Admin@123`
- Shelter: `shelter@petadopt.com` / `Shelter@123`
- Adopter: `user@petadopt.com` / `User@123`

## Project structure

```text
pet-adoption/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── .github/workflows/ci.yml
└── README.md
```

## Notes

This project intentionally uses image URLs instead of binary image uploads so it can run immediately without Cloudinary. A production version can replace the URL field with Cloudinary/S3 upload handling.

For a hackathon demo, the included seed data and role-based dashboards provide a complete working flow.
