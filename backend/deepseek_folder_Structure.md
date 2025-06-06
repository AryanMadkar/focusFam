backend/
├── config/
│   ├── database.js          # MongoDB connection setup
│   ├── cloudinary.js        # For video thumbnail uploads
│   └── ai.js                # AI service configurations
│
├── controllers/
│   ├── authController.js    # User auth (login/register)
│   ├── userController.js    # Profile, rating, follow system
│   ├── sessionController.js # Study sessions management
│   ├── videoController.js   # YouTube video processing
│   ├── leaderboardController.js 
│   ├── chatController.js    # Break-time chat
│   └── aiController.js      # AI bots endpoints
│
├── models/
│   ├── User.js              # User schema (rating, followers, sessions)
│   ├── StudySession.js      # Session schema (video, participants, timers)
│   ├── Leaderboard.js       # Weekly rankings
│   └── Chat.js              # Break chat messages
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── sessionRoutes.js
│   ├── aiRoutes.js
│   └── index.js             # Consolidated routes
│
├── services/
│   ├── ai/
│   │   ├── InterviewBot.js  # Mock interview service
│   │   ├── MCQGenerator.js  # Quiz question generator
│   │   └── ProblemSolver.js # Step-by-step solutions
│   │
│   ├── sessionService.js    # Focus session logic
│   ├── ratingService.js     # Rating penalty calculations
│   ├── youtubeService.js    # Video metadata extraction
│   └── notificationService.js # Real-time alerts
│
├── utils/
│   ├── authMiddleware.js    # JWT verification
│   ├── focusTimer.js        # Pomodoro timer logic
│   ├── ratingCalculator.js  # Rating algorithms
│   ├── validation.js        # Request validation
│   └── errorHandler.js      # Custom error handling
│
├── .env                     # Environment variables
├── server.js                # Entry point
└── package.json