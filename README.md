# Burger King 🍔 — Restaurant Listing App

A React-based food-delivery style web app (inspired by Swiggy's UI/UX) that lets users pick a city, browse nearby restaurants with live data, search through them, and sign up/log in before accessing the app.

## Features

- 🔐 **Authentication** — Email/password sign up & login via Firebase Auth, with protected routes
- 🏙️ **City selection** — Switch between multiple cities (Mumbai, Hyderabad, Bangalore, Delhi, Proddatur, Tadepalligudem) to fetch location-specific restaurant data
- 🍽️ **Live restaurant listing** — Fetches real restaurant data (name, rating, delivery time, cuisines, cost, images) via a backend proxy
- 🔍 **Search** — Client-side search/filter by restaurant name
- 💀 **Shimmer UI** — Skeleton loading placeholders while data is being fetched
- 🌐 **Multi-language support** — Language selector wired through the app
- 📱 **Responsive design** — Built with Tailwind CSS
- ❓ **Help & About pages**

## Tech Stack

**Frontend**
- [React 18](https://react.dev/) (Vite)
- [React Router v6](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for HTTP requests
- [Firebase](https://firebase.google.com/) (Authentication + Analytics)
- [Heroicons](https://heroicons.com/) for icons

**Backend**
- A lightweight proxy server (deployed separately) that forwards restaurant-listing requests to the upstream data provider and returns CORS-friendly JSON

**Deployment**
- Static frontend hosted on [Render](https://render.com/) (`render.yaml` included)
- Firebase project for auth & analytics

## Project Structure

```
Burger_king/
├── public/                    # Static assets
├── src/
│   ├── assets/                 # Images
│   ├── components/
│   │   ├── About.jsx
│   │   ├── AccordionItem.jsx
│   │   ├── CitySelection.jsx
│   │   ├── ConfigDrivenRestaurants.jsx   # Search + renders restaurant cards
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Help.jsx
│   │   ├── Login.jsx
│   │   ├── ProtectedRoute.jsx  # Route guard for authenticated pages
│   │   ├── RestaurantCard.jsx  # Individual restaurant card UI
│   │   ├── SearchBar.jsx
│   │   ├── Shimmer.jsx         # Loading skeleton
│   │   ├── SignUp.jsx
│   │   └── useFetchRestaurants.jsx   # Custom hook — fetches restaurant data
│   ├── utils/
│   │   ├── faqConfig.js
│   │   └── langConfig.js
│   ├── firebase.js             # Firebase config & auth setup
│   ├── restaurantConfig.json   # Config-driven card field mapping
│   ├── App.jsx                 # Routes & app shell
│   ├── main.jsx                # Entry point
│   └── index.css
├── .firebaserc
├── firebase.json
├── render.yaml                 # Render deployment config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## How It Works

1. On load, `App.jsx` sets up routes (`/`, `/login`, `/signup`, `/help`, `/about`) and gates `/` and `/about` behind `ProtectedRoute`.
2. The `Home` page lets the user pick a city from a dropdown; each city maps to a fixed `lat`/`lng`.
3. The `useFetchRestaurants` hook calls the proxy API:
   ```
   GET https://proxy-server-t6hm.onrender.com/api/restaurants?lat={lat}&lng={lng}&page_type=DESKTOP_WEB_LISTING
   ```
4. While the request is in flight, shimmer skeleton cards are shown.
5. Once data arrives, `ConfigDrivenRestaurants` filters the response and renders a grid of `RestaurantCard` components, each showing image, name, rating, delivery time, cuisines, and area.
6. A search bar lets users filter the currently loaded restaurants by name in real time.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

```bash
git clone https://github.com/JAGADESH938/Burger_king.git
cd Burger_king
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=https://proxy-server-t6hm.onrender.com/api
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for [Render](https://render.com/) via `render.yaml`:

```yaml
services:
    - type: web
      name: react-frontend
      env: static
      buildCommand: npm install && npm run build
      staticPublishPath: dist
      envVars:
          - key: VITE_API_URL
            value: https://proxy-server-t6hm.onrender.com/api
```

Push to the connected repository and Render will build and serve the `dist/` folder automatically.

## Notes / Known Limitations

- Authentication state (`isAuthenticated`) is held in local React state rather than synced with Firebase's `onAuthStateChanged`, so a page refresh will log the user out even if the Firebase session is still valid.
- The restaurant data depends on an external proxy service; if that service is down or rate-limited, the listing will fail to load.
- City coordinates are currently hardcoded rather than derived from live geolocation.

## License

No license specified. Add a `LICENSE` file if you intend to open-source this project.
