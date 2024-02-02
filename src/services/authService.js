const bcrypt = require('bcrypt');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (username, email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error('User already exists!');
    }

    const newUser = new User({
        username,
        email,
        password
    });
    await user.save();

    
    const token = await generateToken(newUser);

    return token
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Wrong username or password!');
    }

    const token = await generateToken(user);
    
    return token;
}