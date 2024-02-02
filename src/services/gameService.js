const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getOne = (id) => Game.findById(id).populate('owner').populate('boughtBy');