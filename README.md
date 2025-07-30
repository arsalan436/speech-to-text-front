# Speech-to-Text App – Frontend

This is the frontend of my Speech-to-Text web app. It is built using React and Tailwind CSS. It allows users to upload or record audio, get transcriptions, and view their past history.

## 🧾 Features

- User sign-up and login using Supabase Auth.
- Record audio using the browser.
- Upload audio files.
- View live transcription result.
- Save transcription to the database.
- View previously saved transcriptions.
- Clean and simple UI with Tailwind.

## 🧰 Tech Stack

- React
- Tailwind CSS
- Axios
- Supabase Auth + Database

## 🛠 Setup Instructions

1. Go to the `frontend/` folder.

2. Install dependencies:

npm install

    Create a .env file in the frontend/ folder:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

    Start the frontend:

npm run dev

It will run at http://localhost:5173 (or similar).
🔗 Supabase Auth Integration

    The app checks if the user is logged in.

    If logged in, they can go to the main app (/body route).

    If not, they are asked to log in or sign up.

    After logging in, user info is used to save and fetch their data.

✅ To-Do

    Add deployment instructions once deployed (coming soon).
