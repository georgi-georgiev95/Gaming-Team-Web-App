const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getOne = (id) => Game.findById(id).populate('owner').populate('boughtBy');

exports.edit = async (id, gameData) => {
    const { name, image, price, description, genre, platform } = gameData;

    if (!name || !image || !price || !description || !genre || !platform) {
        throw new Error('All fields are required!');
    }
    await Game.findByIdAndUpdate(id, gameData);
};

exports.delete = (id) => Game.findByIdAndDelete(id);

exports.buy = (id, userId) => Game.findByIdAndUpdate(id, { $push: { boughtBy: userId } });

exports.search = (name, platform) => Game.find({ name: new RegExp(name, 'i'), platform: new RegExp(platform, 'i') });
  
