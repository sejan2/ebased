const express = require('express');
const asyncHandler = require('express-async-handler');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const { registerUser, loginUser, logOutUser, authMiddleware } = require('../../controller/auth/auth-controller');

// Initialize router and cache
const router = express.Router();
const authCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Rate limiter for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later.",
});

// Register route
router.post('/register', authLimiter, asyncHandler(registerUser));

// Login route
router.post('/login', authLimiter, asyncHandler(loginUser));

// Logout route
router.post('/logout', asyncHandler(logOutUser));

// Check authentication status with caching
router.get('/check-auth', authMiddleware, asyncHandler((req, res) => {
    const userId = req.user.id;

    // Check cache
    const cachedUser = authCache.get(userId);
    if (cachedUser) {
        return res.status(200).json({
            success: true,
            message: "Authenticated user (cached)!",
            user: cachedUser,
        });
    }

    // If not cached, send and cache the response
    const user = req.user;
    authCache.set(userId, user);
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
}));

module.exports = router;
