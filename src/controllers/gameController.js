const router = require('express').Router();

const gameService = require('../services/gameService');
const { getErrorMessage } = require('../utils/errorExtractor');
const { isUser, isOwner } = require('../middlewares/authMiddleware');


router.get('/catalog', async (req, res) => {
    const games = await gameService.getAll().lean();
    const isGames = Boolean(games.length);
    res.render('games/catalog', { games, isGames });
});

router.get('/create', isUser, (req, res) => {
    res.render('games/create');
});

router.post('/create', isUser, async (req, res) => {
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
});

router.get('/edit/:id', isOwner, async (req, res) => {
    const game = await gameService.getOne(req.params.id).lean();
    res.render('games/edit', { game });
});

router.post('/edit/:id', isOwner, async (req, res) => {
    const game = {
        ...req.body,
        owner: req.user._id
    };
    try {
        await gameService.edit(req.params.id, game);
        res.redirect('/games/details/' + req.params.id);
    } catch (err) {
        res.render('games/edit', { error: getErrorMessage(err), game });
    }
});

router.get('/delete/:id', isOwner, async (req, res) => {
    await gameService.delete(req.params.id);
    res.redirect('/games/catalog');
});

router.get('/buy/:id', isUser, async (req, res) => {
    await gameService.buy(req.params.id, req.user._id);
    res.redirect('/games/details/' + req.params.id);
});

router.get('/search', isUser, async (req, res) => {
    const games = await gameService.getAll().lean();
    const isMatch = true;
    const match = games;
    res.render('games/search', { isMatch, match });
});

router.post('/search', async (req, res) => {
    const { name, platform } = req.body;
    const match = await gameService.search(name, platform).lean();
    const isMatch = match.length > 0;
    res.render('games/search', { match, isMatch });
})

module.exports = router;