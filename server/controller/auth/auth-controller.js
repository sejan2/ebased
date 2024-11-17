const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const asyncHandler = require('express-async-handler');

// Environment variables
const CLIENT_SECRET_KEY = process.env.CLIENT_SECRET_KEY || 'default_secret_key';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

// Register
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists with the same email! Please try again.',
        });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // Create new user
    const newUser = await User.create({
        userName,
        email,
        password: hashPassword,
    });

    res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: { id: newUser._id, userName: newUser.userName, email: newUser.email },
    });
});

// Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User doesn't exist! Please register first.",
        });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect password! Please try again.',
        });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email, userName: user.userName },
        CLIENT_SECRET_KEY,
        { expiresIn: '60m' }
    );

    // Respond with token and user info
    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: { id: user._id, userName: user.userName, email: user.email, role: user.role },
    });
});

// Logout
const logOutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true }).json({
        success: true,
        message: 'Logged out successfully',
    });
};

// Auth Middleware
const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user!',
        });
    }

    try {
        const decoded = jwt.verify(token, CLIENT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(403).json({
            success: false,
            message: 'Invalid token! Unauthorized access.',
        });
    }
});

module.exports = { registerUser, loginUser, logOutUser, authMiddleware };
