const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'Name should be at least 4 characters long'],
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(http|https):\/\//.test(value);
            },
            message: 'Photo URL must start with http:// or https://'
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: `Price must be a positive number!`
        }
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters long'],
    },
    genre: {
        type: String,
        required: true,
        minLength: [2, 'Genre should be at least 2 characters long'],
    },
    platform: {
        type: String,
        required: true,
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
    },
    boughtBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;