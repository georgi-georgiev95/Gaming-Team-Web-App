const router = require('express').Router();

const gameService = require('../services/gameService');

router.get('/catalog', async (req, res) => {
    res.render('games/catalog')
})
module.exports = router;