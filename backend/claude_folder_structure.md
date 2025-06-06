# StudyFocus AI - Backend Folder Structure

## Core Features Supported
- **Authentication & User Management**
- **Focus Sessions & Study Rooms**
- **Video Integration & Group Watch**
- **Social Features (Following, Chat, Leaderboard)**
- **AI Integration (Interview Bot, MCQ Generator, Problem Solver)**
- **Real-time Communication (WebSocket)**
- **Analytics & Gamification**
- **File Upload & Media Management**

---

```
backend/
├── 📁 src/
│   ├── 📁 controllers/                    # Request handlers
│   │   ├── authController.js              # Login, register, logout, refresh
│   │   ├── userController.js              # Profile, preferences, settings
│   │   ├── focusController.js             # Focus sessions, timers, breaks
│   │   ├── studyRoomController.js         # Create/join rooms, room management
│   │   ├── videoController.js             # Video upload, streaming, sync
│   │   ├── socialController.js            # Follow/unfollow, feed, interactions
│   │   ├── chatController.js              # Chat messages, room chat
│   │   ├── leaderboardController.js       # Rankings, achievements, stats
│   │   ├── aiController.js                # AI bot interactions
│   │   ├── analyticsController.js         # User analytics, insights
│   │   ├── gamificationController.js      # Points, badges, streaks
│   │   ├── notificationController.js      # Push notifications, alerts
│   │   └── uploadController.js            # File uploads, media handling
│   │
│   ├── 📁 models/                         # Database schemas
│   │   ├── User.js                        # User profile, auth, preferences
│   │   ├── FocusSession.js                # Individual focus sessions
│   │   ├── StudyRoom.js                   # Group study rooms
│   │   ├── Video.js                       # Video metadata, links
│   │   ├── Chat.js                        # Chat messages
│   │   ├── Follow.js                      # Following relationships
│   │   ├── Leaderboard.js                # Ranking data
│   │   ├── Achievement.js                 # Badges, milestones
│   │   ├── Quiz.js                        # MCQ quizzes, questions
│   │   ├── Interview.js                   # Interview sessions, feedback
│   │   ├── Problem.js                     # Problem solving attempts
│   │   ├── Notification.js                # User notifications
│   │   ├── Analytics.js                   # User behavior data
│   │   └── Rating.js                      # Focus ratings, reviews
│   │
│   ├── 📁 routes/                         # API endpoints
│   │   ├── auth.js                        # POST /login, /register, /refresh
│   │   ├── users.js                       # GET/PUT /profile, /settings
│   │   ├── focus.js                       # POST/GET /sessions, /rooms
│   │   ├── studyRooms.js                  # CRUD operations for study rooms
│   │   ├── videos.js                      # POST /upload, GET /list, /stream
│   │   ├── social.js                      # POST /follow, GET /feed
│   │   ├── chat.js                        # GET/POST /messages
│   │   ├── leaderboard.js                 # GET /rankings, /achievements
│   │   ├── ai.js                          # POST /interview, /mcq, /solve
│   │   ├── analytics.js                   # GET /insights, /reports
│   │   ├── gamification.js                # GET /badges, POST /achievements
│   │   ├── notifications.js               # GET/POST /notifications
│   │   └── uploads.js                     # POST /files, /images
│   │
│   ├── 📁 middleware/                     # Request interceptors
│   │   ├── auth.js                        # JWT token validation
│   │   ├── validation.js                  # Request data validation
│   │   ├── rateLimit.js                   # API rate limiting
│   │   ├── cors.js                        # Cross-origin configuration
│   │   ├── upload.js                      # File upload handling
│   │   ├── errorHandler.js                # Global error handling
│   │   ├── logger.js                      # Request logging
│   │   ├── cache.js                       # Response caching
│   │   └── sanitize.js                    # Input sanitization
│   │
│   ├── 📁 services/                       # Business logic
│   │   ├── authService.js                 # Authentication logic
│   │   ├── userService.js                 # User management
│   │   ├── focusService.js                # Focus session management
│   │   ├── studyRoomService.js            # Room creation, joining
│   │   ├── videoService.js                # Video processing, streaming
│   │   ├── socialService.js               # Social interactions
│   │   ├── chatService.js                 # Chat functionality
│   │   ├── leaderboardService.js          # Ranking calculations
│   │   ├── aiService.js                   # AI integration
│   │   ├── analyticsService.js            # Data analytics
│   │   ├── gamificationService.js         # Points, badges logic
│   │   ├── notificationService.js         # Push notifications
│   │   ├── emailService.js                # Email notifications
│   │   ├── smsService.js                  # SMS notifications
│   │   ├── storageService.js              # File storage (AWS S3)
│   │   ├── cacheService.js                # Redis caching
│   │   └── recommendationService.js       # AI recommendations
│   │
│   ├── 📁 websocket/                      # Real-time communication
│   │   ├── socketServer.js                # WebSocket server setup
│   │   ├── handlers/
│   │   │   ├── roomHandlers.js            # Study room events
│   │   │   ├── chatHandlers.js            # Chat message events
│   │   │   ├── focusHandlers.js           # Focus session events
│   │   │   ├── videoHandlers.js           # Video sync events
│   │   │   └── notificationHandlers.js    # Real-time notifications
│   │   ├── middleware/
│   │   │   ├── socketAuth.js              # Socket authentication
│   │   │   └── socketRateLimit.js         # Socket rate limiting
│   │   └── events/
│   │       ├── roomEvents.js              # Room event definitions
│   │       ├── chatEvents.js              # Chat event definitions
│   │       └── focusEvents.js             # Focus event definitions
│   │
│   ├── 📁 utils/                          # Utility functions
│   │   ├── database.js                    # Database connection
│   │   ├── jwt.js                         # JWT token utilities
│   │   ├── encryption.js                  # Password hashing, encryption
│   │   ├── validators.js                  # Data validation helpers
│   │   ├── logger.js                      # Logging utilities
│   │   ├── constants.js                   # App constants
│   │   ├── helpers.js                     # General helper functions
│   │   ├── dateUtils.js                   # Date/time utilities
│   │   ├── stringUtils.js                 # String manipulation
│   │   ├── mathUtils.js                   # Mathematical calculations
│   │   ├── fileUtils.js                   # File handling utilities
│   │   ├── urlUtils.js                    # URL parsing, validation
│   │   ├── focusAlgorithms.js             # Focus calculation algorithms
│   │   └── errorTypes.js                  # Custom error definitions
│   │
│   ├── 📁 config/                         # Configuration files
│   │   ├── database.js                    # MongoDB configuration
│   │   ├── redis.js                       # Redis configuration
│   │   ├── aws.js                         # AWS services config
│   │   ├── firebase.js                    # Firebase config
│   │   ├── jwt.js                         # JWT configuration
│   │   ├── cors.js                        # CORS configuration
│   │   ├── upload.js                      # File upload configuration
│   │   ├── rateLimit.js                   # Rate limiting config
│   │   ├── email.js                       # Email service config
│   │   ├── sms.js                         # SMS service config
│   │   ├── socket.js                      # WebSocket configuration
│   │   └── environment.js                 # Environment variables
│   │
│   ├── 📁 jobs/                           # Background jobs
│   │   ├── schedulers/
│   │   │   ├── focusReminder.js           # Focus session reminders
│   │   │   ├── leaderboardUpdate.js       # Daily leaderboard updates
│   │   │   ├── analyticsProcessor.js      # Process analytics data
│   │   │   ├── notificationCleanup.js     # Clean old notifications
│   │   │   └── dataBackup.js              # Automated backups
│   │   ├── queues/
│   │   │   ├── emailQueue.js              # Email sending queue
│   │   │   ├── notificationQueue.js       # Push notification queue
│   │   │   ├── videoProcessingQueue.js    # Video processing queue
│   │   │   └── analyticsQueue.js          # Analytics processing queue
│   │   └── workers/
│   │       ├── emailWorker.js             # Email processing worker
│   │       ├── notificationWorker.js      # Notification worker
│   │       ├── videoWorker.js             # Video processing worker
│   │       └── analyticsWorker.js         # Analytics worker
│   │
│   ├── 📁 integrations/                   # External API integrations
│   │   ├── youtube/
│   │   │   ├── youtubeAPI.js              # YouTube Data API
│   │   │   ├── videoExtractor.js          # Extract video info
│   │   │   └── playlistHandler.js         # Playlist management
│   │   ├── ai/
│   │   │   ├── openaiClient.js            # OpenAI API client
│   │   │   ├── geminiClient.js            # Google Gemini client
│   │   │   ├── claudeClient.js            # Anthropic Claude client
│   │   │   └── huggingfaceClient.js       # HuggingFace API
│   │   ├── payment/
│   │   │   ├── stripeClient.js            # Stripe payment integration
│   │   │   ├── razorpayClient.js          # Razorpay integration
│   │   │   └── paypalClient.js            # PayPal integration
│   │   ├── social/
│   │   │   ├── googleAuth.js              # Google OAuth
│   │   │   ├── facebookAuth.js            # Facebook OAuth
│   │   │   └── githubAuth.js              # GitHub OAuth
│   │   └── cloud/
│   │       ├── awsS3.js                   # AWS S3 storage
│   │       ├── cloudinary.js              # Cloudinary media
│   │       └── firebaseStorage.js         # Firebase storage
│   │
│   ├── 📁 database/                       # Database operations
│   │   ├── connection.js                  # Database connection setup
│   │   ├── migrations/
│   │   │   ├── 001_create_users.js        # User table migration
│   │   │   ├── 002_create_focus_sessions.js
│   │   │   ├── 003_create_study_rooms.js
│   │   │   ├── 004_create_social_features.js
│   │   │   └── 005_create_ai_features.js
│   │   ├── seeders/
│   │   │   ├── userSeeder.js              # Sample user data
│   │   │   ├── roomSeeder.js              # Sample room data
│   │   │   ├── achievementSeeder.js       # Achievement data
│   │   │   └── quizSeeder.js              # Sample quiz data
│   │   └── repositories/
│   │       ├── userRepository.js          # User data access
│   │       ├── focusRepository.js         # Focus data access
│   │       ├── socialRepository.js        # Social data access
│   │       └── analyticsRepository.js     # Analytics data access
│   │
│   ├── 📁 security/                       # Security implementations
│   │   ├── authentication/
│   │   │   ├── jwtStrategy.js             # JWT authentication
│   │   │   ├── localStrategy.js           # Local auth strategy
│   │   │   ├── oauthStrategy.js           # OAuth strategies
│   │   │   └── biometricAuth.js           # Biometric authentication
│   │   ├── authorization/
│   │   │   ├── permissions.js             # User permissions
│   │   │   ├── roles.js                   # User roles
│   │   │   └── accessControl.js           # Access control logic
│   │   ├── encryption/
│   │   │   ├── passwordHash.js            # Password hashing
│   │   │   ├── dataEncryption.js          # Data encryption
│   │   │   └── keyManagement.js           # Encryption key management
│   │   └── validation/
│   │       ├── inputSanitization.js       # Input sanitization
│   │       ├── xssProtection.js           # XSS protection
│   │       └── sqlInjectionPrevention.js  # SQL injection prevention
│   │
│   ├── 📁 monitoring/                     # Monitoring & logging
│   │   ├── metrics/
│   │   │   ├── performanceMetrics.js      # Performance monitoring
│   │   │   ├── businessMetrics.js         # Business KPIs
│   │   │   └── systemMetrics.js           # System health metrics
│   │   ├── logging/
│   │   │   ├── applicationLogger.js       # Application logs
│   │   │   ├── errorLogger.js             # Error logging
│   │   │   ├── auditLogger.js             # Audit trail
│   │   │   └── performanceLogger.js       # Performance logs
│   │   ├── alerts/
│   │   │   ├── errorAlerts.js             # Error alerting system
│   │   │   ├── performanceAlerts.js       # Performance alerts
│   │   │   └── securityAlerts.js          # Security alerts
│   │   └── health/
│   │       ├── healthCheck.js             # Health check endpoint
│   │       ├── readinessCheck.js          # Readiness probe
│   │       └── livenessCheck.js           # Liveness probe
│   │
│   └── app.js                             # Main application entry point
│
├── 📁 tests/                              # Test suites
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   ├── integration/
│   │   ├── api/
│   │   ├── database/
│   │   └── websocket/
│   ├── e2e/
│   │   ├── auth.test.js
│   │   ├── focus.test.js
│   │   ├── social.test.js
│   │   └── ai.test.js
│   └── fixtures/
│       ├── userData.json
│       ├── focusData.json
│       └── socialData.json
│
├── 📁 docs/                               # API Documentation
│   ├── api/
│   │   ├── openapi.yaml                   # OpenAPI specification
│   │   ├── authentication.md              # Auth documentation
│   │   ├── focus-sessions.md              # Focus API docs
│   │   ├── social-features.md             # Social API docs
│   │   └── ai-integration.md              # AI API docs
│   ├── database/
│   │   ├── schema.md                      # Database schema
│   │   ├── relationships.md               # Entity relationships
│   │   └── indexes.md                     # Database indexes
│   └── deployment/
│       ├── setup.md                       # Setup instructions
│       ├── configuration.md               # Configuration guide
│       └── scaling.md                     # Scaling guidelines
│
├── 📁 scripts/                            # Utility scripts
│   ├── database/
│   │   ├── migrate.js                     # Database migration
│   │   ├── seed.js                        # Database seeding
│   │   ├── backup.js                      # Database backup
│   │   └── restore.js                     # Database restore
│   ├── deployment/
│   │   ├── build.sh                       # Build script
│   │   ├── deploy.sh                      # Deployment script
│   │   └── rollback.sh                    # Rollback script
│   └── maintenance/
│       ├── cleanup.js                     # Data cleanup
│       ├── optimize.js                    # Performance optimization
│       └── health-check.js                # System health check
│
├── 📁 logs/                               # Log files
│   ├── application.log
│   ├── error.log
│   ├── access.log
│   └── audit.log
│
├── 📁 uploads/                            # File uploads (local development)
│   ├── images/
│   ├── videos/
│   ├── documents/
│   └── temp/
│
├── 📄 package.json                        # Dependencies & scripts
├── 📄 package-lock.json                   # Dependency lock file
├── 📄 .env                                # Environment variables
├── 📄 .env.example                        # Environment template
├── 📄 .gitignore                          # Git ignore rules
├── 📄 .eslintrc.js                        # ESLint configuration
├── 📄 .prettierrc                         # Prettier configuration
├── 📄 jest.config.js                      # Jest test configuration
├── 📄 docker-compose.yml                  # Docker compose for development
├── 📄 docker-compose.prod.yml             # Docker compose for production
├── 📄 Dockerfile                          # Docker container definition
├── 📄 README.md                           # Project documentation
└── 📄 CHANGELOG.md                        # Version change log
```

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