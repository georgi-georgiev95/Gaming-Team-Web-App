const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');

router.use(homeController);
router.use('/auth', authController);
router.use('/games', gameController);
router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;