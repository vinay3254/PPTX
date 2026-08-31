# etherx-ppt

A full-stack web application with React frontend and Node.js/Express backend.

## Project Structure

```
etherx-ppt/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React context providers
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── server/                  # Backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Data models
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── .env                     # Environment variables
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

**Development Mode:**

```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm run dev
```

The client typically runs on `http://localhost:5173`
The server typically runs on `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory based on `.env.example` (or use the provided .env file). Update the values according to your configuration.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express
- PostgreSQL (or your preferred database)

## License

MIT
