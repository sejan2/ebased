const express = require('express');
const { registerUser, loginUser, logOutUser, authMiddleware } = require('../../controller/auth/auth-controller')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});
module.exports = router;