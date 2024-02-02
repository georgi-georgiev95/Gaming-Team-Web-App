const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');
const gameService = require('../services/gameService');

exports.auth = async (req, res, next) => {
    const token = req.cookies[ENV.COOKIE_NAME];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, ENV.SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie(ENV.COOKIE_NAME);
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

// TODO: add isAuth as a route guard
exports.isUser = (req, res, next) => {
    if (!req.user?._id) {
        res.redirect('/auth/login');
    }

    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user?._id) {
        res.redirect('/');
    }

    next();
}

exports.isOwner = async (req, res, next) => {
    const gameId = req.params.id;
    const game = await gameService.getOne(gameId);

    if(game.owner._id == req.user._id) {
        next();
    } else {
        return res.redirect('/games/catalog');
    }
}