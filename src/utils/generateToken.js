const jwt = require('../lib/jwt');

const ENV = require('./constants');

module.exports = async (user) => {
    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, ENV.SECRET);
    return token;
}