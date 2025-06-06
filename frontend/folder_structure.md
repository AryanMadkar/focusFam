frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
│
├── src/
│   ├── assets/
│   │   ├── fonts/              # Custom fonts
│   │   ├── icons/              # SVG icons
│   │   ├── images/             # App images
│   │   └── videos/             # Placeholder/instructional videos
│   │
│   ├── components/
│   │   ├── core/               # Reusable UI components
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── modals/
│   │   │   ├── loaders/
│   │   │   ├── inputs/
│   │   │   └── notifications/
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── FocusLayout.jsx # Special layout for focus mode
│   │   │
│   │   ├── focus/              # Focus session components
│   │   │   ├── FocusTimer.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── SessionControls.jsx
│   │   │   ├── ParticipantList.jsx
│   │   │   └── AbandonModal.jsx
│   │   │
│   │   ├── social/             # Social features
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── FollowButton.jsx
│   │   │   └── RatingBadge.jsx
│   │   │
│   │   ├── ai/                 # AI components
│   │   │   ├── InterviewBot.jsx
│   │   │   ├── MCQBrowser.jsx
│   │   │   ├── ProblemSolver.jsx
│   │   │   ├── AIResponse.jsx
│   │   │   └── AILoader.jsx
│   │   │
│   │   └── gamification/       # Game elements
│   │       ├── Leaderboard.jsx
│   │       ├── AchievementBadge.jsx
│   │       ├── ProgressBar.jsx
│   │       ├── StreakCounter.jsx
│   │       └── RewardPopup.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatsOverview.jsx
│   │   │   └── FocusHistory.jsx
│   │   │
│   │   ├── focus/
│   │   │   ├── CreateSession.jsx
│   │   │   ├── JoinSession.jsx
│   │   │   ├── SessionRoom.jsx
│   │   │   └── BreakScreen.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── UserProfile.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Followers.jsx
│   │   │   └── Following.jsx
│   │   │
│   │   ├── ai-tools/
│   │   │   ├── InterviewSimulator.jsx
│   │   │   ├── MCQGenerator.jsx
│   │   │   ├── ProblemSolver.jsx
│   │   │   └── ContentEnhancer.jsx
│   │   │
│   │   ├── social/
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Community.jsx
│   │   │   └── ChatRooms.jsx
│   │   │
│   │   └── settings/
│   │       ├── AccountSettings.jsx
│   │       ├── NotificationSettings.jsx
│   │       └── FocusPreferences.jsx
│   │
│   ├── context/                # React Contexts
│   │   ├── AuthContext.jsx
│   │   ├── FocusContext.jsx
│   │   ├── AIContext.jsx
│   │   └── SocketContext.jsx   # For real-time features
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useFocusTimer.js
│   │   ├── useSession.js
│   │   ├── useAIChat.js
│   │   ├── useWebRTC.js        # For video sessions
│   │   └── useDopamine.js      # Gamification logic
│   │
│   ├── services/
│   │   ├── api/                # API communication
│   │   │   ├── auth.js
│   │   │   ├── focus.js
│   │   │   ├── user.js
│   │   │   └── ai.js
│   │   │
│   │   ├── websocket/          # Real-time services
│   │   │   ├── sessionSocket.js
│   │   │   └── chatSocket.js
│   │   │
│   │   ├── storage/            # Local storage helpers
│   │   │   ├── authStorage.js
│   │   │   └── sessionStorage.js
│   │   │
│   │   └── utils/              # Frontend utilities
│   │       ├── formatters.js   # Date/string formatting
│   │       ├── validators.js   # Form validation
│   │       └── focusHelpers.js # Focus mode calculations
│   │
│   ├── styles/
│   │   ├── base/               # Global styles
│   │   │   ├── reset.css
│   │   │   ├── variables.css   # CSS variables
│   │   │   ├── typography.css
│   │   │   └── animations.css
│   │   │
│   │   ├── components/         # Component-specific styles
│   │   ├── layouts/            # Layout styles
│   │   └── themes/             # Light/dark themes
│   │       ├── light.css
│   │       └── dark.css
│   │
│   ├── utils/                  # General utilities
│   │   ├── focusCalculations.js
│   │   ├── dopamineUtils.js
│   │   ├── videoHelpers.js
│   │   └── aiResponseParser.js
│   │
│   ├── config/
│   │   ├── routes.js           # All application routes
│   │   ├── constants.js        # App-wide constants
│   │   └── theme.js            # Theme configuration
│   │
│   ├── redux/                  # State management (optional)
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── focusSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── aiSlice.js
│   │   │
│   │   └── actions/            # Async actions
│   │       ├── sessionActions.js
│   │       └── aiActions.js
│   │
│   ├── App.jsx                 # Main app component
│   ├── index.js                # Entry point
│   └── reportWebVitals.js
│
├── .env                        # Environment variables
├── .eslintrc                   # Linting configuration
├── .prettierrc                 # Code formatting
├── jsconfig.json               # Path aliases
├── package.json
└── README.md