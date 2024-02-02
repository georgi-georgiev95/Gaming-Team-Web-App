const router = require('express').Router();

const gameService = require('../services/gameService');
const { getErrorMessage } = require('../utils/errorExtractor');

router.get('/catalog', async (req, res) => {
    const games = await gameService.getAll().lean();
    const isGames = Boolean(games.length);
    res.render('games/catalog', { games, isGames });
});

router.get('/create', (req, res) => {
    res.render('games/create');
});

router.post('/create', async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id
    };
    try {
        await gameService.create(gameData);
        res.redirect('/games/catalog');
    } catch (err) {
        res.render('games/create', { error: getErrorMessage(err), ...req.body });
    }
});

router.get('/details/:id', async (req, res) => { 
    const game = await gameService.getOne(req.params.id).lean();
    const isOwner = req.user?._id == game.owner._id;
    const isUser = req.user?._id ? true : false;
    const hasBought = game.boughtBy.some(b => b._id == req.user?._id);
    res.render('games/details', { game, isOwner, isUser, hasBought });
})
module.exports = router;