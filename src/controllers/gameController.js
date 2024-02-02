const router = require('express').Router();

const gameService = require('../services/gameService');

router.get('/catalog', async (req, res) => {
    const games = await gameService.getAll().lean();
    const isGames = Boolean(games.length);
    res.render('games/catalog', { games, isGames });
});

router.get('/create', (req, res) => {
    res.render('games/create');
})
module.exports = router;