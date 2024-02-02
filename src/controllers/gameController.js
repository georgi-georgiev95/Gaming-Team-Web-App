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
})
module.exports = router;