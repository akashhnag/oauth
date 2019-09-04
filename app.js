const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth_routes = require('./routes/auth.routes');
const user_routes = require('./routes/users');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys').mongodb;
const app = express()

mongoose.connect(keys.dbURI, { useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log('error connecting', err);

    }
    else {
        console.log('connection successful');

    }

})
app.use(cors());

// set view engine
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: ['secret-key']
}))


app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth_routes);
app.use('/profile', user_routes);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Listening to port 3000..');

})
