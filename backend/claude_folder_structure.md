backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js          # User registration/login
│   │   ├── userController.js          # Profile/image upload
│   │   ├── courseController.js        # Course selection/handling
│   │   ├── aiController.js            # AI recommendations
│   │   ├── videoController.js         # YouTube video handling
│   │   ├── roomController.js          # Study room management
│   │   ├── focusController.js         # Focus tracking & scoring
│   │   ├── socialController.js        # Tinder-style matching
│   │   ├── doubtController.js         # Doubt solving bot
│   │   └── gamificationController.js  # Points & leaderboards
│   │
│   ├── models/
│   │   ├── User.js                    # User profile + image
│   │   ├── Course.js                  # User's selected courses
│   │   ├── Recommendation.js          # AI recommendations
│   │   ├── Video.js                   # YouTube video metadata
│   │   ├── Room.js                    # Study room config (locked/open)
│   │   ├── FocusSession.js            # Focus tracking data
│   │   ├── Match.js                   # Tinder-style matches
│   │   ├── Doubt.js                   # Doubt questions/responses
│   │   └── Score.js                   # Gamification points
│   │
│   ├── routes/
│   │   ├── auth.js                    # POST /register, /login
│   │   ├── users.js                   # PUT /profile, /profile/image
│   │   ├── courses.js                 # POST /courses/select
│   │   ├── ai.js                      # GET /recommendations
│   │   ├── videos.js                  # GET /videos?subject=math
│   │   ├── rooms.js                   # POST /rooms/create, /rooms/join
│   │   ├── focus.js                   # POST /focus/start, /focus/end
│   │   ├── social.js                  # GET /matches, POST /matches/swipe
│   │   ├── doubts.js                  # POST /doubts/ask
│   │   └── scores.js                  # GET /leaderboard
│   │
│   ├── services/
│   │   ├── authService.js             # JWT handling
│   │   ├── userService.js             # Profile management
│   │   ├── courseService.js           # Course processing
│   │   ├── aiService.js               # Recommendation logic
│   │   ├── youtubeService.js          # YouTube API integration
│   │   ├── roomService.js             # Room creation/joining
│   │   ├── focusService.js            # Focus scoring algorithm
│   │   ├── matchService.js            # Matching algorithm
│   │   ├── doubtService.js            # Doubt bot processing
│   │   ├── storageService.js          # Image uploads (AWS S3)
│   │   └── scoreService.js            # Points calculation
│   │
│   ├── utils/
│   │   ├── focusMonitor.js            # Tab change detection
│   │   ├── emergencyExit.js           # Emergency exit handling
│   │   ├── roomLimiter.js             # Max users per room (5)
│   │   ├── youtubeParser.js           # Video ID extraction
│   │   ├── penaltyCalculator.js       # Score reduction logic
│   │   ├── breakScheduler.js          # Break timing management
│   │   ├── jwt.js                     # Token utilities
│   │   └── constants.js               # MAX_USERS_PER_ROOM=5, etc.
│   │
│   ├── middleware/
│   │   ├── auth.js                    # Authentication
│   │   ├── roomAuth.js                # Room access control
│   │   ├── focusCheck.js              # Session validation
│   │   └── aiRateLimit.js             # AI request limiting
│   │
│   ├── websocket/
│   │   ├── socketServer.js            # WebSocket server
│   │   ├── roomSync.js                # Video synchronization
│   │   ├── chat.js                    # Break-time chatting
│   │   ├── doubtBot.js                # Real-time doubt answering
│   │   └── focusBroadcast.js          # Focus status updates
│   │
│   ├── config/
│   │   ├── db.js                      # MongoDB connection
│   │   ├── youtube.js                 # YouTube API keys
│   │   ├── ai.js                      # AI service credentials
│   │   └── aws.js                     # S3 configuration
│   │
│   └── app.js                         # Main application
│
├── tests/
│   ├── auth.test.js
│   ├── focus.test.js
│   ├── room.test.js
│   └── ai.test.js
│
├── .env                      # Environment variables
├── package.json              # Dependencies
└── README.md                 # Setup instructions
## Key Backend Features Implementation

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- OAuth integration (Google, Facebook, GitHub)
- Role-based access control
- Rate limiting and CORS protection
- Input validation and sanitization

### 🎯 Focus & Study Management
- Focus session tracking with timer functionality
- Study room creation and management
- Real-time participant tracking
- Focus rating system with penalties for early exits
- Break management and reminders

### 📹 Video Integration
- YouTube video link processing
- Group watch synchronization
- Video metadata extraction
- Streaming optimization
- Watch party management

### 👥 Social Features
- User following/follower system
- Real-time chat functionality
- Leaderboard rankings
- Achievement system
- Social feed and interactions

### 🤖 AI Integration
- Interview bot API integration
- MCQ question generation
- Problem solver integration
- AI recommendation system
- Natural language processing

### 📊 Analytics & Gamification
- User behavior tracking
- Performance analytics
- Points and badge system
- Streak tracking
- Progress monitoring

### ⚡ Real-time Features
- WebSocket server for live communication
- Room synchronization
- Chat messaging
- Live notifications
- Video synchronization

### 🗄️ Data Management
- MongoDB integration
- Redis caching
- File upload handling
- Data backup and restore
- Database migrations and seeding