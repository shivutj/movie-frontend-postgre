# Movie Recommendation App

A MERN stack application that provides AI-powered movie recommendations using OpenRouter API.

## Features

- AI-powered movie recommendations
- SQLite database to store recommendation history
- Clean and simple UI
- OpenRouter API integration

## Project Structure

```
movie-recommender/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── recommendations.db (created automatically)
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API key (get it from https://openrouter.ai/keys)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend folder:

```bash
OPENROUTER_API_KEY=your_api_key_here
PORT=5001
SITE_URL=http://localhost:3000
```

Replace `your_api_key_here` with your actual OpenRouter API key from https://openrouter.ai/keys

4. Start the backend server:

```bash
npm start
```

The backend will run on http://localhost:5001

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend will run on http://localhost:3000

## Usage

1. Make sure your `.env` file in the backend folder has your OpenRouter API key
2. Start both backend and frontend servers
3. Open http://localhost:3000 in your browser
4. Enter your movie preference (e.g., "action movies with a strong female lead")
5. Click "Get Recommendations" to receive 5 movie suggestions

No need to manually enter the API key in the UI anymore - it's securely stored in the backend!

## Database Schema

The SQLite database stores recommendations with the following schema:

```sql
CREATE TABLE recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_input TEXT NOT NULL,
  recommended_movies TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### POST /api/recommendations

Save a new recommendation

Request body:

```json
{
  "user_input": "action movies",
  "recommended_movies": [...]
}
```

### GET /api/recommendations

Get the last 10 recommendations

## Technologies Used

- Frontend: React, Lucide Icons
- Backend: Node.js, Express
- Database: SQLite3
- API: OpenRouter (OpenAI compatible)

## Notes

- The app uses OpenRouter's GPT-4o-mini model by default
- API key is stored securely in the backend `.env` file
- API calls are made from the backend to OpenRouter
- Recommendation history is stored in the backend database
- Never commit your `.env` file to Git (it's in .gitignore)

## Git Setup

To connect this to your Git repository:

```bash
git init
git add .
git commit -m "Initial commit: Movie recommendation app"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Deployment Options

- Frontend: Vercel, Netlify
- Backend: Render, Railway, Heroku

For deployment, make sure to:

1. Set environment variables for production
2. Update the API URL in the frontend
3. Configure CORS properly for production domain
