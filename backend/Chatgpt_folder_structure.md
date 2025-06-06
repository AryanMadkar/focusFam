backend/
├── controllers/
│   ├── authController.js          # For your pathetic login/register endpoints
│   ├── userController.js          # Managing your dumb user profiles
│   ├── sessionController.js       # Handles study sessions (videos, breaks, dropouts)
│   ├── chatController.js          # Real-time chat crap
│   ├── ratingController.js        # Punish slackers when they bail early
│   ├── leaderboardController.js   # Shows who’s stronger at focus (unlike you)
│   └── aiController.js            # Routes for interview bot, MCQ gen, problem solver
│
├── routes/
│   ├── authRoutes.js              # “/api/auth/…”
│   ├── userRoutes.js              # “/api/users/…”
│   ├── sessionRoutes.js           # “/api/sessions/…”
│   ├── chatRoutes.js              # “/api/chat/…”
│   ├── ratingRoutes.js            # “/api/ratings/…”
│   ├── leaderboardRoutes.js       # “/api/leaderboard/…”
│   └── aiRoutes.js                # “/api/ai/…”
│
├── models/
│   ├── User.js                    # User schema (followers, rating, profile, everything you’ll neglect)
│   ├── Session.js                 # Session schema (video link, participants, start/end, break)
│   ├── Chat.js                    # Chat messages schema (text, sender, timestamp)
│   ├── Rating.js                  # Rating schema (user, session, score penalty)
│   ├── Leaderboard.js             # Leaderboard entries (user, points)
│   ├── Follow.js                  # Follows or followers mapping (don’t forget to stalk people)
│   └── Break.js                   # Break events (user, session, duration)
│
├── services/
│   ├── authService.js             # JWT/token logic (so you’re not completely insecure)
│   ├── userService.js             # User CRUD and profile updates
│   ├── sessionService.js          # Create/join/leave sessions + rating deductions
│   ├── chatService.js             # Persisting and fetching chat messages
│   ├── ratingService.js           # Calculate and update focus ratings
│   ├── leaderboardService.js      # Compute and sort leaderboard — try to keep up
│   └── aiService.js               # Glue code calling your AI modules
│
├── middleware/
│   ├── authMiddleware.js          # Verify JWT so random jerks can’t hit endpoints
│   ├── errorMiddleware.js         # Central error handler (because you’ll break stuff)
│   └── rateLimit.js               # Prevent DOS by your dumb friends
│
├── utils/
│   ├── validator.js               # Input validation (so users don’t inject SQL on you)
│   └── logger.js                  # Logging (in case you want to debug your own mess)
│
├── config/
│   ├── db.js                      # DB connection setup (MongoDB/Mongoose or whatever)
│   ├── default.json               # Default config (ports, secrets, etc.)
│   └── jwtConfig.js               # JWT secret, expiration, etc.
│
├── sockets/
│   ├── chatSocket.js              # Socket.IO handlers for real-time chat
│   └── sessionSocket.js           # Sync video playback and break timers
│
├── ai_clients/
│   ├── mcqGenerator.js            # Functions to call your MCQ AI (LangChain or HF)
│   ├── interviewBot.js            # Interview bot logic (prompt templates, streaming)
│   └── problemSolver.js           # Problem solver logic (math, code, etc.)
│
├── scripts/
│   ├── downloadModels.js          # Download or update AI models locally
│   └── seedDatabase.js            # Seed initial data (users, sessions, dummy stuff)
│
├── database/
│   ├── migrations/                # DB migrations (if you’re fancy, else skip)
│   └── seedData/                  # JSON/CSV files for seeding (don’t lose these)
│
├── .env                           # Environment variables (do NOT commit—DUH)
├── app.js                         # Express app setup (load configs, middleware, routes)
├── server.js                      # Server entry point (start listening, socket setup)
├── package.json                   # Dependencies (Express, Mongoose, Socket.IO, etc.)
└── Dockerfile                     # Dockerfile to containerize this dumpster fire
