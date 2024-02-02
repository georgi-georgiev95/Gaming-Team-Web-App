const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const router = require('./router');
const ENV = require('./utils/constants');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

// config db
mongoose.connect(ENV.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// config express-handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// config express
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));

// add cookie-parser
app.use(cookieParser());

// add auth middleware
app.use(auth);

// add router
app.use(router);

app.listen(ENV.PORT, () => console.log(`Listening on port ${ENV.PORT}`));