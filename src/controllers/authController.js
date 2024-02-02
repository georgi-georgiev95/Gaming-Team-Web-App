const router = require('express').Router();

const authService = require('../services/authService');
const ENV = require('../utils/constants');
const { getErrorMessage } = require('../utils/errorExtractor');
const { isUser, isGuest } = require('../middlewares/authMiddleware');

router.get('/register',isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register',isGuest, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const token = await authService.register(username, email, password);
        res.cookie(ENV.COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        res.render('auth/register', { error: getErrorMessage(err) });
    }
})

router.get('/login',isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login',isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie(ENV.COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        res.render('auth/login', { error: getErrorMessage(err) });
    }
})

router.get('/logout', isUser, (req, res) => {
    res.clearCookie(ENV.COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;