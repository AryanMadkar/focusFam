const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const globalErrorHandler = require('./middlewares/errorMiddleware');
const router = require('./routes/UserAuthroute');

const app = express();

// 1. Trust proxy (e.g., if behind a reverse proxy like Heroku, Vercel)
app.set('trust proxy', 1);

// 2. Set security HTTP headers
app.use(helmet());

// 3. General rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// 4. Auth-specific stricter rate limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// 5. CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    // Add production domains here
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// 6. Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 7. Cookie parser
app.use(cookieParser());

// 8. Data sanitization
app.use(mongoSanitize());
app.use(xss());

// 9. Routes
app.use('/api/auth', router); // ✅ This is correct

// 10. Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 11. Handle undefined routes
// app.all('*', (req, res, next) => {
//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   err.statusCode = 404;
//   err.status = 'fail';
//   next(err);
// });

// 12. Global error handler
app.use(globalErrorHandler);

module.exports = app;
